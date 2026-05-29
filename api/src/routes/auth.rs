use std::env;

use axum::{
    extract::{Query, State},
    response::{IntoResponse, Redirect},
};
use axum_extra::extract::{CookieJar, cookie::Cookie};
use oauth2::{AuthorizationCode, CsrfToken, Scope, TokenResponse};
use serde::Deserialize;

use crate::AppState;

#[derive(Deserialize)]
pub struct AuthQuery {
    code: String,
    state: String,
}

#[derive(Deserialize)]
pub struct GoogleUser {
    id: String,
    email: String,
    name: String,
    picture: String,
}

pub async fn google_login(State(state): State<AppState>) -> impl IntoResponse {
    let (auth_url, csrf_token) = state
        .oauth_client
        .authorize_url(CsrfToken::new_random)
        .add_scopes([
            Scope::new("openid".to_string()),
            Scope::new("email".to_string()),
            Scope::new("profile".to_string()),
        ])
        .url();

    let cookie = Cookie::build(("oauth_csrf", csrf_token.secret()))
        .http_only(true)
        .build();

    (
        [(axum::http::header::SET_COOKIE, cookie.to_string())],
        Redirect::to(auth_url.as_str()),
    )
}

pub async fn google_callback(
    State(state): State<AppState>,
    Query(query): Query<AuthQuery>,
    jar: CookieJar,
) -> impl IntoResponse {
    let Some(csrf_cookie) = jar.get("oauth_csrf") else {
        return "Missing CSRF cookie".into_response();
    };

    if csrf_cookie.value() != query.state {
        return "Invalid CSRF token".into_response();
    }

    let http_client = reqwest::ClientBuilder::new()
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .expect("Client should build");

    let token_response = state
        .oauth_client
        .exchange_code(AuthorizationCode::new(query.code))
        .request_async(&http_client)
        .await
        .unwrap();

    let access_token = token_response.access_token().secret();

    let google_user = reqwest::Client::new()
        .get("https://www.googleapis.com/oauth2/v1/userinfo")
        .bearer_auth(&access_token)
        .send()
        .await
        .unwrap()
        .json::<GoogleUser>()
        .await
        .unwrap();

    sqlx::query!(
        r#"
        INSERT INTO users (google_id, email, picture_url, name)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (google_id)
        DO UPDATE SET email = EXCLUDED.email, picture_url = EXCLUDED.picture_url, name = EXCLUDED.name
        "#,
        google_user.id,
        google_user.email,
        google_user.picture,
        google_user.name
    )
    .execute(&state.db)
    .await
    .unwrap();

    let redirect_url = env::var("OAUTH_SUCCESS_REDIRECT_URL")
        .expect("OAUTH_SUCCESS_REDIRECT_URL is missing in your env");

    Redirect::to(&redirect_url).into_response()
}
