'use client'

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import { resetAuthCookie } from '@/app/lib/actions'
import MenuLink from '@/app/components/navbar/MenuLink';
import useAuthStore from '../hooks/useAuthStore';

export default function LogoutButton() {
  const router = useRouter();

  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  async function submitLogout() {
    await resetAuthCookie();

    setLoggedIn(false);

    startTransition(() => {
      router.push('/');
      router.refresh();
    })
  }
  return (
    <MenuLink label="Logout" onClick={submitLogout} />
  )
}