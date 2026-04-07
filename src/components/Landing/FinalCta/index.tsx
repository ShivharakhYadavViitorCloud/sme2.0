import Link from '@docusaurus/Link';
import type {ReactNode} from 'react';
import styles from './styles.module.css';

export default function FinalCta(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Ready to ship cleaner code?</h2>
        <p className={styles.subtitle}>
          Set up your entire code quality stack in under a minute.
        </p>
        <Link
          className="button button--primary button--lg"
          to="/docs/next/git-best-practices/overview">
          Get Started Now
        </Link>
      </div>
    </section>
  );
}
