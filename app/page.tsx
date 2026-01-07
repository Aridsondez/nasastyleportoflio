'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          // Delay slightly to ensure smooth transition
          setTimeout(() => {
            router.push('/control-room');
          }, 500);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [router]);

  const handleSkip = useCallback(() => {
    router.push('/report');
  }, [router]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSkip();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleSkip]);

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-panel-bg border-2 border-terminal-green rounded-none p-8 shadow-glow-green">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-orbitron text-terminal-green mb-2 tracking-wider">
              MISSION CONTROL
            </h1>
            <p className="text-terminal-green-dim font-mono uppercase tracking-widest">INITIALIZING...</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-console-bg h-4 overflow-hidden border-2 border-terminal-green-dark">
              <div
                className="h-full bg-gradient-to-r from-terminal-green to-cyber-blue transition-all duration-300 shadow-glow-green"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-terminal-green mt-2 font-mono font-bold">
              {progress}%
            </p>
          </div>

          {/* Skip Prompt */}
          {showSkip && (
            <div className="bg-console-bg border-2 border-cyber-blue p-6 mb-6 shadow-glow-blue">
              <div className="text-center">
                <p className="text-terminal-green mb-4 font-mono">
                  <span className="text-cyber-blue font-bold tracking-wider">SKIP TO CLASSIFIED REPORT</span>
                  {' '}<span className="text-terminal-green-dim">[Press Enter]</span>
                </p>
                <p className="text-terminal-green-dim text-sm font-mono mb-4">
                  or wait to explore control room
                </p>
                <button
                  onClick={handleSkip}
                  className="mt-2 px-6 py-3 bg-panel-bg border-2 border-cyber-blue text-cyber-blue font-bold font-mono rounded-none transition-all hover:bg-cyber-blue hover:text-deep-black shadow-glow-blue uppercase tracking-wider"
                >
                  [Skip to Report]
                </button>
              </div>
            </div>
          )}

          {/* Loading Systems */}
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="text-terminal-green font-bold">✓</span>
              <span className="text-terminal-green-dim">Loading systems...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-terminal-green font-bold">✓</span>
              <span className="text-terminal-green-dim">WebSockets initialized</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-terminal-green font-bold">✓</span>
              <span className="text-terminal-green-dim">Real-time data connected</span>
            </div>
            <div className="flex items-center gap-2">
              {progress >= 90 ? (
                <span className="text-terminal-green font-bold">✓</span>
              ) : (
                <span className="text-cyber-blue animate-pulse">○</span>
              )}
              <span className="text-terminal-green-dim">3D environment rendering</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-terminal-green-dim text-sm font-mono">
            <span className="text-cyber-blue">&gt;</span> Welcome to Mission Control. Your mission: Learn about Aridsondez Jerome.
          </p>
        </div>
      </div>
    </div>
  );
}
