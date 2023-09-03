import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Welcome to Next.js!</h1>
      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </div>
  );
}
