import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    category: String,
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
