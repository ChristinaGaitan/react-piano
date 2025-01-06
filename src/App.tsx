import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";
import styles from "./App.module.css";
import { Main } from "./components/Main";

export const App = () => {
  return (
    <div className={styles.app}>
      <Logo />
      <main className={styles.content}>
        <Main />
      </main>
      <Footer />
    </div>
  );
};
