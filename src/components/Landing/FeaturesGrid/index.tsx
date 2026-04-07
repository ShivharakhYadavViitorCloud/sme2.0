import type {ReactNode} from 'react';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

interface FeatureGroup {
  category: string;
  items: string[];
}

const GROUPS: FeatureGroup[] = [
  {
    category: 'Code Quality',
    items: ['ESLint', 'Prettier', 'Commitlint', 'Husky'],
  },
  {
    category: 'Developer Experience',
    items: ['VS Code config', 'Git hooks', 'Auto formatting', 'Lint-staged'],
  },
  {
    category: 'CI / CD',
    items: ['GitHub Actions', 'Lint checks', 'Pre-commit guard', 'Zero drift'],
  },
];

export default function FeaturesGrid(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section
      ref={ref}
      className={styles.section}
      style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Everything you need, built in</h2>
        <div className={styles.grid}>
          {GROUPS.map((g) => (
            <div key={g.category} className={styles.group}>
              <h3 className={styles.groupTitle}>{g.category}</h3>
              <div className={styles.pills}>
                {g.items.map((item) => (
                  <span key={item} className={styles.pill}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
