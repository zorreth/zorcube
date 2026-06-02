'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from './Button';
import { Tooltip } from './Tooltip';
import Link from 'next/link';
import classes from './UserNav.module.scss';

export function UserNav() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  return (
    <div className={classes.userNav}>
      {session.user.image && (
        <Tooltip content={session.user.name ?? 'User'}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user.image}
            alt={session.user.name ?? 'User avatar'}
            className={classes.avatar}
            referrerPolicy="no-referrer"
          />
        </Tooltip>
      )}
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
