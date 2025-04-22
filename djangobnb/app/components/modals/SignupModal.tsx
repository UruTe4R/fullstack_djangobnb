'use client'

import styles from './modal.module.css'

import Modal from './Modal';
import useSignupModal from '@/app/hooks/useSignupModal';
import CustomButton from '@/app/components/forms/CustomButton';

export default function SiModal() {
  const isOpen = useSignupModal((state) => state.isOpen);
  const close = useSignupModal((state) => state.close);

  const content = (
    <>
      <form className={styles.form}>
        <input type="email" className={styles.input} placeholder="Your email address"/>

        <input type="password" className={styles.input} placeholder="Your password"/>

        <input type="password" className={styles.input} placeholder="Repeat password"/>

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
      label="Sign up"
      content={content}
    >
    </Modal>
  )
}