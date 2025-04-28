'use client'

import styles from './modal.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useImmer } from 'use-immer';

import Modal from './Modal';
import useSignupModal from '@/app/hooks/useSignupModal';
import CustomButton from '@/app/components/forms/CustomButton';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';

export default function SignupModal() {
  const isOpen = useSignupModal((state) => state.isOpen);
  const close = useSignupModal((state) => state.close);

  const [formData, setFormData] = useImmer({
    email: '',
    password1: '',
    password2: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(draft => {
      draft[field] = value
    }
    );
  };

  async function submitSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await apiService.post('/api/auth/register/', formData);

    if (response.access) {
      // handle login
      try 
      {
        await handleLogin(response.user.pk, response.access, response.refresh)
      }

      catch (error) {
        console.log(error)
      }

      close();
      router.push('/');
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => error);
      setErrors(tmpErrors);
    }
  }

  const content = (
    <form className={styles.form} onSubmit={submitSignup}>
      <input
        onChange={e => handleChange('email', e.target.value)}
        value={formData.email}
        type="email"
        className={styles.input}
        placeholder="Your email address"
      />

      <input
        onChange={e => handleChange('password1', e.target.value)}
        value={formData.password1}
        type="password"
        className={styles.input}
        placeholder="Your password"
      />

      <input
        onChange={e => handleChange('password2', e.target.value)}
        value={formData.password2}
        type="password"
        className={styles.input}
        placeholder="Repeat password"
      />

      {errors.map((error, index) => (
        <div className={styles.error} key={`error-${index}`}>
          {error}
        </div>
      ))}

      <CustomButton label="Submit" type='submit'/>
    </form>
  );

  return (
    <Modal isOpen={isOpen} close={close} label="Sign up" content={content} />
  );
}
