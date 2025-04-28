'use client'

import { useState, useRef, useEffect } from 'react';
import styles from '@/app/components/navbar/navbar.module.css';

import MenuLink from '@/app/components/navbar/MenuLink';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSignupModal from '@/app/hooks/useSignupModal';
import LogoutButton from '@/app/components/LogoutButton';


interface UserNavProps {
  userId?: string | null;
}

export default function UserNav({ userId }: UserNavProps) {

  const open = useLoginModal((state) => state.open);
  const openSignup = useSignupModal((state) => state.open);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsOpenUserMenu(false);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, [])

  function handleClickLogin() {
    open()
    setIsOpenUserMenu(false);
  }
  function handleClickSigup() {
    openSignup()
    setIsOpenUserMenu(false);
  }
  return (
    <div ref={userMenuRef} className={styles.usermenu}>
      <button 
        className={styles.usermenu_button}
        onClick={() => {
          setIsOpenUserMenu(!isOpenUserMenu);
        }}
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.icon}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>


        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.icon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {isOpenUserMenu && (
        <div 
          className={styles.popup}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {userId ? (
            <LogoutButton />
          ): (
            <>
              <MenuLink 
                label="Log in"
                onClick={handleClickLogin}
              />
              <MenuLink 
                label="Sign up"
                onClick={handleClickSigup}
              />
            </>
          )}
          

          
        </div>
      )}
    </div>
  )
}