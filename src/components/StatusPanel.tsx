import React from 'react';
import { Activity, Clock, Target, AlertTriangle, Heart, MessageCircle } from 'lucide-react';
import { BotStatus } from '../types';

interface StatusPanelProps {
  status: BotStatus;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  const getStatusColor = () => {
    if (status.isRunning) return 'text-success-600';
    if (status.errors > 0) return 'text-warning-600';
    return 'text-gray-600';
  };

  const getStatusBadge = () => {
    if (status.isRunning) return 'bg-success-100 text-success-800';
    if (status.errors > 0) return 'bg-warning-100 text-warning-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDuration = (startTime?: Date) => {
    if (!startTime) return '00:00:00';
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 ${getStatusColor()}`} />
          <h2 className="text-xl font-semibold">Bot Status</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge()}`}>
          {status.isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>

      <div className="space-y-4">
        {/* Current Step */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Current Step</span>
            {status.isRunning && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-success-600">Active</span>
              </div>
            )}
          </div>
          <p className="text-gray-900 font-medium">{status.currentStep}</p>
        </div>

        {/* Progress Bar */}
        {status.totalIterations > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">
                {status.completedIterations}/{status.totalIterations}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${status.progress}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500">{Math.round(status.progress)}%</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Heart className="w-4 h-4 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Likes</p>
              <p className="text-lg font-semibold text-gray-900">{status.likes}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MessageCircle className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Comments</p>
              <p className="text-lg font-semibold text-gray-900">{status.comments}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Errors</p>
              <p className="text-lg font-semibold text-gray-900">{status.errors}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Runtime</p>
              <p className="text-lg font-semibold text-gray-900 font-mono">
                {formatDuration(status.startTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};