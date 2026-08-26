import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Page.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not Found | Max Baehr</title>
      </Head>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>
            <Link href="/">Max Baehr</Link>
          </div>
        </nav>

        <main className={styles.main}>
          <h1>404 — Page Not Found</h1>
          <p>Sorry, we couldn't find what you were looking for.</p>
          <p>
            <Link href="/">← Back to home</Link>
          </p>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2024 Max Baehr. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
