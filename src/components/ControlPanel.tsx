import React from 'react';
import { Play, Square, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { BotConfig, BotStatus } from '../types';

interface ControlPanelProps {
  config: BotConfig;
  status: BotStatus;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  status,
  onStart,
  onStop,
  onReset
}) => {
  const validateConfig = () => {
    const errors = [];
    
    if (!config.geckoDriverPath.trim()) errors.push('Gecko driver path is required');
    if (!config.url.trim()) errors.push('BandLab URL is required');
    if (!config.username.trim()) errors.push('Username is required');
    if (!config.password.trim()) errors.push('Password is required');
    if (config.iterations < 1) errors.push('Iterations must be at least 1');
    if (!config.selectors.loginXpath.trim()) errors.push('Login XPath is required');
    
    return errors;
  };

  const configErrors = validateConfig();
  const isConfigValid = configErrors.length === 0;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Bot Controls</h2>

      {/* Configuration Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {isConfigValid ? (
            <>
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="text-success-700 font-medium">Configuration Valid</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-error-600" />
              <span className="text-error-700 font-medium">Configuration Issues</span>
            </>
          )}
        </div>
        
        {!isConfigValid && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-3">
            <p className="text-sm text-error-700 mb-2">Please fix the following issues:</p>
            <ul className="text-sm text-error-600 space-y-1">
              {configErrors.map((error, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-error-500 rounded-full"></span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="space-y-3">
        {!status.isRunning ? (
          <button
            onClick={onStart}
            disabled={!isConfigValid}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Bot
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-full btn-danger flex items-center justify-center gap-2"
          >
            <Square className="w-4 h-4" />
            Stop Bot
          </button>
        )}

        <button
          onClick={onReset}
          disabled={status.isRunning}
          className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Status
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Mode:</span>
            <span className="ml-2 font-medium capitalize">{config.mode}</span>
          </div>
          <div>
            <span className="text-gray-600">Iterations:</span>
            <span className="ml-2 font-medium">{config.iterations}</span>
          </div>
          <div>
            <span className="text-gray-600">Delay:</span>
            <span className="ml-2 font-medium">{config.delayBetweenActions}ms</span>
          </div>
          <div>
            <span className="text-gray-600">Popup:</span>
            <span className="ml-2 font-medium">{config.handlePopup ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};