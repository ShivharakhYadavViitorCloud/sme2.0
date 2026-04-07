import type {ReactNode} from 'react';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

interface Step {
  icon: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: '\uD83D\uDD0E',
    title: 'Detect',
    description: 'Scans your project to identify framework, language, and tooling.',
  },
  {
    icon: '\uD83D\uDEE0\uFE0F',
    title: 'Resolve',
    description: 'Picks the optimal config set and installs all dependencies.',
  },
  {
    icon: '\uD83D\uDCCA',
    title: 'Report',
    description: 'Summarizes what was configured and highlights any issues.',
  },
  {
    icon: '\uD83C\uDFD7\uFE0F',
    title: 'Scaffold',
    description: 'Writes config files, Git hooks, and CI workflows to your repo.',
  },
];

export default function HowItWorks(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section
      ref={ref}
      className={styles.section}
      style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.flow}>
          {STEPS.map((s, i) => (
            <div key={s.title} className={styles.step}>
              <span className={styles.icon}>{s.icon}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.description}</p>
              {i < STEPS.length - 1 && (
                <span className={styles.connector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
