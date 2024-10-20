import { Layout } from "@/components/Layout/Layout.server";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Layout as="div">test dupa cyce</Layout>
    </div>
  );
}
