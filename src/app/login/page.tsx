'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import { Button } from '@/shared/ui/Button';
import classes from './page.module.css';

export default function Login() {
  return (
    <main className={classes.main}>
      <h1 className={classes.title}>Welcome to Zorcube</h1>

      <div className={classes.buttons}>
        <Button onClick={() => signIn('discord', { callbackUrl: '/' })}>
          <FaDiscord size={18} />
          Login with Discord
        </Button>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
          <FaGoogle size={16} />
          Login with Google
        </Button>
      </div>

      <Link href="/" className={classes.back}>
        Go back
      </Link>
    </main>
  );
}
