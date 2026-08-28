import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import styles from '../styles/Home.module.css';

export default function Home() {
  const openEmailClient = () => {
    const emailAddress = String.fromCharCode(
      109, 64, 120, 98, 97, 101, 104, 114, 46, 99, 111, 109
    );

    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <>
      <Head>
        <title>Max Baehr | Product Manager | Platform Launcher</title>
        <meta name="description" content="Product manager, platform thinker, tech enthusiast" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>
            <Link href="/">Max Baehr</Link>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="https://meatboundary.substack.com" target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">🤝 </span>Substack
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">🖇️ </span>LinkedIn
              </a>
            </li>
            <li>
              <button type="button" className={styles.navLinkButton} onClick={openEmailClient}>
                <span aria-hidden="true">🐦 </span>Mail
              </button>
            </li>
          </ul>
          <ThemeSwitcher />
        </nav>

        <main className={styles.main}>
          <h1>Max Baehr</h1>
          <h3 className={styles.tagline}>Product manager, platform launcher; great dinner guest.</h3>

          <section className={styles.intro}>
            <p>
              🪴 I'm a PM and builder with over 15 years of experience spanning advertising, martech, video
              workflow, devtools, and builder platforms; SMB to Enterprise deployments. I enjoy reading,{' '}
              <a href="https://meatboundary.substack.com/" target="_blank" rel="noopener noreferrer">writing</a>,
              {' '}running, the NYTXW, and gardening. I recently built and launched an{' '}
              <a
                href="https://apps.apple.com/us/app/proplifting/id6761067409"
                target="_blank"
                rel="noopener noreferrer"
              >
                iOS app
              </a>
              , which worked pretty well until I throttled my AI keys and stopped paying for hosting.
            </p>
          </section>

          <section className={styles.quickLinks}>
            <h2>Get in touch</h2>
            <ul>
              <li>
                <a href="https://meatboundary.substack.com" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">🤝 </span>Substack
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">🖇️ </span>LinkedIn
                </a>
              </li>
              <li>
                <button type="button" className={styles.quickLinkButton} onClick={openEmailClient}>
                  <span aria-hidden="true">🐦 </span>Mail
                </button>
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
