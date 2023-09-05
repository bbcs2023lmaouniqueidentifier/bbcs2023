import Image from 'next/image';
import './page.css';
import ThemeWrapper from './ThemeWrapper';

export default function Home() {
  return (
    <ThemeWrapper>
      <h1>Welcome to Next.js!</h1>
      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </ThemeWrapper>
  );
}
