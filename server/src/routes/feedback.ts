import {Router} from 'express';
import {FeedbackModel} from '../models/Feedback.js';

export const feedbackRouter = Router();

feedbackRouter.post('/', async (req, res) => {
  try {
    const {path, title, helpful, timestamp} = req.body as {
      path?: string;
      title?: string;
      helpful?: boolean;
      timestamp?: string;
    };

    if (typeof path !== 'string' || !path.trim()) {
      res.status(400).json({error: 'path is required'});
      return;
    }
    if (typeof title !== 'string') {
      res.status(400).json({error: 'title is required'});
      return;
    }
    if (typeof helpful !== 'boolean') {
      res.status(400).json({error: 'helpful must be a boolean'});
      return;
    }

    await FeedbackModel.create({
      path: path.trim(),
      title: title.trim(),
      helpful,
      clientTimestamp:
        typeof timestamp === 'string' ? timestamp : undefined,
    });

    res.status(201).json({ok: true});
  } catch (e) {
    console.error(e);
    res.status(500).json({error: 'Failed to save feedback'});
  }
});
