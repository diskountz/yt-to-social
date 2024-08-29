import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { transcription } = req.body;

  if (!transcription) {
    return res.status(400).json({ message: 'Transcription is required' });
  }

  try {
    const [socialMediaContent, blogOutline, customScript] = await Promise.all([
      generateSocialMediaContent(transcription),
      generateBlogOutline(transcription),
      generateCustomScript(transcription)
    ]);

    res.status(200).json({ socialMediaContent, blogOutline, customScript });
  } catch (error) {
    console.error('Error in content generation:', error);
    res.status(500).json({ message: 'Error in content generation process', error: error.message });
  }
}

async function generateSocialMediaContent(transcription: string) {
  const prompt = `Based on the following video transcription, generate engaging social media posts for Facebook, Twitter, LinkedIn, and Instagram:

${transcription}

Generate the posts in the following format:
Facebook: [Facebook post]
Twitter: [Twitter post]
LinkedIn: [LinkedIn post]
Instagram: [Instagram post]`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.data.choices[0].message?.content;
  const [facebook, twitter, linkedin, instagram] = content?.split('\n') ?? [];

  return {
    facebook: facebook?.replace('Facebook: ', ''),
    twitter: twitter?.replace('Twitter: ', ''),
    linkedin: linkedin?.replace('LinkedIn: ', ''),
    instagram: instagram?.replace('Instagram: ', ''),
  };
}

async function generateBlogOutline(transcription: string) {
  const prompt = `Based on the following video transcription, generate a detailed blog post outline:

${transcription}

Generate the outline in a structured format with main points and subpoints.`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices[0].message?.content ?? '';
}

async function generateCustomScript(transcription: string) {
  const prompt = `Based on the following video transcription, generate a new, unique 1-minute video script that covers similar topics but with a different approach or perspective:

${transcription}

Generate a full video script suitable for a 1-minute YouTube short, including intro, main content, and outro.`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices[0].message?.content ?? '';
}