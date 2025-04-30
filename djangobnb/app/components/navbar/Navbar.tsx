import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

import SearchFilters from '@/app/components/navbar/SearchFilters';
import UserNav from './UserNav';
import AddPropertyButton from '@/app/components/navbar/AddPropertyButton';
import { getUserId } from '@/app/lib/actions';

export default async function Navbar() {
  const userId = await getUserId();
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/images/logo.png"
            width={180}
            height={38}
            alt="DjangoBnb logo"
            className={styles.responsiveImage}/>
          </Link>
        </div>
          <div className={styles.searchfilter_container}>
            <SearchFilters />
          </div>
          <div className={styles.usermenu_container}>
            <AddPropertyButton 
              userId={userId}
            />
            <UserNav 
              userId={userId}
            />
          </div>
      </div>
    </nav>
  )
}