import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Max Baehr</title>
        <meta name="description" content="Product manager, platform thinker, tech enthusiast" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>
            <Link href="/">Max Baehr</Link>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/writing">Writing</Link></li>
            <li><Link href="/resume">Resume</Link></li>
          </ul>
        </nav>

        <main className={styles.main}>
          <h1>Max Baehr</h1>
          <p className={styles.tagline}>Product manager, platform launcher; ex-cable subscriber; great dinner guest.</p>

          <div className={styles.intro}>
            <p>
              I build products and platforms. Background in scalable systems, cross-functional teams, 
              and shipping things that matter.
            </p>
          </div>

          <ul className={styles.links}>
            <li><Link href="/writing">Writing</Link></li>
            <li><Link href="/resume">Resume</Link></li>
            <li>
              <a href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li><a href="mailto:m@xbaehr.com">m@xbaehr.com</a></li>
          </ul>
        </main>

        <footer className={styles.footer}>
          <p>Max Baehr</p>
        </footer>
      </div>
    </>
  );
}
