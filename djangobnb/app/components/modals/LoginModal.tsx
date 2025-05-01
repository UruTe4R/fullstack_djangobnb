'use client'

import styles from './modal.module.css'
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';
import CustomButton from '@/app/components/forms/CustomButton';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';
import { useImmer } from 'use-immer';
import { useState } from 'react';


export default function LoginModal() {
  const isOpen = useLoginModal((state) => state.isOpen);
  const close = useLoginModal((state) => state.close);

  const router = useRouter();
  const [formData, setFormData] = useImmer({email: '', password: ''});
  const [errors, setErrors] = useState<string[]>([]);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData(draft => {
      draft[field] = value
    })
  }

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await apiService.post('/api/auth/login/', formData);

    if (response.access) {
      await handleLogin(response.user.pk, response.access, response.refresh);

      close();

      router.push('/');
    } else {
      setErrors(response.non_field_errors);
    }
  }

  const content = (
    <>
      <form className={styles.form} onSubmit={submitLogin}>
        <input onChange={(e) => handleChange('email', e.target.value)} value={formData.email} type="email" className={styles.input} placeholder="Your email address"/>

        <input onChange={(e) => handleChange('password', e.target.value)} value={formData.password} type="password" className={styles.input} placeholder="Your password"/>

        {errors?.map((error, i) => {
          return (
            <div className={styles.error} key={i}>
              {error}
            </div>
          )
        })}
        
        <CustomButton 
          label="Submit"
          type="submit"
        />
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