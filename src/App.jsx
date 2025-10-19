import { useState, useEffect } from 'react'
import './App.css'
import ContactCard from './components/ContactCard'
import AddEditContact from './components/AddEditContact'
import AlphabetIndex from './components/AlphabetIndex'
import TagFilter from './components/TagFilter'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, Plus, VolumeX, Volume2, Star, Download, Upload, FileText, User } from 'lucide-react'

// Local storage service
const StorageService = {
  getContacts: () => {
    const contacts = localStorage.getItem('rolodex_contacts')
    return contacts ? JSON.parse(contacts) : []
  },
  saveContacts: (contacts) => {
    localStorage.setItem('rolodex_contacts', JSON.stringify(contacts))
  },
  addContact: (contact) => {
    const contacts = StorageService.getContacts()
    contacts.push(contact)
    StorageService.saveContacts(contacts)
  },
  updateContact: (updatedContact) => {
    const contacts = StorageService.getContacts()
    const index = contacts.findIndex(c => c.id === updatedContact.id)
    if (index !== -1) {
      contacts[index] = updatedContact
      StorageService.saveContacts(contacts)
    }
  },
  deleteContact: (id) => {
    const contacts = StorageService.getContacts().filter(c => c.id !== id)
    StorageService.saveContacts(contacts)
  },
  exportToJson: () => {
    const contacts = StorageService.getContacts()
    const dataStr = JSON.stringify(contacts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rolodex_backup_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  },
  exportToCSV: () => {
    const contacts = StorageService.getContacts()
    const headers = ['First Name', 'Last Name', 'Phone', 'WhatsApp', 'Email', 'Notes', 'Tags', 'Favorite']
    const csvRows = [
      headers.join(','),
      ...contacts.map(c => [
        `"${c.firstName}"`,
        `"${c.lastName}"`,
        `"${c.phone || ''}"`,
        `"${c.whatsapp || ''}"`,
        `"${c.email || ''}"`,
        `"${(c.notes || '').replace(/"/g, '""')}"`,
        `"${(c.tags || []).join('; ')}"`,
        c.isFavorite ? 'Yes' : 'No'
      ].join(','))
    ]
    const csvStr = csvRows.join('\n')
    const dataBlob = new Blob([csvStr], { type: 'text/csv' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rolodex_contacts_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  },
  exportToVCard: () => {
    const contacts = StorageService.getContacts()
    const vcards = contacts.map(c => {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${c.firstName} ${c.lastName}`,
        `N:${c.lastName};${c.firstName};;;`,
      ]
      if (c.phone) lines.push(`TEL;TYPE=CELL:${c.phone}`)
      if (c.whatsapp) lines.push(`TEL;TYPE=CELL:${c.whatsapp}`)
      if (c.email) lines.push(`EMAIL:${c.email}`)
      if (c.notes) lines.push(`NOTE:${c.notes.replace(/\n/g, '\\n')}`)
      if (c.tags && c.tags.length > 0) lines.push(`CATEGORIES:${c.tags.join(',')}`)
      lines.push('END:VCARD')
      return lines.join('\n')
    }).join('\n\n')
    
    const dataBlob = new Blob([vcards], { type: 'text/vcard' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rolodex_contacts_${new Date().toISOString().split('T')[0]}.vcf`
    link.click()
    URL.revokeObjectURL(url)
  },
  importFromCSV: (file, callback) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',')
        
        const contacts = lines.slice(1).map(line => {
          const values = []
          let current = ''
          let inQuotes = false
          
          for (let char of line) {
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          values.push(current.trim())
          
          return {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            firstName: values[0]?.replace(/^"|"$/g, '') || '',
            lastName: values[1]?.replace(/^"|"$/g, '') || '',
            phone: values[2]?.replace(/^"|"$/g, '') || '',
            whatsapp: values[3]?.replace(/^"|"$/g, '') || '',
            email: values[4]?.replace(/^"|"$/g, '') || '',
            notes: values[5]?.replace(/^"|"$/g, '').replace(/""/g, '"') || '',
            tags: values[6]?.replace(/^"|"$/g, '').split(';').map(t => t.trim()).filter(t => t) || [],
            isFavorite: values[7]?.toLowerCase() === 'yes',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        })
        
        const existingContacts = StorageService.getContacts()
        StorageService.saveContacts([...existingContacts, ...contacts])
        callback(contacts.length)
      } catch (error) {
        console.error('Error importing CSV:', error)
        callback(0, error.message)
      }
    }
    reader.readAsText(file)
  }
}

// Sound service with enhanced vintage sounds
const SoundService = {
  enabled: true,
  playPageFlip: () => {
    if (!SoundService.enabled) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()
    
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Paper flip sound - lower frequency with filter
    oscillator.frequency.value = 150
    oscillator.type = 'sawtooth'
    filter.type = 'lowpass'
    filter.frequency.value = 800
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  },
  playClick: () => {
    if (!SoundService.enabled) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Mechanical click sound
    oscillator.frequency.value = 600
    oscillator.type = 'square'
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.04)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.04)
  },
  playDelete: () => {
    if (!SoundService.enabled) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Descending tone for delete
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2)
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  },
  playSave: () => {
    if (!SoundService.enabled) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Ascending tone for save
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  }
}

