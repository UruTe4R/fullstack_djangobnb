'use client'

import styles from './modal.module.css'

import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';
import CustomButton from '@/app/components/forms/CustomButton';

export default function LoginModal() {
  const isOpen = useLoginModal((state) => state.isOpen);
  const close = useLoginModal((state) => state.close);

  const content = (
    <>
      <form className={styles.form}>
        <input type="email" className={styles.input} placeholder="Your email address"/>

        <input type="password" className={styles.input} placeholder="Your password"/>

        <div className={styles.error}>
          Error Message
        </div>
        <CustomButton 
          label="Submit"
          onClick={() => {console.log('text')}}/>
      </form>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      label="Log in"
      content={content}
    >
    </Modal>
  )
}