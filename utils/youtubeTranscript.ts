import axios from 'axios';

export async function getYoutubeTranscript(videoId: string): Promise<string> {
  try {
    const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);
    const html = response.data;

    // Extract the transcript data from the HTML
    const captionTrackRegex = /"captionTracks":(\[.*?\])/;
    const match = html.match(captionTrackRegex);

    if (!match) {
      throw new Error('No captions found for this video');
    }

    const captionTracks = JSON.parse(match[1]);
    const englishTrack = captionTracks.find((track: any) => track.languageCode === 'en');

    if (!englishTrack) {
      throw new Error('No English captions found for this video');
    }

    const transcriptResponse = await axios.get(englishTrack.baseUrl);
    const transcript = transcriptResponse.data;

    // Parse the transcript XML and extract the text
    const textRegex = /<text[^>]*>(.*?)<\/text>/g;
    let fullTranscript = '';
    let matches;
    while ((matches = textRegex.exec(transcript)) !== null) {
      fullTranscript += matches[1] + ' ';
    }

    return fullTranscript.trim();
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);
    throw error;
  }
}