// Sample contacts
const sampleContacts = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    phone: '(555) 123-4567',
    whatsapp: '+15551234567',
    email: 'john@example.com',
    notes: 'Met at tech conference 2025. Discussed Flutter development.',
    tags: ['Work', 'Tech'],
    isFavorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '(555) 987-6543',
    whatsapp: '+15559876543',
    email: 'sarah@example.com',
    notes: 'Project manager at Acme Corp',
    tags: ['Work'],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Davis',
    phone: '(555) 456-7890',
    email: 'mike@example.com',
    notes: 'Old college friend',
    tags: ['Personal'],
    isFavorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

function App() {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Load contacts on mount
  useEffect(() => {
    let loadedContacts = StorageService.getContacts()
    if (loadedContacts.length === 0) {
      // Add sample contacts if none exist
      sampleContacts.forEach(contact => StorageService.addContact(contact))
      loadedContacts = sampleContacts
    }
    setContacts(loadedContacts)
    setFilteredContacts(loadedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName)))
  }, [])

  // Update sound service when soundEnabled changes
  useEffect(() => {
    SoundService.enabled = soundEnabled
  }, [soundEnabled])

  // Handle search and filtering
  useEffect(() => {
    let result = contacts
    
    if (showFavoritesOnly) {
      result = result.filter(c => c.isFavorite)
    }
    
    if (selectedTags.length > 0) {
      result = result.filter(c => 
        c.tags?.some(tag => selectedTags.includes(tag))
      )
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.firstName.toLowerCase().includes(query) ||
        c.lastName.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.phone?.includes(query) ||
        c.whatsapp?.includes(query) ||
        c.notes?.toLowerCase().includes(query) ||
        c.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    setFilteredContacts(result.sort((a, b) => a.lastName.localeCompare(b.lastName)))
    setCurrentIndex(0)
  }, [searchQuery, contacts, showFavoritesOnly, selectedTags])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      SoundService.playPageFlip()
    }
  }

  const handleNext = () => {
    if (currentIndex < filteredContacts.length - 1) {
      setCurrentIndex(currentIndex + 1)
      SoundService.playPageFlip()
    }
  }

  const handleAddContact = () => {
    setEditingContact(null)
    setShowAddEdit(true)
    SoundService.playClick()
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setShowAddEdit(true)
    SoundService.playClick()
  }

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      StorageService.deleteContact(id)
      setContacts(StorageService.getContacts())
      SoundService.playDelete()
    }
  }

  const handleSaveContact = (contact) => {
    if (editingContact) {
      StorageService.updateContact(contact)
    } else {
      StorageService.addContact(contact)
    }
    setContacts(StorageService.getContacts())
    setShowAddEdit(false)
    SoundService.playSave()
  }

  const handleToggleFavorite = (contact) => {
    const updated = { ...contact, isFavorite: !contact.isFavorite }
    StorageService.updateContact(updated)
    setContacts(StorageService.getContacts())
    SoundService.playClick()
  }

  const handleLetterClick = (letter) => {
    const index = filteredContacts.findIndex(c => 
      c.lastName.toUpperCase().startsWith(letter)
    )
    if (index !== -1) {
      setCurrentIndex(index)
      SoundService.playClick()
    }
  }

  const handleExportJSON = () => {
    StorageService.exportToJson()
    setShowExportMenu(false)
    SoundService.playClick()
  }

  const handleExportCSV = () => {
    StorageService.exportToCSV()
    setShowExportMenu(false)
    SoundService.playClick()
  }

  const handleExportVCard = () => {
    StorageService.exportToVCard()
    setShowExportMenu(false)
    SoundService.playClick()
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    if (file.name.endsWith('.csv')) {
      StorageService.importFromCSV(file, (count, error) => {
        if (error) {
          alert(`Error importing CSV: ${error}`)
        } else {
          alert(`Successfully imported ${count} contacts`)
          setContacts(StorageService.getContacts())
          SoundService.playSave()
        }
      })
    } else {
      alert('Please select a CSV file')
    }
    event.target.value = ''
  }

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    SoundService.playClick()
  }

  const handleClearTags = () => {
    setSelectedTags([])
    SoundService.playClick()
  }

  // Get all unique tags from contacts
  const allTags = [...new Set(contacts.flatMap(c => c.tags || []))].sort()

  if (showAddEdit) {
    return (
      <AddEditContact
        contact={editingContact}
        onSave={handleSaveContact}
        onCancel={() => setShowAddEdit(false)}
      />
    )
  }

  return (
    <div className="rolodex-container min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="typewriter-text text-2xl md:text-3xl">VINTAGE ROLODEX</h1>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-2 border-brass-gold"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <Button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            variant={showFavoritesOnly ? "default" : "outline"}
            className="vintage-button"
          >
            <Star className="w-4 h-4 mr-2" />
            Favorites
          </Button>
          
          <div className="relative">
            <Button
              onClick={() => setShowExportMenu(!showExportMenu)}
              variant="outline"
              className="vintage-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {showExportMenu && (
              <div className="absolute top-full left-0 mt-2 bg-card border-2 border-brass-gold rounded-lg shadow-lg z-10 min-w-[180px]">
                <button
                  onClick={handleExportJSON}
                  className="w-full px-4 py-2 text-left hover:bg-brass-gold/20 flex items-center gap-2 font-mono text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Export as JSON
                </button>
                <button
                  onClick={handleExportCSV}
                  className="w-full px-4 py-2 text-left hover:bg-brass-gold/20 flex items-center gap-2 font-mono text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Export as CSV
                </button>
                <button
                  onClick={handleExportVCard}
                  className="w-full px-4 py-2 text-left hover:bg-brass-gold/20 flex items-center gap-2 font-mono text-sm rounded-b-lg"
                >
                  <User className="w-4 h-4" />
                  Export as vCard
                </button>
              </div>
            )}
          </div>
          
          <label className="vintage-button cursor-pointer inline-flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Tag Filter */}
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearTags}
        />

        {/* Card Counter */}
        <div className="text-center mb-4">
          <p className="text-sm font-mono">
            Card {filteredContacts.length === 0 ? 0 : currentIndex + 1} of {filteredContacts.length}
          </p>
        </div>

        {/* Contact Card Display */}
        <div className="mb-6">
          {filteredContacts.length === 0 ? (
            <div className="contact-card p-12 text-center">
              <div className="card-holes">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="card-hole" />
                ))}
              </div>
              <p className="text-xl mb-4">No contacts found</p>
              <p className="text-muted-foreground mb-6">Add your first contact to get started</p>
              <Button onClick={handleAddContact} className="vintage-button">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mb-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="outline"
                  className="vintage-button"
                >
                  ◄ Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentIndex === filteredContacts.length - 1}
                  variant="outline"
                  className="vintage-button"
                >
                  Next ►
                </Button>
              </div>

              {/* Contact Card */}
              <ContactCard
                contact={filteredContacts[currentIndex]}
                onEdit={() => handleEditContact(filteredContacts[currentIndex])}
                onDelete={() => handleDeleteContact(filteredContacts[currentIndex].id)}
                onToggleFavorite={() => handleToggleFavorite(filteredContacts[currentIndex])}
              />
            </div>
          )}
        </div>

        {/* Alphabet Index */}
        <AlphabetIndex onLetterClick={handleLetterClick} />

        {/* Add Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleAddContact}
            className="vintage-button w-14 h-14 rounded-full p-0 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App

