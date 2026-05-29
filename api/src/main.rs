use std::env;

use axum::{Router, routing::get};
use oauth2::{AuthUrl, ClientId, ClientSecret, EndpointNotSet, EndpointSet, RedirectUrl, TokenUrl};
use sqlx::{PgPool, postgres::PgPoolOptions};

mod routes;

type BasicClient = oauth2::basic::BasicClient<
    EndpointSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointSet,
>;

#[derive(Clone)]
struct AppState {
    db: PgPool,
    oauth_client: BasicClient,
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().unwrap();

    let db = connect_db().await.unwrap();
    let oauth_client = connect_oauth_client();

    sqlx::migrate!("./migrations");

    let state = AppState { db, oauth_client };

    let app = Router::new()
        .route("/auth/google", get(routes::auth::google_login))
        .route("/auth/google/callback", get(routes::auth::google_callback))
        .with_state(state);

    println!("Starting server at port 3000");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn connect_db() -> Result<PgPool, sqlx::error::Error> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is missing in your env");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}

fn connect_oauth_client() -> BasicClient {
    let client_id =
        env::var("GOOGLE_OAUTH_CLIENT_ID").expect("GOOGLE_OAUTH_CLIENT_ID is missing in your env");

    let client_secret = env::var("GOOGLE_OAUTH_CLIENT_SECRET")
        .expect("GOOGLE_OAUTH_CLIENT_SECRET is missing in your env");

    let redirect_url = env::var("GOOGLE_OAUTH_REDIRECT_URL")
        .expect("GOOGLE_OAUTH_REDIRECT_URL is missing in your env");

    oauth2::basic::BasicClient::new(ClientId::new(client_id))
        .set_client_secret(ClientSecret::new(client_secret))
        .set_auth_uri(
            AuthUrl::new("https://accounts.google.com/o/oauth2/auth".to_string()).unwrap(),
        )
        .set_token_uri(TokenUrl::new("https://oauth2.googleapis.com/token".to_string()).unwrap())
        .set_redirect_uri(RedirectUrl::new(redirect_url).unwrap())
}
