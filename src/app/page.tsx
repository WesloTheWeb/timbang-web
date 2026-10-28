import styles from "./page.module.scss";

const { page, title, status } = styles;

export default function Home() {
  return (
    <main className={page}>
      <h1 className={title}>Coming Soon!</h1>
      <p className={status}>Status: Active Development</p>
    </main>
  );
}
