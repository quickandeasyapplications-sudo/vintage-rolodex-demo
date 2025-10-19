import { useState } from 'react'
import { ClassicTemplate, CompactTemplate, BusinessTemplate, MinimalTemplate } from './ContactCardTemplates'

export default function ContactCard({ contact, onEdit, onDelete, onToggleFavorite }) {
  const [selectedTemplate, setSelectedTemplate] = useState('classic')

  const templates = {
    classic: ClassicTemplate,
    compact: CompactTemplate,
    business: BusinessTemplate,
    minimal: MinimalTemplate
  }

  const TemplateComponent = templates[selectedTemplate]

  return (
    <div>
      {/* Template Selector */}
      <div className="template-selector mb-4">
        <button
          onClick={() => setSelectedTemplate('classic')}
          className={`template-option ${selectedTemplate === 'classic' ? 'active' : ''}`}
        >
          Classic
        </button>
        <button
          onClick={() => setSelectedTemplate('compact')}
          className={`template-option ${selectedTemplate === 'compact' ? 'active' : ''}`}
        >
          Compact
        </button>
        <button
          onClick={() => setSelectedTemplate('business')}
          className={`template-option ${selectedTemplate === 'business' ? 'active' : ''}`}
        >
          Business
        </button>
        <button
          onClick={() => setSelectedTemplate('minimal')}
          className={`template-option ${selectedTemplate === 'minimal' ? 'active' : ''}`}
        >
          Minimal
        </button>
      </div>

      {/* Render Selected Template */}
      <TemplateComponent
        contact={contact}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  )
}

