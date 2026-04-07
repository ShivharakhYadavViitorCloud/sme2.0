import type {ReactNode} from 'react';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

interface Prop {
  icon: string;
  title: string;
  description: string;
}

const PROPS: Prop[] = [
  {
    icon: '\u26A1',
    title: 'Zero Config Setup',
    description:
      'Run one command and get a fully configured linting and formatting pipeline.',
  },
  {
    icon: '\uD83D\uDD0D',
    title: 'Smart Detection',
    description:
      'Automatically detects your project type and applies the right rules.',
  },
  {
    icon: '\uD83D\uDE80',
    title: 'Production Ready',
    description:
      'Battle-tested configs used across hundreds of enterprise projects.',
  },
  {
    icon: '\uD83D\uDD27',
    title: 'Fully Customizable',
    description:
      'Override any rule. Eject when you need to. No vendor lock-in.',
  },
];

export default function ValueProps(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section ref={ref} className={styles.section} style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Why developers choose lint-sage
        </h2>
        <div className={styles.grid}>
          {PROPS.map((p) => (
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
