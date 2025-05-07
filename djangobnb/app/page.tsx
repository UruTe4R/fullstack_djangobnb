import styles from "./page.module.css";
import { inter } from "@/app/ui/fonts";
// components
import Categories from '@/app/components/Categories';
import PropertyList from "@/app/components/properties/PropertyList";
import { getUserId } from "@/app/lib/actions";

export default async function Home() {
  const userId = await getUserId();
  return (
      <main className={`${inter.className}`}>
        <div className={styles.categoriesContainer}>
          <Categories />
        </div>
        <div className={styles.propertylistContainer}>
          <PropertyList userId={userId}/>
        </div>
      </main>
  );
}
