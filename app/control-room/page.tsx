'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import personalData from '@/lib/data/personal-data.json';
import ExperienceTimeline from '@/components/control-room/ExperienceTimeline';

// Dynamically import the 3D scene to avoid SSR issues
const ControlRoomScene = dynamic(
  () => import('@/components/control-room/ControlRoomScene'),
  { ssr: false }
);

type MonitorType = 'experience' | 'projects' | 'systems' | 'contact' | 'logs' | 'about' | null;

function ProjectsLab() {
  const [activeTool, setActiveTool] = useState<'cortex' | 'sqs'>('cortex');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [queueMessage, setQueueMessage] = useState('');
  const [queue, setQueue] = useState<string[]>([
    'sensor-payload: pump-telemetry',
    'job: nightly-solar-summary'
  ]);
  const [lastAction, setLastAction] = useState<'enqueue' | 'dequeue' | null>(null);

  const runCortexSearch = () => {
    setIsSearching(true);
    setSearchResults([]);
    window.setTimeout(() => {
      setSearchResults([
        `Top hit: "Telemetry Pipelines" • score 0.92`,
        `Match: "NSBE Mobile App Roadmap" • score 0.87`,
        `Match: "SQS-Lite Architecture Notes" • score 0.83`,
        `Match: "Solar Year in Review" • score 0.79`
      ]);
      setIsSearching(false);
    }, 900);
  };

  const enqueueMessage = () => {
    if (!queueMessage.trim()) return;
    setQueue((prev) => [...prev, queueMessage.trim()]);
    setQueueMessage('');
    setLastAction('enqueue');
  };

  const dequeueMessage = () => {
    setQueue((prev) => prev.slice(1));
    setLastAction('dequeue');
  };

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-terminal-green-dark pb-4">
        <h3 className="text-xl font-orbitron text-terminal-green uppercase tracking-wider">
          Try a Tool
        </h3>
        <p className="text-xs font-mono text-terminal-green-dim mt-2">
          Interactive demos are live — full implementations coming soon.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setActiveTool('cortex')}
          className={`px-4 py-2 border-2 font-mono text-xs uppercase tracking-wider transition-all ${
            activeTool === 'cortex'
              ? 'border-cyber-blue text-cyber-blue shadow-glow-blue'
              : 'border-terminal-green-dark text-terminal-green-dim hover:text-terminal-green'
          }`}
        >
          CortexSearch
        </button>
        <button
          onClick={() => setActiveTool('sqs')}
          className={`px-4 py-2 border-2 font-mono text-xs uppercase tracking-wider transition-all ${
            activeTool === 'sqs'
              ? 'border-cyber-blue text-cyber-blue shadow-glow-blue'
              : 'border-terminal-green-dark text-terminal-green-dim hover:text-terminal-green'
          }`}
        >
          SQS-Lite
        </button>
      </div>

      {activeTool === 'cortex' ? (
        <div className="bg-console-bg border-2 border-terminal-green-dark p-5">
          <p className="text-terminal-green-dim font-mono text-xs mb-3">
            Semantic file search — try a query like &quot;solar insights&quot; or &quot;queue latency&quot;.
          </p>
          <div className="flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across mission files..."
              className="flex-1 bg-deep-black border border-terminal-green-dark px-3 py-2 text-xs font-mono text-terminal-green"
            />
            <button
              onClick={runCortexSearch}
              className="px-4 py-2 bg-terminal-green text-deep-black font-mono text-xs uppercase tracking-wider hover:bg-terminal-green-dim"
            >
              Scan
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {isSearching && (
              <p className="text-cyber-blue font-mono text-xs animate-pulse">
                ▸ Indexing... semantic vectors aligned.
              </p>
            )}
            {!isSearching && searchResults.length === 0 && (
              <p className="text-terminal-green-dim font-mono text-xs">
                ▸ Awaiting query. Neural index standing by.
              </p>
            )}
            {searchResults.map((result, index) => (
              <p
                key={result}
                className="text-terminal-green font-mono text-xs"
                style={{ animation: `fadeIn 0.3s ease-in ${index * 0.1}s both` }}
              >
                <span className="text-cyber-blue">▸</span> {result}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-console-bg border-2 border-terminal-green-dark p-5">
          <p className="text-terminal-green-dim font-mono text-xs mb-3">
            Queue simulator — enqueue a message, then dequeue to see delivery.
          </p>
          <div className="flex gap-3 mb-4">
            <input
              value={queueMessage}
              onChange={(e) => setQueueMessage(e.target.value)}
              placeholder="message payload..."
              className="flex-1 bg-deep-black border border-terminal-green-dark px-3 py-2 text-xs font-mono text-terminal-green"
            />
            <button
              onClick={enqueueMessage}
              className="px-4 py-2 bg-terminal-green text-deep-black font-mono text-xs uppercase tracking-wider hover:bg-terminal-green-dim"
            >
              Enqueue
            </button>
            <button
              onClick={dequeueMessage}
              className="px-4 py-2 border-2 border-cyber-blue text-cyber-blue font-mono text-xs uppercase tracking-wider hover:bg-cyber-blue hover:text-deep-black"
            >
              Dequeue
            </button>
          </div>
          <div className="space-y-2">
            {queue.length === 0 ? (
              <p className="text-terminal-green-dim font-mono text-xs">
                ▸ Queue empty. Awaiting payloads.
              </p>
            ) : (
              queue.map((item, index) => (
                <p
                  key={`${item}-${index}`}
                  className={`text-terminal-green font-mono text-xs ${
                    index === 0 && lastAction === 'dequeue' ? 'animate-pulse' : ''
                  }`}
                >
                  <span className="text-cyber-blue">▸</span> {item}
                </p>
              ))
            )}
            {lastAction === 'enqueue' && (
              <p className="text-cyber-blue font-mono text-[10px]">
                ▸ Delivery guarantees armed: at-least-once.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AboutTerminal() {
  const lines = useMemo(
    () => [
      `Name: ${personalData.personal.name}`,
      `Role: ${personalData.personal.title} (${personalData.personal.specialization})`,
      `Based in: ${personalData.personal.location}`,
      `Email: ${personalData.personal.email}`,
      `LinkedIn: ${personalData.personal.linkedin}`,
      'Fun Facts:',
      '• One Piece fan',
      '• Climbed a mountain',
      '• Loves YouTube deep dives',
      '• Always experimenting with new tools'
    ],
    []
  );
  const fullText = useMemo(() => lines.join('\n'), [lines]);
  const [typedText, setTypedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let active = true;
    let cursor = 0;
    let timeoutId: number;

    const typeNext = () => {
      if (!active) return;
      if (cursor >= fullText.length) {
        setIsComplete(true);
        return;
      }

      const nextChar = fullText.charAt(cursor);
      setTypedText(fullText.slice(0, cursor + 1));
      cursor += 1;
      timeoutId = window.setTimeout(typeNext, nextChar === '\n' ? 220 : 22);
    };

    setTypedText('');
    setIsComplete(false);
    timeoutId = window.setTimeout(typeNext, 200);
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <div className="bg-console-bg border-2 border-terminal-green-dark p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
        <p className="text-terminal-green-dim font-mono text-xs uppercase tracking-widest">
          About Me // Transmission Live
        </p>
      </div>
      <div className="space-y-2">
        {typedText.split('\n').map((line, index) => (
          <p key={index} className="text-terminal-green font-mono text-xs">
            <span className="text-cyber-blue">&gt;</span> {line}
          </p>
        ))}
        {!isComplete && (
          <p className="text-terminal-green font-mono text-xs animate-pulse">
            <span className="text-cyber-blue">&gt;</span> █
          </p>
        )}
      </div>
    </div>
  );
}

export default function ControlRoom() {
  const [activeMonitor, setActiveMonitor] = useState<MonitorType>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const handleModelLoaded = () => {
    setIsLoaded(true);
  };

  const handleMonitorClick = (type: string) => {
    setActiveMonitor(type as MonitorType);
  };

  return (
    <div className="h-screen bg-deep-black relative overflow-hidden flex flex-col">
      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-deep-black flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 border-4 border-terminal-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-terminal-green font-mono text-lg uppercase tracking-widest">
              Loading 3D Environment...
            </p>
            <p className="text-terminal-green-dim font-mono text-xs mt-2">
              Initializing control systems
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b-2 border-terminal-green-dark bg-panel-bg/95 backdrop-blur flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse shadow-glow-green"></div>
                <h1 className="text-xl font-orbitron text-terminal-green tracking-wider">MISSION CONTROL</h1>
              </div>
              <p className="text-terminal-green-dim text-xs font-mono ml-5 uppercase tracking-widest">
                Personnel: {personalData.personal.name} {'// '} Status: {personalData.personal.status}
              </p>
            </div>
            <Link
              href="/report"
              className="px-4 py-2 bg-panel-bg border-2 border-cyber-blue text-cyber-blue rounded-none hover:bg-cyber-blue hover:text-deep-black transition-all duration-200 text-sm font-mono uppercase tracking-wider shadow-glow-blue"
            >
              [Classified Report]
            </Link>
          </div>
        </div>
      </header>

      {/* 3D Control Room Scene - Fullscreen */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <ControlRoomScene
          onModelLoaded={handleModelLoaded}
          onMonitorClick={handleMonitorClick}
        />
      </main>

      {/* Modal for Monitor Details */}
      {activeMonitor && (
        <div
          className="fixed inset-0 bg-deep-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveMonitor(null)}
        >
          <div
            className="bg-panel-bg border-2 border-terminal-green rounded-none max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-glow-green"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6 border-b-2 border-terminal-green-dark pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                    <span className="text-terminal-green-dim font-mono text-xs uppercase tracking-wider">Access Granted</span>
                  </div>
                  <h2 className="text-2xl font-orbitron text-terminal-green uppercase tracking-wide">
                    {activeMonitor} Details
                  </h2>
                </div>
                <button
                  onClick={() => setActiveMonitor(null)}
                  className="text-terminal-green-dim hover:text-terminal-green transition-colors font-mono text-2xl"
                >
                  [X]
                </button>
              </div>
              {activeMonitor === 'experience' && (
                <ExperienceTimeline />
              )}
              {activeMonitor === 'projects' && (
                <ProjectsLab />
              )}
              {activeMonitor === 'about' && (
                <AboutTerminal />
              )}
              {activeMonitor !== 'experience' && activeMonitor !== 'projects' && activeMonitor !== 'about' && (
                <div className="text-terminal-green-dim font-mono">
                  <p className="mb-4">Detailed information for {activeMonitor} will be implemented here.</p>
                  <p className="text-cyber-blue">This is a placeholder for the modal content.</p>
                  <p className="mt-4 text-terminal-green-dark text-xs">
                    &gt; System Message: Full implementation coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-panel-bg/95 backdrop-blur border-t-2 border-terminal-green-dark py-2 px-4 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono text-terminal-green-dim">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse"></div>
            <span className="uppercase tracking-wider">System Status: <span className="text-terminal-green">Operational</span></span>
          </div>
          <div className="flex gap-6 uppercase tracking-wider">
            <span>Uptime: 99.95%</span>
            <span>Active Sessions: 1</span>
            <span className="text-terminal-green">All Systems Nominal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
