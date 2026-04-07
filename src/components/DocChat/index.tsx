import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import styles from './styles.module.css';

type Msg = {role: 'user' | 'assistant'; content: string};

export default function DocChat(): ReactNode {
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const apiBase =
    (customFields?.publicApiBaseUrl as string | undefined) ?? '';
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const h1 = document.querySelector('article h1, main h1');
    setPageTitle(h1?.textContent?.trim() ?? document.title);
  }, [location.pathname]);

  const send = useCallback(async (): Promise<void> => {
    const text = input.trim();
    if (!text || !apiBase) {
      return;
    }
    const nextUser: Msg = {role: 'user', content: text};
    const history = [...messages, nextUser];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/chat`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          messages: history.map(({role, content}) => ({role, content})),
          pageTitle,
          pagePath: location.pathname,
        }),
      });
      const data = (await res.json()) as {content?: string; error?: string};
      if (!res.ok) {
        throw new Error(data.error ?? res.statusText);
      }
      setMessages((m) => [
        ...m,
        {role: 'assistant', content: data.content ?? '(empty response)'},
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            e instanceof Error
              ? `Error: ${e.message}`
              : 'Something went wrong.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [apiBase, input, messages, pageTitle, location.pathname]);

  const onSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      void send();
    },
    [send],
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (ev: KeyboardEvent): void => {
      if (ev.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!apiBase) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        onClick={(): void => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="doc-chat-panel"
        title="Open documentation assistant">
        Ask
      </button>
      {open && (
        <div
          className={styles.backdrop}
          role="presentation"
          onClick={(): void => setOpen(false)}
        />
      )}
      {open && (
        <div
          id="doc-chat-panel"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Documentation assistant">
          <div className={styles.panelHeader}>
            <span>Docs assistant</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={(): void => setOpen(false)}
              aria-label="Close">
              ×
            </button>
          </div>
          <p className={styles.hint}>
            Uses your OpenAI proxy. Page:{' '}
            <strong>{pageTitle || location.pathname}</strong>
          </p>
          <div className={styles.thread} role="log">
            {messages.length === 0 && (
              <p className={styles.placeholder}>
                Ask about Git workflows, reviews, or this handbook.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={
                  m.role === 'user' ? styles.msgUser : styles.msgAssistant
                }>
                {m.content}
              </div>
            ))}
            {loading && <div className={styles.msgAssistant}>…</div>}
          </div>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              className={styles.input}
              value={input}
              onChange={(e): void => setInput(e.target.value)}
              placeholder="Message…"
              disabled={loading}
              autoComplete="off"
            />
            <button type="submit" className={styles.send} disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
