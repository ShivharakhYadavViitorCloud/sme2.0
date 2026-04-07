import type {ReactNode} from 'react';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

interface Row {
  label: string;
  manual: string;
  lintSage: string;
  manualBad?: boolean;
}

const ROWS: Row[] = [
  {
    label: 'Time to set up',
    manual: '30+ minutes',
    lintSage: '< 1 minute',
    manualBad: true,
  },
  {
    label: 'Consistency across projects',
    manual: 'Varies',
    lintSage: 'Guaranteed',
    manualBad: true,
  },
  {
    label: 'Human error risk',
    manual: 'High',
    lintSage: 'Near zero',
    manualBad: true,
  },
  {
    label: 'Maintenance effort',
    manual: 'Manual updates',
    lintSage: 'One command upgrade',
    manualBad: true,
  },
];

export default function ComparisonTable(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section
      ref={ref}
      className={styles.section}
      style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Manual setup vs lint-sage</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th />
                <th className={styles.colManual}>Manual</th>
                <th className={styles.colSage}>lint-sage</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className={styles.label}>{r.label}</td>
                  <td className={r.manualBad ? styles.bad : ''}>
                    {r.manual}
                  </td>
                  <td className={styles.good}>{r.lintSage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
