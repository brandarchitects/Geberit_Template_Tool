import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

export const metadata = { title: 'Sign In — Geberit Template Tool' };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
