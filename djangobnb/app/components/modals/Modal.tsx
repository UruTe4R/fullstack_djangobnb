'use client'

import styles from './modal.module.css';
import { useState, useEffect, useCallback } from 'react';



interface ModalProps {
  label: string;
  content: React.ReactElement;
  isOpen: boolean;
  close: () => void;
}


export default function Modal({label, content, isOpen, close}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      close();
    }, 300);

  }, [close])

  if (!isOpen) {
    return null
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={`${styles.animationLayer} ${!showModal && styles.animationLayerOff}` }>
          <div className={styles.loginForm}>
            <header className={styles.header}>
              <div 
                className={styles.closeButton}
                onClick={handleClose}
              >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </div>

              <h2 className={styles.title}>{label}</h2>
            </header>

            <section className={styles.section}>
              {content}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}