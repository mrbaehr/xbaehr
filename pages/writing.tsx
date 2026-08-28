import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import styles from '../styles/Page.module.css';

export default function Writing() {
  return (
    <>
      <Head>
        <title>Writing Samples | Max Baehr</title>
        <meta name="description" content="Articles, case studies, and technical writing by Max Baehr" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>
            <Link href="/">Max Baehr</Link>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/">Info</Link></li>
            <li><Link href="/writing">Writing Samples</Link></li>
            <li><Link href="/resume">Resume / CV</Link></li>
          </ul>
          <ThemeSwitcher />
        </nav>

        <main className={styles.main}>
          <h1>Writing Samples</h1>
          <p className={styles.subtitle}>Articles, case studies, and technical insights</p>

          <section className={styles.content}>
            <p>I write on <a href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener">LinkedIn</a> and <a href="https://substack.com" target="_blank" rel="noopener">Substack</a>. For project deep-dives and case studies, check the featured work on my resume.</p>

            <h2>Get in Touch</h2>
            <p>
              Interested in collaborating or discussing ideas? Feel free to reach out:
            </p>
            <p>
              <Link href="mailto:m@xbaehr.com">m@xbaehr.com</Link>
            </p>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2024 Max Baehr. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
