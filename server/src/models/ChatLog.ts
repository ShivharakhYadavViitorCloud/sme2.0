import mongoose, {Schema} from 'mongoose';

/** Optional audit trail for assistant usage (no full message history by default). */
export interface ChatLogDoc {
  pagePath: string;
  pageTitle: string;
  lastUserPreview: string;
  assistantPreview: string;
  model: string;
  createdAt: Date;
}

const chatLogSchema = new Schema<ChatLogDoc>(
  {
    pagePath: {type: String, required: true, index: true},
    pageTitle: {type: String, required: true},
    lastUserPreview: {type: String, required: true},
    assistantPreview: {type: String, required: true},
    model: {type: String, required: true},
    createdAt: {type: Date, default: () => new Date(), index: true},
  },
  {versionKey: false},
);

export const ChatLogModel =
  mongoose.models.ChatLog ??
  mongoose.model<ChatLogDoc>('ChatLog', chatLogSchema);
