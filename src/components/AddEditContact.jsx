import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { X } from 'lucide-react'

export default function AddEditContact({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: contact?.id || Date.now().toString(),
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    phone: contact?.phone || '',
    whatsapp: contact?.whatsapp || '',
    email: contact?.email || '',
    notes: contact?.notes || '',
    tags: contact?.tags?.join(', ') || '',
    isFavorite: contact?.isFavorite || false,
    createdAt: contact?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    const contactData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    }

    onSave(contactData)
  }

  return (
    <div className="rolodex-container min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="contact-card p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="typewriter-text text-xl md:text-2xl">
              {contact ? 'EDIT CONTACT' : 'ADD CONTACT'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Card Holes */}
          <div className="card-holes">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="card-hole" />
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Profile Initials Display */}
            <div className="flex justify-center mb-6">
              <div className="brass-frame">
                <div className="w-24 h-24 rounded-full bg-cream-paper flex items-center justify-center">
                  <span className="text-4xl font-bold text-dark-leather">
                    {(formData.firstName[0] || '') + (formData.lastName[0] || '')}
                  </span>
                </div>
              </div>
            </div>

            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="font-mono font-bold">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="font-mono font-bold">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="Smith"
              />
              {errors.lastName && (
                <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="font-mono font-bold">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <Label htmlFor="whatsapp" className="font-mono font-bold">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="+1 555 123 4567"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="font-mono font-bold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="font-mono font-bold">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="Met at tech conference..."
                rows={3}
              />
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags" className="font-mono font-bold">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 bg-card border-2 border-brass-gold font-mono"
                placeholder="Work, Tech, Conference"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="flex-1 vintage-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 vintage-button"
              >
                Save Contact
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

