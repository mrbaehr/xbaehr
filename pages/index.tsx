import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Max Baehr | Product • Platform • Vibes</title>
        <meta name="description" content="Product manager, platform thinker, tech enthusiast" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        </nav>

        <main className={styles.main}>
          <h1>Max Baehr</h1>
          <p className={styles.tagline}>Product manager, platform launcher; ex-cable subscriber; great dinner guest.</p>
          
          <section className={styles.intro}>
            <p>
              I'm a product and platform-focused technologist with a background in building scalable systems 
              and leading cross-functional teams. I'm passionate about clean design, thoughtful architecture, 
              and shipping products that matter.
            </p>
          </section>

          <section className={styles.quickLinks}>
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link href="/writing">Writing Samples</Link> — A collection of my published work and case studies
              </li>
              <li>
                <Link href="/resume">Resume / CV</Link> — Download my full resume or view online
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener">
                  LinkedIn Profile
                </Link>
              </li>
              <li>
                <Link href="mailto:m@xbaehr.com">Email: m@xbaehr.com</Link>
              </li>
            </ul>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2024 Max Baehr. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
