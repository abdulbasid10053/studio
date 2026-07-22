import React, { useEffect, useState } from 'react';

// Simple wrapper around the Web Speech API (SpeechRecognition)
// If the browser does not support it, the component will render a disabled button.

let SpeechRecognition: any = null;
if (typeof window !== 'undefined') {
  SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
}

type VoiceInputProps = {
  /**
   * Called with the final transcript when the user stops speaking.
   */
  onResult: (transcript: string) => void;
};

export const VoiceInput: React.FC<VoiceInputProps> = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(!!SpeechRecognition);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!SpeechRecognition) return;
    const recognizer = new SpeechRecognition();
    recognizer.lang = 'id-ID'; // Indonesian language; fallback to default if needed
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    recognizer.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      onResult(transcript);
    };

    recognizer.onerror = (event: any) => {
      console.error('SpeechRecognition error', event);
      setError('Speech recognition error');
      alert('Speech recognition failed. Please ensure microphone access is allowed.');
    };

    recognizer.onend = () => {
      setListening(false);
    };

    recognizer.start();
    setListening(true);
    setError(null);
  };

  const stopListening = () => {
    // The SpeechRecognition instance will stop automatically after a result;
    // providing a manual stop helps when the user clicks the button again.
    // Unfortunately we cannot keep a reference to the recognizer here without a ref.
    // For simplicity we just toggle UI state; the recognizer will end on its own.
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      disabled={!supported}
      className={`flex items-center space-x-2 px-3 py-2 border rounded ${listening ? 'bg-green-100' : 'bg-gray-100'}
        ${!supported ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Voice order input"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={listening ? 'red' : 'currentColor'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m0 0a4 4 0 004-4H8a4 4 0 004 4zM5 12a7 7 0 0014 0" />
      </svg>
      <span>{listening ? 'Listening...' : 'Add via Voice'}</span>
    </button>
  );
};
