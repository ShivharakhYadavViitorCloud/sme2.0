import Link from '@docusaurus/Link';
import type {ReactNode} from 'react';
import TerminalBlock from '../TerminalBlock';
import styles from './styles.module.css';

const HERO_LINES = [
  {prefix: 'dollar' as const, text: 'npx @vcian/lint-sage@latest init'},
  {prefix: 'check' as const, text: 'Detecting project...'},
  {prefix: 'check' as const, text: 'Installing dependencies...'},
  {prefix: 'check' as const, text: 'Setting up ESLint, Prettier, Husky...'},
  {prefix: 'check' as const, text: 'Done! Your project is lint-ready.'},
];

export default function HeroSection(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 className={styles.heading}>
            Ship Clean Code,{' '}
            <span className={styles.accent}>Automatically</span>
          </h1>
          <p className={styles.subtitle}>
            One command to set up ESLint, Prettier, Commitlint, Husky and
            more. No config files to write. Works with any JS/TS project.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/next/git-best-practices/overview">
              Get Started
            </Link>
            <Link
              className="button button--outline button--lg"
              href="https://github.com/vcian/lint-sage"
              target="_blank"
              rel="noopener noreferrer">
              View on GitHub
            </Link>
          </div>
        </div>
        <div className={styles.terminalWrap}>
          <TerminalBlock
            title="lint-sage"
            lines={HERO_LINES}
            copyText="npx @vcian/lint-sage@latest init"
          />
        </div>
      </div>
    </header>
  );
}
