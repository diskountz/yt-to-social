import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import VideoInput from '../components/VideoInput';
import VideoPreview from '../components/VideoPreview';
import TranscriptionCard from '../components/TranscriptionCard';
import SocialMediaCard from '../components/SocialMediaCard';
import BlogOutlineCard from '../components/BlogOutlineCard';
import CustomScriptCard from '../components/CustomScriptCard';

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcription, setTranscription] = useState('');
  const [socialMediaContent, setSocialMediaContent] = useState({
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  });
  const [blogOutline, setBlogOutline] = useState('');
  const [customScript, setCustomScript] = useState('');
  const [error, setError] = useState('');
  const [progressLogs, setProgressLogs] = useState<string[]>([]);

  const addProgressLog = (log: string) => {
    setProgressLogs(prev => [...prev, log]);
    console.log(log); // Add console logging for debugging
  };

  const handleVideoSubmit = async (url: string) => {
    setVideoUrl(url);
    setError('');
    setProgressLogs([]);
    addProgressLog('Processing started...');

    try {
      addProgressLog('Calling transcribe API...');
      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url }),
      });

      if (!transcribeResponse.ok) {
        throw new Error(`Transcribe API error: ${transcribeResponse.statusText}`);
      }

      const transcribeData = await transcribeResponse.json();
      addProgressLog('Transcription completed');
      setTranscription(transcribeData.transcription);

      addProgressLog('Calling generate API...');
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcription: transcribeData.transcription }),
      });

      if (!generateResponse.ok) {
        throw new Error(`Generate API error: ${generateResponse.statusText}`);
      }

      const generateData = await generateResponse.json();
      addProgressLog('Content generation completed');
      setSocialMediaContent(generateData.socialMediaContent);
      setBlogOutline(generateData.blogOutline);
      setCustomScript(generateData.customScript);

      addProgressLog('Processing completed successfully');
    } catch (error) {
      console.error('Error processing video:', error);
      setError(`An error occurred while processing the video: ${error.message}`);
      addProgressLog(`Error: ${error.message}`);
    }
  };

  return (
    <Layout>
      <Head>
        <title>YouTube Video Processor</title>
        <meta name="description" content="Process YouTube videos and generate AI content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-8">
        <VideoInput onSubmit={handleVideoSubmit} />
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        {videoUrl && <VideoPreview url={videoUrl} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Progress Logs</h2>
            <ul className="list-disc pl-5 space-y-2">
              {progressLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>

          {transcription && <TranscriptionCard transcription={transcription} />}
          {socialMediaContent.facebook && <SocialMediaCard content={socialMediaContent} />}
          {blogOutline && <BlogOutlineCard outline={blogOutline} />}
          {customScript && <CustomScriptCard script={customScript} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;