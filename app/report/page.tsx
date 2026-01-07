'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import personalData from '@/lib/data/personal-data.json';

function ReportViewContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'experience' | 'projects' | 'skills' | 'contact'>(() => {
    if (tabParam === 'experience' || tabParam === 'projects' || tabParam === 'skills' || tabParam === 'contact') {
      return tabParam;
    }
    return 'experience';
  });

  useEffect(() => {
    if (tabParam === 'experience' || tabParam === 'projects' || tabParam === 'skills' || tabParam === 'contact') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen bg-console-bg">
      {/* Classified Header Banner */}
      <div className="bg-classified-red border-b-2 border-classified-red py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-deep-black font-bold text-sm tracking-widest">
            ■ CLASSIFIED ■ PERSONNEL FILE ■ CLEARANCE LEVEL: {personalData.personal.clearanceLevel} ■
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="bg-panel-bg border-b border-terminal-green-dark sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <h1 className="text-xl font-mono text-terminal-green tracking-wider">MISSION CONTROL // PERSONNEL DATABASE</h1>
              </div>
              <p className="text-terminal-green-dim text-xs font-mono ml-5">ACCESS GRANTED // SESSION ACTIVE</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/control-room"
                className="px-4 py-2 bg-panel-bg border border-cyber-blue text-cyber-blue rounded font-mono text-sm hover:bg-cyber-blue hover:text-deep-black transition-all duration-200 shadow-glow-blue"
              >
                [SWITCH TO CONTROL ROOM]
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Classification Banner */}
        <div className="bg-panel-bg border-2 border-terminal-green rounded-none p-6 mb-6 shadow-glow-green">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-classified-red font-mono text-xs font-bold tracking-widest">■ CLASSIFIED</span>
                <span className="text-terminal-green-dim font-mono text-xs">FILE NO: AJ-{personalData.personal.phone.replace(/-/g, '')}</span>
              </div>
              <h1 className="text-4xl font-orbitron text-terminal-green mb-2 tracking-wide">
                {personalData.personal.name.toUpperCase()}
              </h1>
              <p className="text-cyber-blue font-mono text-lg">{personalData.personal.specialization}</p>
            </div>
            <div className="text-right">
              <div className="bg-deep-black border border-terminal-green p-3 rounded">
                <p className="text-terminal-green font-mono text-xs mb-1">STATUS</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse shadow-glow-green"></div>
                  <span className="text-terminal-green font-bold text-sm">{personalData.personal.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-terminal-green-dark">
            <div>
              <p className="text-terminal-green-dim font-mono text-xs mb-1">GRADUATION</p>
              <p className="text-terminal-green font-mono">{personalData.personal.graduationDate}</p>
            </div>
            <div>
              <p className="text-terminal-green-dim font-mono text-xs mb-1">LOCATION</p>
              <p className="text-terminal-green font-mono">{personalData.personal.location}</p>
            </div>
            <div>
              <p className="text-terminal-green-dim font-mono text-xs mb-1">CLEARANCE</p>
              <p className="text-terminal-green font-mono">{personalData.personal.clearanceLevel}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-panel-bg border border-terminal-green-dark rounded-none p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-terminal-green"></div>
            <h2 className="text-xl font-orbitron text-terminal-green tracking-wide">PERSONNEL OVERVIEW</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-console-bg border border-panel-border p-4">
              <p className="text-terminal-green-dim font-mono text-xs mb-2">EXPERIENCE</p>
              <p className="text-terminal-green font-mono text-sm">{personalData.quickStats.experience}</p>
            </div>
            <div className="bg-console-bg border border-panel-border p-4">
              <p className="text-terminal-green-dim font-mono text-xs mb-2">SPECIALIZATION</p>
              <p className="text-terminal-green font-mono text-sm">{personalData.quickStats.specialization}</p>
            </div>
            <div className="bg-console-bg border border-panel-border p-4">
              <p className="text-terminal-green-dim font-mono text-xs mb-2">ACTIVE PROJECTS</p>
              <p className="text-terminal-green font-mono text-sm">{personalData.quickStats.activeProjects}</p>
            </div>
            <div className="bg-console-bg border border-panel-border p-4">
              <p className="text-terminal-green-dim font-mono text-xs mb-2">HACKATHONS</p>
              <p className="text-terminal-green font-mono text-sm">{personalData.quickStats.hackathons}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-panel-bg border border-terminal-green-dark rounded-none mb-6">
          <div className="border-b border-terminal-green-dark">
            <nav className="flex" aria-label="Tabs">
              {(['experience', 'projects', 'skills', 'contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-mono text-sm uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-deep-black text-terminal-green border-b-2 border-terminal-green'
                      : 'text-terminal-green-dim hover:text-terminal-green hover:bg-console-bg'
                  }`}
                >
                  [{tab}]
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'experience' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-cyber-blue"></div>
                  <h2 className="text-xl font-orbitron text-cyber-blue tracking-wide">EMPLOYMENT HISTORY</h2>
                </div>

                <div className="space-y-6">
                  {personalData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-console-bg border-l-4 border-terminal-green p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-mono text-terminal-green font-bold">
                              {exp.company.toUpperCase()}
                              {exp.companyType && ` // ${exp.companyType}`}
                            </h3>
                            <span className="px-2 py-1 bg-panel-bg border border-terminal-green-dark text-terminal-green-dim font-mono text-xs">
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-cyber-blue font-mono text-sm mb-1">{exp.role}</p>
                          <p className="text-terminal-green-dim font-mono text-xs">
                            {exp.period} {'// '} {exp.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-terminal-green-dim font-mono text-xs mb-1">CLEARANCE</p>
                          <p className="text-terminal-green font-mono text-xs">{exp.clearance}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-terminal-green font-mono text-sm mb-3 border-l-2 border-cyber-blue pl-3">
                          {exp.summary}
                        </p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-terminal-green-dim font-mono text-xs uppercase tracking-wider mb-2">
                          ▸ Mission Reports:
                        </p>
                        {exp.achievements.slice(0, 4).map((achievement, i) => (
                          <div key={i} className="flex gap-2 text-terminal-green font-mono text-xs">
                            <span className="text-cyber-blue">■</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>

                      {exp.metrics && (
                        <div className="bg-panel-bg border border-panel-border p-4 mb-4">
                          <p className="text-terminal-green-dim font-mono text-xs uppercase tracking-wider mb-3">
                            ▸ Performance Metrics:
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(exp.metrics).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-terminal-green-dim font-mono text-xs mb-1">
                                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </p>
                                <p className="text-cyber-blue font-mono text-sm font-bold">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">TECH STACK:</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-deep-black border border-terminal-green-dark text-terminal-green font-mono text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-cyber-blue"></div>
                  <h2 className="text-xl font-orbitron text-cyber-blue tracking-wide">MISSION FILES</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {personalData.projects.map((project) => (
                    <div key={project.id} className="bg-console-bg border-l-4 border-cyber-blue p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-mono text-terminal-green font-bold">
                              {project.name.toUpperCase()}
                            </h3>
                            <span className={`px-2 py-1 font-mono text-xs font-bold ${
                              project.status === 'ACTIVE' ? 'bg-terminal-green text-deep-black' :
                              project.status === 'LIVE' ? 'bg-cyber-blue text-deep-black' :
                              project.status === 'COMPLETED' ? 'bg-panel-bg border border-terminal-green-dim text-terminal-green-dim' :
                              'bg-warning-amber text-deep-black'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-cyber-blue font-mono text-sm mb-1">{project.subtitle}</p>
                          <p className="text-terminal-green-dim font-mono text-xs">{project.period}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-terminal-green-dim font-mono text-xs mb-1">CLASSIFICATION</p>
                          <p className="text-terminal-green font-mono text-xs">{project.classification}</p>
                        </div>
                      </div>

                      <p className="text-terminal-green font-mono text-sm mb-4 border-l-2 border-cyber-blue pl-3">
                        {project.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <p className="text-terminal-green-dim font-mono text-xs uppercase tracking-wider mb-2">
                          ▸ Key Features:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.features.map((feature, i) => (
                            <div key={i} className="flex gap-2 text-terminal-green font-mono text-xs">
                              <span className="text-cyber-blue">■</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.metrics && (
                        <div className="bg-panel-bg border border-panel-border p-4 mb-4">
                          <p className="text-terminal-green-dim font-mono text-xs uppercase tracking-wider mb-3">
                            ▸ Performance Data:
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-terminal-green-dim font-mono text-xs mb-1">
                                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </p>
                                <p className="text-cyber-blue font-mono text-sm font-bold">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">TECH STACK:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-deep-black border border-terminal-green-dark text-terminal-green font-mono text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-panel-bg border border-cyber-blue text-cyber-blue font-mono text-xs hover:bg-cyber-blue hover:text-deep-black transition-all"
                        >
                          [VIEW SOURCE CODE]
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-cyber-blue"></div>
                  <h2 className="text-xl font-orbitron text-cyber-blue tracking-wide">TECHNICAL CAPABILITIES</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-console-bg border border-terminal-green-dark p-6">
                    <h3 className="text-terminal-green font-mono text-sm font-bold mb-4 uppercase tracking-wider">
                      ▸ Programming Languages
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">EXPERT LEVEL</p>
                        <div className="flex flex-wrap gap-2">
                          {personalData.skills.languages.expert.map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-terminal-green text-deep-black font-mono text-xs font-bold">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">PROFICIENT</p>
                        <div className="flex flex-wrap gap-2">
                          {personalData.skills.languages.proficient.map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-panel-bg border border-terminal-green text-terminal-green font-mono text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">FAMILIAR</p>
                        <div className="flex flex-wrap gap-2">
                          {personalData.skills.languages.familiar.map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-console-bg border border-terminal-green-dark text-terminal-green-dim font-mono text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-console-bg border border-terminal-green-dark p-6">
                    <h3 className="text-terminal-green font-mono text-sm font-bold mb-4 uppercase tracking-wider">
                      ▸ Backend & Systems
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">FRAMEWORKS</p>
                        <div className="flex flex-wrap gap-2">
                          {personalData.skills.backend.frameworks.map((fw) => (
                            <span key={fw} className="px-3 py-1 bg-panel-bg border border-cyber-blue text-cyber-blue font-mono text-xs">
                              {fw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-2">DATABASES</p>
                        <div className="flex flex-wrap gap-2">
                          {personalData.skills.backend.databases.map((db) => (
                            <span key={db} className="px-3 py-1 bg-panel-bg border border-cyber-blue text-cyber-blue font-mono text-xs">
                              {db}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-console-bg border border-terminal-green-dark p-6">
                    <h3 className="text-terminal-green font-mono text-sm font-bold mb-4 uppercase tracking-wider">
                      ▸ Cloud & Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[...personalData.skills.cloud.aws.map(t => `AWS ${t}`), ...personalData.skills.cloud.tools, ...personalData.skills.cloud.monitoring].map((tool) => (
                        <span key={tool} className="px-3 py-1 bg-panel-bg border border-terminal-green text-terminal-green font-mono text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-cyber-blue"></div>
                  <h2 className="text-xl font-orbitron text-cyber-blue tracking-wide">CONTACT PROTOCOLS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-console-bg border border-terminal-green-dark p-6">
                    <h3 className="text-terminal-green font-mono text-sm font-bold mb-4 uppercase tracking-wider">
                      ▸ Direct Communications
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-1">EMAIL</p>
                        <a href={`mailto:${personalData.contact.email}`} className="text-cyber-blue font-mono text-sm hover:underline">
                          {personalData.contact.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-1">PHONE</p>
                        <a href={`tel:${personalData.contact.phone}`} className="text-cyber-blue font-mono text-sm hover:underline">
                          {personalData.contact.phone}
                        </a>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-1">LOCATION</p>
                        <p className="text-terminal-green font-mono text-sm">{personalData.contact.location}</p>
                      </div>
                      <div>
                        <p className="text-terminal-green-dim font-mono text-xs mb-1">AVAILABILITY</p>
                        <p className="text-terminal-green font-mono text-sm">{personalData.contact.availability}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-console-bg border border-terminal-green-dark p-6">
                    <h3 className="text-terminal-green font-mono text-sm font-bold mb-4 uppercase tracking-wider">
                      ▸ Network Links
                    </h3>
                    <div className="space-y-3">
                      <a
                        href={personalData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 bg-panel-bg border border-terminal-green text-terminal-green font-mono text-sm hover:bg-terminal-green hover:text-deep-black transition-all"
                      >
                        [GITHUB] → {personalData.contact.github.replace('https://', '')}
                      </a>
                      <a
                        href={personalData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 bg-panel-bg border border-cyber-blue text-cyber-blue font-mono text-sm hover:bg-cyber-blue hover:text-deep-black transition-all"
                      >
                        [LINKEDIN] → {personalData.contact.linkedin.replace('https://', '')}
                      </a>
                      <a
                        href="/assets/AJ_Backend_SWE%20copy.pdf"
                        download
                        className="block w-full px-4 py-3 bg-panel-bg border border-warning-amber text-warning-amber font-mono text-sm hover:bg-warning-amber hover:text-deep-black transition-all text-center"
                      >
                        [DOWNLOAD RESUME]
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/control-room"
            className="px-6 py-3 bg-panel-bg border-2 border-cyber-blue text-cyber-blue font-mono hover:bg-cyber-blue hover:text-deep-black transition-all shadow-glow-blue"
          >
            [SWITCH TO CONTROL ROOM MODE]
          </Link>
        </div>
      </main>

      {/* Footer Classification */}
      <div className="bg-classified-red border-t-2 border-classified-red py-1 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-deep-black font-bold text-sm tracking-widest">
            ■ CLASSIFIED ■ END OF FILE ■ {personalData.personal.clearanceLevel} ■
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReportView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-console-bg" />}>
      <ReportViewContent />
    </Suspense>
  );
}
