import styles from "./page.module.css";
import { inter } from "@/app/ui/fonts";
// components
import Categories from '@/app/components/Categories';
import PropertyList from "@/app/components/properties/PropertyList";

export default function Home() {
  return (
      <main className={`${inter.className}`}>
        <div className={styles.categoriesContainer}>
          <Categories />
        </div>
        <div className={styles.propertylistContainer}>
          <PropertyList />
        </div>
      </main>
  );
}
