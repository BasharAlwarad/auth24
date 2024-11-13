import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/reviewModel.js';
import Post from '../models/postsModel.js';

export const createChat = asyncHandler(async (req, res) => {
  const {
    body: { stream, message },
    headers: { mode },
  } = req;

  const postId = req.params.postId;
  const post = await Post.findById(postId).populate('user', 'name email');
  const reviews = await Review.find({ post: postId }).populate(
    'user',
    'name email'
  );

  let request = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are talking to a review bot. Ask it anything.',
      },
      {
        role: 'user',
        content: `${message}. here is the post ${
          post.text
        }. and those are the reviews of the post ${reviews.map(
          (review) => review.text
        )}`,
      },
    ],
  };
  let openai;

  mode === 'production'
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  const completion = await openai.chat.completions.create({
    stream,
    ...request,
  });

  if (stream) {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
    });
    for await (const chunk of completion) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
    res.on('close', () => res.end());
  } else {
    res.json(completion.choices[0]);
  }
});
