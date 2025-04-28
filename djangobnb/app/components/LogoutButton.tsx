'use client'

import { useRouter } from 'next/navigation';

import { resetAuthCookie } from '@/app/lib/actions'
import MenuLink from '@/app/components/navbar/MenuLink';

export default function LogoutButton() {
  const router = useRouter();

  async function submitLogout() {
    await resetAuthCookie();

    router.push('/');
  }
  return (
    <MenuLink label="Logout" onClick={submitLogout} />
  )
}