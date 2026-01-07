'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TimelineEvent {
  year: string;
  title: string;
  location: string;
  description: string[];
  icon: string;
}

const careerTimeline: TimelineEvent[] = [
  {
    year: "2022",
    title: "Started at UCF",
    location: "University of Central Florida",
    description: [
      "Began Computer Science journey",
      "Joined National Society of Black Engineers",
      "Started building foundational skills"
    ],
    icon: "🎓"
  },
  {
    year: "2023",
    title: "NSBE Mobile App Developer",
    location: "NSBE UCF Chapter",
    description: [
      "Built mobile app for chapter members",
      "Implemented event management system",
      "Gained React Native experience"
    ],
    icon: "📱"
  },
  {
    year: "2023",
    title: "Computer Science Tutor",
    location: "University of Central Florida",
    description: [
      "Tutored students in Data Structures & Algorithms",
      "Helped peers master programming concepts",
      "Strengthened teaching & communication skills"
    ],
    icon: "👨‍🏫"
  },
  {
    year: "2024",
    title: "Data Engineer / Software Engineer",
    location: "Jacobs",
    description: [
      "Built real-time telemetry dashboard (React + Flask)",
      "Engineered C++ data pipeline processing 50K+ readings/hour",
      "Reduced diagnostic time by 67% (45min → 15min)",
      "Worked on solar-powered water filtration systems"
    ],
    icon: "💧"
  },
  {
    year: "2025",
    title: "Software Engineer Intern",
    location: "NextEra Energy x Everbright",
    description: [
      "Shipped 'Solar Year in Review' to 30,000+ users",
      "React Native + Django + PostgreSQL + AWS SQS",
      "Improved load times 75%: 8.5s → 2.1s",
      "Achieved 99.9% uptime & 45% engagement increase"
    ],
    icon: "☀️"
  },
  {
    year: "2025",
    title: "Co-Founder & Backend Engineer",
    location: "Luro (YC-track Startup)",
    description: [
      "Building AI-powered Twitch assistant",
      "10,000+ concurrent users | 5s latency",
      "FastAPI + Node.js + PostgreSQL + pgvector",
      "95% retrieval accuracy"
    ],
    icon: "🚀"
  },
  {
    year: "2026",
    title: "Career in Progress...",
    location: "What's Next?",
    description: [
      "Graduating May 2026",
      "Seeking full-time opportunities",
      "Building the future, one line at a time"
    ],
    icon: "✨"
  }
];

export default function ExperienceTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < careerTimeline.length - 1) {
          return prev + 1;
        } else {
          setIsAnimating(false);
          return prev;
        }
      });
    }, 3000); // Change event every 3 seconds

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleEventClick = (index: number) => {
    setIsAnimating(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-full bg-console-bg p-6 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-terminal-green-dark pb-4 mb-6">
        <h2 className="text-2xl font-orbitron text-terminal-green uppercase tracking-wider">
          Career Timeline
        </h2>
        <p className="text-sm font-mono text-terminal-green-dim mt-2">
          Journey from Student to Engineer
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
        {careerTimeline.map((event, index) => (
          <div
            key={index}
            onClick={() => handleEventClick(index)}
            className="flex flex-col items-center cursor-pointer group min-w-[80px]"
          >
            {/* Icon */}
            <div
              className={`text-3xl mb-2 transition-all duration-300 ${
                index <= currentIndex
                  ? 'scale-110 opacity-100'
                  : 'scale-90 opacity-40'
              } ${
                index === currentIndex
                  ? 'animate-bounce'
                  : ''
              }`}
            >
              {event.icon}
            </div>

            {/* Year */}
            <div
              className={`text-xs font-mono transition-colors ${
                index <= currentIndex
                  ? 'text-terminal-green'
                  : 'text-terminal-green-dark'
              }`}
            >
              {event.year}
            </div>

            {/* Progress Line */}
            {index < careerTimeline.length - 1 && (
              <div className="h-1 w-12 mt-2 bg-panel-border relative">
                <div
                  className={`h-full bg-terminal-green transition-all duration-1000 ${
                    index < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Event Details */}
      <div className="bg-panel-bg border-2 border-terminal-green-dark p-6 rounded-none">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">{careerTimeline[currentIndex].icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-cyber-blue bg-cyber-blue/10 px-2 py-1 border border-cyber-blue">
                {careerTimeline[currentIndex].year}
              </span>
              {currentIndex === careerTimeline.length - 1 && (
                <span className="text-xs font-mono text-warning-amber animate-pulse">
                  IN PROGRESS
                </span>
              )}
            </div>
            <h3 className="text-xl font-orbitron text-terminal-green mb-1">
              {careerTimeline[currentIndex].title}
            </h3>
            <p className="text-sm font-mono text-cyber-blue">
              {careerTimeline[currentIndex].location}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mt-4">
          {careerTimeline[currentIndex].description.map((line, idx) => (
            <p
              key={idx}
              className="font-mono text-sm text-terminal-green-dim leading-relaxed pl-4 border-l-2 border-terminal-green-dark"
              style={{
                animation: `fadeIn 0.5s ease-in ${idx * 0.1}s both`
              }}
            >
              <span className="text-cyber-blue mr-2">▸</span>
              {line}
            </p>
          ))}
        </div>

        {/* Add to Career CTA - only show on last item */}
        {currentIndex === careerTimeline.length - 1 && (
          <div className="mt-6 pt-6 border-t-2 border-terminal-green-dark">
            <p className="font-mono text-sm text-terminal-green mb-3">
              Want to add the next chapter to this timeline?
            </p>
            <Link
              href="/report?tab=contact"
              className="inline-block bg-terminal-green text-deep-black font-mono text-sm px-6 py-2 hover:bg-terminal-green-dim transition-colors uppercase tracking-wider"
            >
              Let&apos;s Connect →
            </Link>
          </div>
        )}
      </div>

      {/* Auto-play control */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-xs font-mono text-terminal-green-dim hover:text-terminal-green transition-colors border border-terminal-green-dark px-4 py-2"
        >
          {isAnimating ? '⏸ Pause' : '▶ Play'} Timeline
        </button>
      </div>
    </div>
  );
}
