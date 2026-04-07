import mongoose, {Schema} from 'mongoose';

export interface FeedbackDoc {
  path: string;
  title: string;
  helpful: boolean;
  clientTimestamp?: string;
  createdAt: Date;
}

const feedbackSchema = new Schema<FeedbackDoc>(
  {
    path: {type: String, required: true, index: true},
    title: {type: String, required: true},
    helpful: {type: Boolean, required: true},
    clientTimestamp: {type: String},
    createdAt: {type: Date, default: () => new Date(), index: true},
  },
  {versionKey: false},
);

export const FeedbackModel =
  mongoose.models.Feedback ??
  mongoose.model<FeedbackDoc>('Feedback', feedbackSchema);
