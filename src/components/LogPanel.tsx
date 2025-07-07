import React from 'react';
import { ScrollText, Download, Trash2, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { LogEntry } from '../types';

interface LogPanelProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const LogPanel: React.FC<LogPanelProps> = ({ logs, onClear }) => {
  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-error-600" />;
      default:
        return <Info className="w-4 h-4 text-primary-600" />;
    }
  };

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'border-l-success-500 bg-success-50';
      case 'warning':
        return 'border-l-warning-500 bg-warning-50';
      case 'error':
        return 'border-l-error-500 bg-error-50';
      default:
        return 'border-l-primary-500 bg-primary-50';
    }
  };

  const exportLogs = () => {
    const logText = logs
      .map(log => `[${log.timestamp.toISOString()}] ${log.level.toUpperCase()}: ${log.message}${log.details ? ` - ${log.details}` : ''}`)
      .join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bandlab-bot-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold">Activity Logs</h2>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {logs.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportLogs}
            disabled={logs.length === 0}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
          <button
            onClick={onClear}
            disabled={logs.length === 0}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ScrollText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No logs yet. Start the bot to see activity.</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`border-l-4 p-3 rounded-r-lg ${getLogColor(log.level)}`}
            >
              <div className="flex items-start gap-2">
                {getLogIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{log.message}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {log.details && (
                    <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};