import type {ReactNode} from 'react';
import TerminalBlock from '../TerminalBlock';
import {useFadeIn} from '../useFadeIn';
import styles from './styles.module.css';

const LINES = [
  {prefix: 'dollar' as const, text: 'npx @vcian/lint-sage@latest'},
  {prefix: 'none' as const, text: ''},
  {prefix: 'arrow' as const, text: 'Analyzing project structure...'},
  {prefix: 'check' as const, text: 'Detected: React + TypeScript'},
  {prefix: 'check' as const, text: 'ESLint configured (8 rules enabled)'},
  {prefix: 'check' as const, text: 'Prettier configured'},
  {prefix: 'check' as const, text: 'Husky + lint-staged configured'},
  {prefix: 'check' as const, text: 'Commitlint configured'},
  {prefix: 'none' as const, text: ''},
  {prefix: 'check' as const, text: 'All done! Happy coding.'},
];

export default function CliExperience(): ReactNode {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section ref={ref} className={styles.section} style={{opacity: 0}}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          One command. Fully configured.
        </h2>
        <p className={styles.subtitle}>
          No more copy-pasting config files between projects. lint-sage
          detects your stack and sets everything up in seconds.
        </p>
        <div className={styles.terminalWrap}>
          <TerminalBlock
            title="lint-sage"
            lines={LINES}
            copyText="npx @vcian/lint-sage@latest"
            className={styles.big}
          />
        </div>
      </div>
    </section>
  );
}
