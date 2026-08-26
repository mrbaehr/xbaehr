import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Page.module.css';

export default function Resume() {
  return (
    <>
      <Head>
        <title>Resume | Max Baehr</title>
        <meta name="description" content="Resume and CV for Max Baehr" />
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
          <h1>Resume / CV</h1>
          
          <section className={styles.content}>
            <div className={styles.resumeHeader}>
              <h2>Max Baehr</h2>
              <p>Product Manager | Platform Engineer | Technology Leader</p>
              <p><Link href="mailto:m@xbaehr.com">m@xbaehr.com</Link> | <Link href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener">LinkedIn</Link></p>
            </div>

            <h3>Executive Summary</h3>
            <p>
              Results-driven product and platform leader with experience building scalable systems, leading cross-functional teams, 
              and shipping products that impact millions of users. Strong background in system design, technical strategy, and 
              organizational development.
            </p>

            <h3>Experience</h3>
            <p className={styles.placeholder}>
              [Your professional experience will go here. LinkedIn data will be extracted and formatted in this section.]
            </p>

            <h3>Education</h3>
            <p className={styles.placeholder}>
              [Education background will be populated here.]
            </p>

            <h3>Skills</h3>
            <p className={styles.placeholder}>
              [Key skills and expertise will be listed here.]
            </p>

            <h3>Download Full Resume</h3>
            <p>
              <Link href="/resume.pdf" target="_blank">
                Download PDF Resume
              </Link>
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
