import type { NextApiRequest, NextApiResponse } from 'next';
import { getYoutubeTranscript } from '../../utils/youtubeTranscript';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: 'Video URL is required' });
  }

  console.log('Received video URL:', videoUrl);

  try {
    console.log('Fetching YouTube transcript...');
    const videoId = new URL(videoUrl).searchParams.get('v');
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }
    const transcript = await getYoutubeTranscript(videoId);
    console.log('Transcript fetched successfully');

    res.status(200).json({ transcription: transcript });
  } catch (error) {
    console.error('Error in transcription process:', error);
    res.status(500).json({ message: 'Error in transcription process', error: error.message });
  }
}