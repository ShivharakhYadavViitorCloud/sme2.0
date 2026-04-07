import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useCallback, useState, type ReactNode} from 'react';

import styles from './styles.module.css';

type Vote = 'up' | 'down' | null;

function storageKey(permalink: string): string {
  return `doc-feedback:${permalink}`;
}

export default function DocFeedback(): ReactNode {
  const {metadata} = useDoc();
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const apiBase =
    (customFields?.publicApiBaseUrl as string | undefined) ?? '';

  const [vote, setVote] = useState<Vote>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const raw = window.localStorage.getItem(
      storageKey(metadata.permalink),
    ) as Vote | null;
    return raw === 'up' || raw === 'down' ? raw : null;
  });

  const persist = useCallback(
    (next: Vote): void => {
      setVote(next);
      if (typeof window === 'undefined') {
        return;
      }
      if (next) {
        window.localStorage.setItem(storageKey(metadata.permalink), next);
      } else {
        window.localStorage.removeItem(storageKey(metadata.permalink));
      }
    },
    [metadata.permalink],
  );

  const sendToApi = useCallback(
    async (helpful: boolean): Promise<void> => {
      if (!apiBase) {
        return;
      }
      try {
        await fetch(`${apiBase.replace(/\/$/, '')}/api/feedback`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            path: metadata.permalink,
            title: metadata.title,
            helpful,
            timestamp: new Date().toISOString(),
          }),
          mode: 'cors',
        });
      } catch {
        // Non-fatal: feedback still stored locally
      }
    },
    [apiBase, metadata.permalink, metadata.title],
  );

  const onVote = useCallback(
    (next: Exclude<Vote, null>): void => {
      if (vote === next) {
        persist(null);
        return;
      }
      persist(next);
      if (next === 'up') {
        void sendToApi(true);
      } else if (next === 'down') {
        void sendToApi(false);
      }
    },
    [persist, sendToApi, vote],
  );

  return (
    <div
      className={styles.feedback}
      role="group"
      aria-label="Documentation feedback">
      <span className={styles.prompt}>Was this page helpful?</span>
      <div className={styles.actions}>
        <button
          type="button"
          className={
            vote === 'up'
              ? `${styles.btn} ${styles.btnActive}`
              : styles.btn
          }
          onClick={(): void => onVote('up')}
          aria-pressed={vote === 'up'}>
          Yes
        </button>
        <button
          type="button"
          className={
            vote === 'down'
              ? `${styles.btn} ${styles.btnActive}`
              : styles.btn
          }
          onClick={(): void => onVote('down')}
          aria-pressed={vote === 'down'}>
          No
        </button>
      </div>
    </div>
  );
}
