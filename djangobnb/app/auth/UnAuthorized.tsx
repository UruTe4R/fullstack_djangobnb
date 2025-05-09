'use client'

import styles from './unauthorized.module.css';

import useLoginModal from '../hooks/useLoginModal';

export default function UnAuthorized() {
  const openLogin = useLoginModal((state) => state.open);

  function handleClickLogin() {
    openLogin();
  }
  return (

    <main className={styles.main}>
      <h1 className={styles.h1}>You must be logged in to see this page</h1>
      <button 
        onClick={handleClickLogin}
        className={styles.button}
      >
        Login
      </button>
    </main>
  )
}