import React, { useState } from 'react';
import { Bot, Github, ExternalLink } from 'lucide-react';
import { ConfigPanel } from './components/ConfigPanel';
import { StatusPanel } from './components/StatusPanel';
import { LogPanel } from './components/LogPanel';
import { ControlPanel } from './components/ControlPanel';
import { useBotStatus } from './hooks/useBotStatus';
import { BotConfig, DEFAULT_CONFIG } from './types';

function App() {
  const [config, setConfig] = useState<BotConfig>(DEFAULT_CONFIG);
  const { status, logs, startBot, stopBot, resetStatus, clearLogs } = useBotStatus();

  const handleStart = () => {
    startBot(config.iterations);
  };

  const handleStop = () => {
    stopBot();
  };

  const handleReset = () => {
    resetStatus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Bot className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BandLab Automation Tool</h1>
                <p className="text-sm text-gray-600">Selenium-powered social media bot</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-8">
            <ConfigPanel
              config={config}
              onChange={setConfig}
              isRunning={status.isRunning}
            />
            
            <LogPanel
              logs={logs}
              onClear={clearLogs}
            />
          </div>

          {/* Right Column - Status & Controls */}
          <div className="space-y-8">
            <ControlPanel
              config={config}
              status={status}
              onStart={handleStart}
              onStop={handleStop}
              onReset={handleReset}
            />
            
            <StatusPanel status={status} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Selenium WebDriver</span>
              <span>•</span>
              <span>Firefox Gecko Driver</span>
              <span>•</span>
              <span>BandLab API</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;