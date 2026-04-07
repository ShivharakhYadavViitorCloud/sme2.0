import {Router} from 'express';
import {config} from '../config.js';
import {ChatLogModel} from '../models/ChatLog.js';

type ChatMessage = {role: string; content: string};

export const chatRouter = Router();

function preview(s: string, max = 2000): string {
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

chatRouter.post('/', async (req, res) => {
  try {
    const body = req.body as {
      messages?: ChatMessage[];
      pageTitle?: string;
      pagePath?: string;
    };

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const pageTitle = typeof body.pageTitle === 'string' ? body.pageTitle : '';
    const pagePath = typeof body.pagePath === 'string' ? body.pagePath : '/';

    const system = `You are the SME 2.0 documentation assistant. Answer concisely about Git workflows, branching, conventional commits, code reviews, releases, security, and automation as described in the team handbook. If the user asks something unrelated, politely say you only help with this documentation scope.

Context: the reader may be viewing page "${pageTitle || 'unknown'}" at path "${pagePath}".`;

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: config.openaiModel,
        messages: [{role: 'system', content: system}, ...messages],
        max_tokens: 900,
        temperature: 0.3,
      }),
    });

    const raw = await upstream.text();
    if (!upstream.ok) {
      res.status(502).json({error: 'OpenAI request failed', detail: raw});
      return;
    }

    let data: {choices?: Array<{message?: {content?: string}}>};
    try {
      data = JSON.parse(raw) as typeof data;
    } catch {
      res.status(502).json({error: 'Invalid OpenAI response'});
      return;
    }

    const content = data.choices?.[0]?.message?.content ?? '';
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');

    try {
      await ChatLogModel.create({
        pagePath,
        pageTitle: pageTitle || '(untitled)',
        lastUserPreview: preview(lastUser?.content ?? ''),
        assistantPreview: preview(content),
        model: config.openaiModel,
      });
    } catch (logErr) {
      console.error('ChatLog persist failed', logErr);
    }

    res.status(200).json({content});
  } catch (e) {
    console.error(e);
    res.status(500).json({error: 'Chat failed'});
  }
});
