import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useEffect, useRef, type ReactNode} from 'react';

import styles from './api-reference.module.css';

declare global {
  interface Window {
    SwaggerUIBundle?: {
      (opts: Record<string, unknown>): unknown;
      presets: {apis: unknown; standalone: unknown};
    };
    SwaggerUIStandalonePreset?: unknown;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = (): void => resolve();
    s.onerror = (): void => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

function SwaggerLoader(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const specUrl = useBaseUrl('/openapi/openapi.yaml');

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css';
    document.head.appendChild(css);

    let cancelled = false;

    void (async (): Promise<void> => {
      try {
        await loadScript(
          'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
        );
        await loadScript(
          'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js',
        );
        if (cancelled || !ref.current) {
          return;
        }
        ref.current.innerHTML = '<div id="swagger-ui-root"></div>';
        const {SwaggerUIBundle, SwaggerUIStandalonePreset} = window;
        if (!SwaggerUIBundle || !SwaggerUIStandalonePreset) {
          ref.current.textContent = 'Could not load Swagger UI.';
          return;
        }
        SwaggerUIBundle({
          url: specUrl,
          dom_id: '#swagger-ui-root',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset,
          ],
        });
      } catch {
        if (ref.current) {
          ref.current.textContent =
            'Failed to load API explorer. Check your network connection.';
        }
      }
    })();

    return (): void => {
      cancelled = true;
      css.remove();
    };
  }, [specUrl]);

  return <div ref={ref} className={styles.swaggerMount} />;
}

export default function ApiReferencePage(): ReactNode {
  return (
    <Layout title="API reference" description="OpenAPI (Swagger) UI for SME 2.0">
      <div className="container margin-vert--lg">
        <Heading as="h1">API reference</Heading>
        <p>
          The schema is loaded from{' '}
          <code>static/openapi/openapi.yaml</code>. Replace it with your own
          OpenAPI document and rebuild the site.
        </p>
        <BrowserOnly fallback={<div>Loading API explorer…</div>}>
          {() => <SwaggerLoader />}
        </BrowserOnly>
      </div>
    </Layout>
  );
}
