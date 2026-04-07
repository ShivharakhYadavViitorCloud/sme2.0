import type {ReactNode} from 'react';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

interface Persona {
  icon: string;
  title: string;
  description: string;
}

const PERSONAS: Persona[] = [
  {
    icon: '\uD83D\uDC69\u200D\uD83D\uDCBB',
    title: 'Solo Developers',
    description:
      'Ship faster with consistent linting and formatting from day one.',
  },
  {
    icon: '\uD83D\uDC65',
    title: 'Teams',
    description:
      'Enforce standards across every repo without manual setup work.',
  },
  {
    icon: '\uD83C\uDFE2',
    title: 'Organizations',
    description:
      'Maintain code quality at scale with zero-drift configuration.',
  },
];

export default function TargetUsers(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section ref={ref} className={styles.section} style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Built for everyone</h2>
        <div className={styles.grid}>
          {PERSONAS.map((p) => (
            <div key={p.title} className={styles.card}>
              <span className={styles.icon}>{p.icon}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
