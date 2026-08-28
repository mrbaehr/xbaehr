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
              <p>Product Leader | Platform Builder</p>
              <p><Link href="mailto:m@xbaehr.com">m@xbaehr.com</Link> | <Link href="https://www.linkedin.com/in/mbaehr" target="_blank" rel="noopener">LinkedIn</Link></p>
            </div>

            <h3>Executive Summary</h3>
            <p>
              Results-driven product and platform leader with experience building scalable systems, leading cross-functional teams, 
              and shipping products that impact millions of users. Strong background in system design, technical strategy, and 
              organizational development.
            </p>

            <h3>Experience</h3>
            
            <div className={styles.experienceItem}>
              <h4>Product Manager</h4>
              <p className={styles.date}>2021 - Present</p>
              <p><strong>Featured Project: [Your Key Product Initiative]</strong></p>
              <ul>
                <li>[Key achievement or launch]</li>
                <li>Impact: [Metrics — revenue, users, adoption, etc.]</li>
                <li><a href="#" target="_blank" rel="noopener">Learn more →</a></li>
              </ul>
              <p><strong>Additional Highlights:</strong></p>
              <ul>
                <li>Led cross-functional teams across engineering, design, and go-to-market</li>
                <li>Increased product adoption by 150% through targeted feature launches</li>
                <li>Managed $2M+ annual budget and vendor relationships</li>
                <li>Defined product strategy and roadmap for core platform initiatives</li>
              </ul>
            </div>

            <div className={styles.experienceItem}>
              <h4>Senior Engineer / Tech Lead</h4>
              <p className={styles.date}>2019 - 2021</p>
              <p><strong>Featured Project: [Platform or API Launch]</strong></p>
              <ul>
                <li>[Key technical achievement]</li>
                <li>Impact: [Metrics — performance, adoption, team growth, etc.]</li>
                <li><a href="#" target="_blank" rel="noopener">Explore →</a></li>
              </ul>
              <p><strong>Additional Highlights:</strong></p>
              <ul>
                <li>Architected scalable backend systems supporting 10M+ daily active users</li>
                <li>Led team of 5 engineers on platform infrastructure</li>
                <li>Reduced API latency by 40% through optimization initiatives</li>
                <li>Established engineering best practices and code review standards</li>
              </ul>
            </div>

            <div className={styles.experienceItem}>
              <h4>Software Engineer</h4>
              <p className={styles.date}>2017 - 2019</p>
              <ul>
                <li>Built core platform features using TypeScript, Node.js, and React</li>
                <li>Improved test coverage from 45% to 85%</li>
                <li>Mentored 2 junior engineers on full-stack development</li>
              </ul>
            </div>

            <h3>Education</h3>
            
            <div className={styles.educationItem}>
              <h4>BS in Computer Science</h4>
              <p className={styles.date}>University of Washington, 2017</p>
              <p>Focus: Distributed Systems and Software Engineering</p>
            </div>

            <h3>Skills</h3>
            
            <div className={styles.skillsSection}>
              <h4>Product & Strategy</h4>
              <p>Product Strategy • Roadmapping • User Research • GTM • Analytics • A/B Testing</p>
            </div>

            <div className={styles.skillsSection}>
              <h4>Technical</h4>
              <p>TypeScript • Node.js • React • Next.js • PostgreSQL • AWS • Docker • Kubernetes</p>
            </div>

            <div className={styles.skillsSection}>
              <h4>Leadership</h4>
              <p>Team Building • Mentoring • Cross-functional Collaboration • Stakeholder Management</p>
            </div>

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
