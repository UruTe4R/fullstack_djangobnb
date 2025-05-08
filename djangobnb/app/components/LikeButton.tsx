import styles from './likebutton.module.css';

import apiService from '@/app/services/apiService';

interface LikeButtonProps {
  property_id: string;
  is_liked: boolean;
  like: (is_liked: boolean) => void;
}

export default function LikeButton({property_id, is_liked, like}: LikeButtonProps) {

  async function toggleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    console.log('toggleLike');
    const response = await apiService.postWithCredentials(`/api/properties/${property_id}/toggle_like/`, {})

    if (response.success) {
      console.log('Like successed', response.liked);
      like(response.liked);
    } else {
      console.log('Like failed', response.error);
    }

  }

  return (
    <div
      onClick={(e) => toggleLike(e)}
      className={`${styles.button} ${is_liked ? styles.liked: styles.notLiked}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>


    </div>
  )
}