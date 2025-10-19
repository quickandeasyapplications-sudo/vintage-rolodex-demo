import { X } from 'lucide-react'

export default function TagFilter({ allTags, selectedTags, onTagToggle, onClearAll }) {
  if (allTags.length === 0) return null

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-mono font-bold text-dark-leather">FILTER BY TAG:</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-mono text-rich-brown hover:text-dark-leather transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono border-2 transition-all ${
                isSelected
                  ? 'bg-brass-gold border-brass-gold text-dark-leather font-bold shadow-md'
                  : 'bg-cream-paper border-dark-leather text-dark-leather hover:border-brass-gold hover:bg-brass-gold/10'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}

