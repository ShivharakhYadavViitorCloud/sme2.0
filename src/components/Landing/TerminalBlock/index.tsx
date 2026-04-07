import {useCallback, useState, type ReactNode} from 'react';
import styles from './styles.module.css';

interface TerminalLine {
  text: string;
  prefix?: 'check' | 'arrow' | 'dollar' | 'none';
}

interface Props {
  title?: string;
  lines: TerminalLine[];
  copyText?: string;
  className?: string;
}

export default function TerminalBlock({
  title = 'Terminal',
  lines,
  copyText,
  className,
}: Props): ReactNode {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (!copyText) return;
    void navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyText]);

  return (
    <div className={`${styles.terminal} ${className ?? ''}`}>
      <div className={styles.chrome}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.title}>{title}</span>
        {copyText && (
          <button
            type="button"
            className={styles.copyBtn}
            onClick={onCopy}
            aria-label="Copy to clipboard">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <div className={styles.body}>
        {lines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.prefix === 'check' && (
              <span className={styles.check}>&#10004;</span>
            )}
            {line.prefix === 'arrow' && (
              <span className={styles.arrow}>&#10148;</span>
            )}
            {line.prefix === 'dollar' && (
              <span className={styles.dollar}>$</span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
        <span className={styles.cursor} />
      </div>
    </div>
  );
}
