// QuickActionsToolbar.jsx - Quick formatting and action toolbar for blog editor
import React, { memo, useCallback } from 'react';
import { Icon } from '@iconify/react';

const QuickActionsToolbar = memo(function QuickActionsToolbar({
  mode,
  onSave,
  onPreview,
  onAutoSave,
  lastSaved,
  seoScore,
  getScoreColor,
  getScoreBgColor,
  getScoreIcon,
  isEditing,
  formData
}) {
  const handleFormatAction = useCallback((action) => {
    // This would integrate with the rich text editor
    // For now, we'll just show a toast
    console.log('Format action:', action);
  }, []);

  const quickFormatActions = [
    { id: 'bold', icon: 'heroicons:bold', label: 'Bold (Ctrl+B)' },
    { id: 'italic', icon: 'heroicons:italic', label: 'Italic (Ctrl+I)' },
    { id: 'link', icon: 'heroicons:link', label: 'Add Link (Ctrl+K)' },
    { id: 'heading', icon: 'heroicons:document-text', label: 'Heading' },
    { id: 'list', icon: 'heroicons:list-bullet', label: 'Bullet List' },
    { id: 'quote', icon: 'heroicons:chat-bubble-left-right', label: 'Quote' },
  ];

  return (
    <div className={`sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4`}>
      <div className="flex items-center justify-between">
        {/* Left side - Quick format actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {quickFormatActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleFormatAction(action.id)}
                className={`p-2 rounded-lg transition-colors ${
                  mode === 'dark'
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                title={action.label}
              >
                <Icon icon={action.icon} className="w-4 h-4" />
              </button>
            ))}
          </div>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
          
          {/* Word count and reading time */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Words: {formData.article_body?.split(/\s+/).filter(Boolean).length || 0}</span>
            <span>Reading time: {Math.ceil((formData.article_body?.split(/\s+/).filter(Boolean).length || 0) / 200)} min</span>
          </div>
        </div>

        {/* Right side - Actions and status */}
        <div className="flex items-center gap-3">
          {/* Auto-save status */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAutoSave}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                mode === 'dark'
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title="Save draft (Ctrl+S)"
            >
              <Icon icon="heroicons:document-arrow-down" className="w-4 h-4" />
              Save Draft
            </button>
            
            {lastSaved && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* SEO Score */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getScoreBgColor(seoScore, mode)}`}>
            <span className={`text-sm font-medium ${getScoreColor(seoScore, mode)}`}>
              SEO: {seoScore}%
            </span>
            <Icon
              icon={getScoreIcon(seoScore)}
              className={`w-4 h-4 ${getScoreColor(seoScore, mode)}`}
            />
          </div>

          {/* Preview button */}
          {isEditing && formData.slug && (
            <button
              type="button"
              onClick={onPreview}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                mode === 'dark'
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title="Preview (Ctrl+P)"
            >
              <Icon icon="heroicons:eye" className="w-4 h-4" />
              Preview
            </button>
          )}

          {/* Keyboard shortcuts hint */}
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Shortcuts:</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Enter</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );
});

QuickActionsToolbar.displayName = 'QuickActionsToolbar';

export default QuickActionsToolbar;
