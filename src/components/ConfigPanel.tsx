import React from 'react';
import { Settings, Globe, User, Cog, Target } from 'lucide-react';
import { BotConfig } from '../types';

interface ConfigPanelProps {
  config: BotConfig;
  onChange: (config: BotConfig) => void;
  isRunning: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, isRunning }) => {
  const updateConfig = (updates: Partial<BotConfig>) => {
    onChange({ ...config, ...updates });
  };

  const updateSelectors = (updates: Partial<BotConfig['selectors']>) => {
    onChange({
      ...config,
      selectors: { ...config.selectors, ...updates }
    });
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold">Bot Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* Driver & URLs */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Driver & URLs</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="label">Gecko Driver Path</label>
              <input
                type="text"
                className="input-field"
                value={config.geckoDriverPath}
                onChange={(e) => updateConfig({ geckoDriverPath: e.target.value })}
                disabled={isRunning}
                placeholder="/path/to/geckodriver"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">BandLab URL</label>
                <input
                  type="url"
                  className="input-field"
                  value={config.url}
                  onChange={(e) => updateConfig({ url: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Login URL</label>
                <input
                  type="url"
                  className="input-field"
                  value={config.loginUrl}
                  onChange={(e) => updateConfig({ loginUrl: e.target.value })}
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Login Credentials */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Login Credentials</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                className="input-field"
                value={config.username}
                onChange={(e) => updateConfig({ username: e.target.value })}
                disabled={isRunning}
                placeholder="Your BandLab username"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                value={config.password}
                onChange={(e) => updateConfig({ password: e.target.value })}
                disabled={isRunning}
                placeholder="Your BandLab password"
              />
            </div>
          </div>
        </div>

        {/* Bot Behavior */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Bot Behavior</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Mode</label>
              <select
                className="input-field"
                value={config.mode}
                onChange={(e) => updateConfig({ mode: e.target.value as 'like' | 'comment' })}
                disabled={isRunning}
              >
                <option value="like">Like Posts</option>
                <option value="comment">Comment on Posts</option>
              </select>
            </div>
            <div>
              <label className="label">Iterations</label>
              <input
                type="number"
                className="input-field"
                value={config.iterations}
                onChange={(e) => updateConfig({ iterations: parseInt(e.target.value) || 0 })}
                disabled={isRunning}
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="label">Scroll Distance (px)</label>
              <input
                type="number"
                className="input-field"
                value={config.scrollDistance}
                onChange={(e) => updateConfig({ scrollDistance: parseInt(e.target.value) || 0 })}
                disabled={isRunning}
                min="100"
                max="2000"
                step="50"
              />
            </div>
            <div>
              <label className="label">Delay Between Actions (ms)</label>
              <input
                type="number"
                className="input-field"
                value={config.delayBetweenActions}
                onChange={(e) => updateConfig({ delayBetweenActions: parseInt(e.target.value) || 0 })}
                disabled={isRunning}
                min="500"
                max="5000"
                step="100"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.handlePopup}
                onChange={(e) => updateConfig({ handlePopup: e.target.checked })}
                disabled={isRunning}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Handle privacy popup automatically</span>
            </label>
          </div>
        </div>

        {/* Element Selectors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cog className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Element Selectors</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Login Button XPath</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.loginXpath}
                  onChange={(e) => updateSelectors({ loginXpath: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Username Field XPath</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.usernameXpath}
                  onChange={(e) => updateSelectors({ usernameXpath: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Password Field XPath</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.passwordXpath}
                  onChange={(e) => updateSelectors({ passwordXpath: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Login Submit XPath</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.loginBtnXpath}
                  onChange={(e) => updateSelectors({ loginBtnXpath: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Popup Button XPath</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.popupBtnXpath}
                  onChange={(e) => updateSelectors({ popupBtnXpath: e.target.value })}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="label">Like Button CSS</label>
                <input
                  type="text"
                  className="input-field text-xs"
                  value={config.selectors.likeBtnCss}
                  onChange={(e) => updateSelectors({ likeBtnCss: e.target.value })}
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};