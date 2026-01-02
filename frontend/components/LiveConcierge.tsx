
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, X, Volume2, Sparkles, Activity } from 'lucide-react';

interface LiveConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveConcierge: React.FC<LiveConciergeProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioContextResumed = useRef(false);
  const nextStartTimeRef = useRef(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    audioSourcesRef.current.forEach(s => s.stop());
    audioSourcesRef.current.clear();
    setIsActive(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    // Fix: Always use process.env.API_KEY directly for GoogleGenAI initialization as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
        systemInstruction: 'You are the LuxeLaptops Concierge. You are professional, tech-savvy, and helpful. You help users navigate the store, explain laptop specs like M3 Max or RTX 4080, and assist with store policies. Keep your responses concise and high-end.',
      },
      callbacks: {
        onopen: () => {
          setIsConnecting(false);
          setIsActive(true);
          const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            sessionPromise.then(session => {
              session.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContextRef.current!.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioBase64 && outputAudioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
            const buffer = await decodeAudioData(decode(audioBase64), outputAudioContextRef.current, 24000, 1);
            const source = outputAudioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(outputAudioContextRef.current.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            audioSourcesRef.current.add(source);
            source.onended = () => audioSourcesRef.current.delete(source);
          }
          if (message.serverContent?.interrupted) {
            audioSourcesRef.current.forEach(s => s.stop());
            audioSourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onclose: () => setIsActive(false),
        onerror: (e) => console.error('Voice Session Error:', e),
      }
    });
    sessionRef.current = await sessionPromise;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl bg-slate-950/60 animate-in fade-in duration-300">
      <div className="relative glass w-full max-w-xl p-12 rounded-[4rem] border-blue-500/20 bg-slate-900/80 shadow-2xl flex flex-col items-center space-y-12">
        <button onClick={() => { stopSession(); onClose(); }} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-all">
          <X size={24} />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/10 p-5 rounded-3xl text-blue-500 shadow-2xl shadow-blue-500/20">
              <Sparkles size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase">Live Concierge</h2>
          <p className="text-slate-500 font-medium tracking-wide">Secure Neural Communication Link</p>
        </div>

        <div className="relative w-48 h-48 flex items-center justify-center">
          {isActive && (
            <>
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              <div className="absolute inset-4 bg-indigo-500/10 rounded-full animate-pulse" />
              <Activity size={64} className="text-blue-500 animate-pulse" />
            </>
          )}
          {!isActive && !isConnecting && (
            <div className="w-full h-full rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
              <MicOff size={48} className="text-slate-700" />
            </div>
          )}
          {isConnecting && (
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        <div className="w-full flex flex-col items-center space-y-6">
          <button
            onClick={isActive ? stopSession : startSession}
            disabled={isConnecting}
            className={`w-full py-6 rounded-3xl font-black text-xl uppercase tracking-widest transition-all flex items-center justify-center space-x-3 shadow-2xl ${
              isActive 
                ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 active:scale-95'
            }`}
          >
            {isActive ? <MicOff /> : <Mic />}
            <span>{isActive ? 'Terminate Session' : isConnecting ? 'Initializing...' : 'Initialize Voice Link'}</span>
          </button>
          
          <div className="flex items-center space-x-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <Volume2 size={14} />
            <span>Encrypted PCM Audio Output Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
