'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

type BearState = 'idle' | 'listening' | 'thinking' | 'talking';

interface CuddleBearProps {
  onSpeechResult: (text: string) => void;
  onMicToggle: (isListening: boolean) => void;
  isProcessing: boolean;
  bearResponse: string;
}

export default function CuddleBear({ 
  onSpeechResult, 
  onMicToggle, 
  isProcessing, 
  bearResponse 
}: CuddleBearProps) {
  const [bearState, setBearState] = useState<BearState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          setBearState('listening');
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onSpeechResult(transcript);
          setBearState('thinking');
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          onMicToggle(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          setBearState('idle');
          onMicToggle(false);
        };
      }

      synthRef.current = window.speechSynthesis;
    }
  }, [onSpeechResult, onMicToggle]);

  useEffect(() => {
    if (isProcessing) {
      setBearState('thinking');
    } else if (bearResponse && !isProcessing) {
      setBearState('talking');
      speakResponse(bearResponse);
    }
  }, [isProcessing, bearResponse]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      onMicToggle(true);
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setBearState('idle');
    };

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setBearState('idle');
    }
  };

  const getBearEmoji = () => {
    switch (bearState) {
      case 'listening': return '🐻👂';
      case 'thinking': return '🐻🤔';
      case 'talking': return '🐻💬';
      default: return '🧸';
    }
  };

  const getBearColor = () => {
    switch (bearState) {
      case 'listening': return 'text-blue-500';
      case 'thinking': return 'text-yellow-500';
      case 'talking': return 'text-green-500';
      default: return 'text-amber-600';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4 sm:p-8">
      <motion.div
        className="relative"
        animate={{
          scale: bearState === 'thinking' ? [1, 1.1, 1] : 1,
          rotate: bearState === 'listening' ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          duration: bearState === 'thinking' ? 1.5 : 0.5,
          repeat: bearState === 'thinking' ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <div className={`text-6xl sm:text-9xl ${getBearColor()} transition-colors duration-500`}>
          {getBearEmoji()}
        </div>
        
        <AnimatePresence>
          {bearState === 'listening' && (
            <motion.div
              className="absolute -inset-4 border-4 border-blue-300 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0.3, 0.7, 0.3] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.h1 
        className="text-2xl sm:text-4xl font-bold text-gray-800 mt-6 sm:mt-8 mb-2 sm:mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        CuddleBear AI
      </motion.h1>

      <motion.p 
        className="text-sm sm:text-lg text-gray-600 text-center mb-6 sm:mb-8 max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Your friendly AI companion powered by AWS Bedrock. Talk to me about anything!
      </motion.p>

      <div className="flex gap-4">
        <motion.button
          onClick={toggleListening}
          disabled={isProcessing}
          className={`p-4 rounded-full text-white font-semibold transition-all duration-200 shadow-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          whileHover={!isProcessing ? { scale: 1.05 } : {}}
          whileTap={!isProcessing ? { scale: 0.95 } : {}}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </motion.button>

        <motion.button
          onClick={isSpeaking ? stopSpeaking : undefined}
          disabled={!isSpeaking}
          className={`p-4 rounded-full text-white font-semibold transition-all duration-200 shadow-lg ${
            isSpeaking 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-gray-400'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          whileHover={isSpeaking ? { scale: 1.05 } : {}}
          whileTap={isSpeaking ? { scale: 0.95 } : {}}
        >
          {isSpeaking ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {bearState !== 'idle' && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-lg font-medium text-gray-700">
              {bearState === 'listening' && "I'm listening..."}
              {bearState === 'thinking' && "Let me think about that..."}
              {bearState === 'talking' && "Here's what I think:"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bearResponse && bearState === 'talking' && (
          <motion.div
            className="mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{bearResponse}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}