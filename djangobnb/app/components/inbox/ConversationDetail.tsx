'use client'

import styles from './conversation.module.css'

import CustomButton from '../forms/CustomButton';

export default function ConversationDetail() {
  function handleClick() {
    console.log('clicked');
  }
  return (
    <>
      <div className={styles.conversationDetail}>
        <div className={styles.message}>
          <p className={styles.messageName}>John Doe</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo omnis, nihil aperiam facere blanditiis deserunt, culpa ex unde veniam pariatur possimus quae minima a eum adipisci odio consectetur eos.
          </p>
        </div>

        <div className={`${styles.message} ${styles.owner}`}>
          <p className={styles.messageName}>John Doe</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo omnis, nihil aperiam facere blanditiis deserunt, culpa ex unde veniam pariatur possimus quae minima a eum adipisci odio consectetur eos.
          </p>
        </div>
      </div>
      
      <div className={styles.containerContainer}>

        <div className={styles.formContainer}>
          <textarea 
          name="message"
          placeholder="Type your message..."
          className={styles.input}/> 

          <CustomButton 
          label='Send'
          onClick={handleClick}
          style={{ width: "100px"}}/>
        </div>
      </div>
    </>
  )
}