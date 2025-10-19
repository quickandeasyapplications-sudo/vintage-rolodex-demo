import { Star, Phone, Mail, MessageCircle, Edit, Trash2, MapPin, Briefcase, Calendar, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

// Template 1: Classic (Original Design)
export function ClassicTemplate({ contact, onEdit, onDelete, onToggleFavorite }) {
  const getInitials = () => {
    const first = contact.firstName?.[0] || ''
    const last = contact.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  const handleCall = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handleWhatsApp = () => {
    if (contact.whatsapp) {
      const cleanNumber = contact.whatsapp.replace(/[^\d+]/g, '')
      window.open(`https://wa.me/${cleanNumber}`, '_blank')
    }
  }

  return (
    <div className="contact-card p-6 md:p-8">
      {/* Card Holes */}
      <div className="card-holes">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="card-hole" />
        ))}
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="brass-frame">
          <div className="w-24 h-24 rounded-full bg-cream-paper flex items-center justify-center">
            <span className="text-4xl font-bold text-dark-leather">
              {getInitials()}
            </span>
          </div>
        </div>
      </div>

      {/* Name */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 font-mono">
        {contact.firstName} {contact.lastName}
      </h2>

      {/* Divider */}
      <div className="h-0.5 bg-brass-gold my-4" />

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        {contact.phone && (
          <div 
            onClick={handleCall}
            className="flex items-center gap-3 p-2 rounded hover:bg-black/5 cursor-pointer transition-colors"
          >
            <Phone className="w-5 h-5 text-dark-leather" />
            <span className="flex-1 font-mono">{contact.phone}</span>
            <span className="text-xs text-muted-foreground">CALL</span>
          </div>
        )}

        {contact.whatsapp && (
          <div 
            onClick={handleWhatsApp}
            className="flex items-center gap-3 p-2 rounded hover:bg-black/5 cursor-pointer transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-dark-leather" />
            <span className="flex-1 font-mono">WhatsApp</span>
            <span className="text-xs text-muted-foreground">CHAT</span>
          </div>
        )}

        {contact.email && (
          <div 
            onClick={handleEmail}
            className="flex items-center gap-3 p-2 rounded hover:bg-black/5 cursor-pointer transition-colors"
          >
            <Mail className="w-5 h-5 text-dark-leather" />
            <span className="flex-1 font-mono text-sm">{contact.email}</span>
            <span className="text-xs text-muted-foreground">MAIL</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {contact.notes && (
        <div className="mb-4 p-3 bg-white/50 rounded-lg border border-dark-leather/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold font-mono">NOTES:</span>
          </div>
          <p className="text-sm font-mono whitespace-pre-wrap">{contact.notes}</p>
        </div>
      )}

      {/* Tags */}
      {contact.tags && contact.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {contact.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brass-gold/30 rounded-full text-xs font-mono font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4 border-t border-brass-gold">
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-lg hover:bg-black/10 transition-colors"
          title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`w-6 h-6 ${
              contact.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-dark-leather'
            }`}
          />
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-black/10 transition-colors"
          title="Edit contact"
        >
          <Edit className="w-6 h-6 text-dark-leather" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-black/10 transition-colors"
          title="Delete contact"
        >
          <Trash2 className="w-6 h-6 text-burgundy-accent" />
        </button>
      </div>
    </div>
  )
}

// Template 2: Compact Design
export function CompactTemplate({ contact, onEdit, onDelete, onToggleFavorite }) {
  const getInitials = () => {
    const first = contact.firstName?.[0] || ''
    const last = contact.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  const handleCall = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handleWhatsApp = () => {
    if (contact.whatsapp) {
      const cleanNumber = contact.whatsapp.replace(/[^\d+]/g, '')
      window.open(`https://wa.me/${cleanNumber}`, '_blank')
    }
  }

  return (
    <div className="contact-card-compact p-5 md:p-6">
      {/* Card Holes - Smaller */}
      <div className="card-holes">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="card-hole" />
        ))}
      </div>

      {/* Horizontal Layout */}
      <div className="flex items-start gap-4">
        {/* Profile Image - Smaller */}
        <div className="brass-frame-small">
          <div className="w-16 h-16 rounded-full bg-cream-paper flex items-center justify-center">
            <span className="text-2xl font-bold text-dark-leather">
              {getInitials()}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          {/* Name and Favorite */}
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl md:text-2xl font-bold font-mono">
              {contact.firstName} {contact.lastName}
            </h2>
            <button
              onClick={onToggleFavorite}
              className="p-1 rounded hover:bg-black/10 transition-colors"
              title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={`w-5 h-5 ${
                  contact.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-dark-leather'
                }`}
              />
            </button>
          </div>

          {/* Compact Contact Information */}
          <div className="space-y-2 mb-3">
            {contact.phone && (
              <div 
                onClick={handleCall}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-dark-leather transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-mono">{contact.phone}</span>
              </div>
            )}

            {contact.email && (
              <div 
                onClick={handleEmail}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-dark-leather transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-xs">{contact.email}</span>
              </div>
            )}

            {contact.whatsapp && (
              <div 
                onClick={handleWhatsApp}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-dark-leather transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-mono text-xs">WhatsApp</span>
              </div>
            )}
          </div>

          {/* Tags - Compact */}
          {contact.tags && contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {contact.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-brass-gold/30 rounded-full text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons - Compact */}
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 text-xs rounded hover:bg-black/10 transition-colors border border-brass-gold font-mono"
            >
              EDIT
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 text-xs rounded hover:bg-black/10 transition-colors border border-burgundy-accent text-burgundy-accent font-mono"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>

      {/* Notes - Collapsible */}
      {contact.notes && (
        <div className="mt-4 p-2 bg-white/50 rounded border border-dark-leather/20">
          <p className="text-xs font-mono whitespace-pre-wrap">{contact.notes}</p>
        </div>
      )}
    </div>
  )
}

// Template 3: Business Card Style
export function BusinessTemplate({ contact, onEdit, onDelete, onToggleFavorite }) {
  const getInitials = () => {
    const first = contact.firstName?.[0] || ''
    const last = contact.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  const handleCall = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handleWhatsApp = () => {
    if (contact.whatsapp) {
      const cleanNumber = contact.whatsapp.replace(/[^\d+]/g, '')
      window.open(`https://wa.me/${cleanNumber}`, '_blank')
    }
  }

  return (
    <div className="contact-card-business p-6 md:p-8">
      {/* Business Card Header */}
      <div className="business-card-header mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="brass-frame-square">
              <div className="w-20 h-20 rounded bg-cream-paper flex items-center justify-center">
                <span className="text-3xl font-bold text-dark-leather">
                  {getInitials()}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-mono mb-1">
                {contact.firstName} {contact.lastName}
              </h2>
              {contact.tags && contact.tags.includes('Work') && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-mono">Professional Contact</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={`w-6 h-6 ${
                contact.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-dark-leather'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Business Divider */}
      <div className="business-divider mb-6" />

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {contact.phone && (
          <div 
            onClick={handleCall}
            className="business-contact-item"
          >
            <Phone className="w-5 h-5 text-dark-leather" />
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-1">PHONE</div>
              <div className="font-mono font-bold">{contact.phone}</div>
            </div>
          </div>
        )}

        {contact.email && (
          <div 
            onClick={handleEmail}
            className="business-contact-item"
          >
            <Mail className="w-5 h-5 text-dark-leather" />
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-1">EMAIL</div>
              <div className="font-mono text-sm font-bold">{contact.email}</div>
            </div>
          </div>
        )}

        {contact.whatsapp && (
          <div 
            onClick={handleWhatsApp}
            className="business-contact-item"
          >
            <MessageCircle className="w-5 h-5 text-dark-leather" />
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-1">WHATSAPP</div>
              <div className="font-mono font-bold">Available</div>
            </div>
          </div>
        )}
      </div>

      {/* Notes Section */}
      {contact.notes && (
        <div className="business-notes mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold font-mono text-dark-leather">NOTES</span>
          </div>
          <p className="text-sm font-mono whitespace-pre-wrap leading-relaxed">{contact.notes}</p>
        </div>
      )}

      {/* Tags */}
      {contact.tags && contact.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {contact.tags.map((tag, index) => (
            <span
              key={index}
              className="business-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-brass-gold/30">
        <button
          onClick={onEdit}
          className="business-action-button"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="business-action-button-delete"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

// Template 4: Minimal Modern
export function MinimalTemplate({ contact, onEdit, onDelete, onToggleFavorite }) {
  const getInitials = () => {
    const first = contact.firstName?.[0] || ''
    const last = contact.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  const handleCall = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handleWhatsApp = () => {
    if (contact.whatsapp) {
      const cleanNumber = contact.whatsapp.replace(/[^\d+]/g, '')
      window.open(`https://wa.me/${cleanNumber}`, '_blank')
    }
  }

  return (
    <div className="contact-card-minimal p-8 md:p-10">
      {/* Minimal Header */}
      <div className="text-center mb-8">
        <div className="inline-block mb-4">
          <div className="minimal-avatar">
            <span className="text-3xl font-bold text-dark-leather">
              {getInitials()}
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
          {contact.firstName} {contact.lastName}
        </h2>

        {/* Tags - Minimal */}
        {contact.tags && contact.tags.length > 0 && (
          <div className="flex justify-center gap-2 mt-3">
            {contact.tags.map((tag, index) => (
              <span
                key={index}
                className="minimal-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Minimal Contact Grid */}
      <div className="space-y-4 mb-8">
        {contact.phone && (
          <div 
            onClick={handleCall}
            className="minimal-contact-row"
          >
            <Phone className="w-5 h-5" />
            <span className="flex-1 font-mono">{contact.phone}</span>
            <span className="minimal-badge">Call</span>
          </div>
        )}

        {contact.email && (
          <div 
            onClick={handleEmail}
            className="minimal-contact-row"
          >
            <Mail className="w-5 h-5" />
            <span className="flex-1 font-mono text-sm">{contact.email}</span>
            <span className="minimal-badge">Email</span>
          </div>
        )}

        {contact.whatsapp && (
          <div 
            onClick={handleWhatsApp}
            className="minimal-contact-row"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="flex-1 font-mono">WhatsApp</span>
            <span className="minimal-badge">Chat</span>
          </div>
        )}
      </div>

      {/* Notes - Minimal */}
      {contact.notes && (
        <div className="minimal-notes mb-8">
          <p className="text-sm font-mono whitespace-pre-wrap text-center">{contact.notes}</p>
        </div>
      )}

      {/* Minimal Action Bar */}
      <div className="minimal-actions">
        <button
          onClick={onToggleFavorite}
          className="minimal-icon-button"
          title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`w-5 h-5 ${
              contact.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''
            }`}
          />
        </button>
        <button
          onClick={onEdit}
          className="minimal-icon-button"
          title="Edit contact"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="minimal-icon-button text-burgundy-accent"
          title="Delete contact"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

