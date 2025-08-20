// Date formatting utilities
export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    relative: { month: 'short', day: 'numeric' }
  }
  
  return date.toLocaleDateString('en-US', options[format] || options.short)
}

export const getRelativeTime = (dateString) => {
  if (!dateString) return '-'
  
  const now = new Date()
  const date = new Date(dateString)
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return formatDate(dateString)
}

// Number formatting utilities
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0'
  return new Intl.NumberFormat('en-US').format(number)
}

export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0%'
  return `${Number(value).toFixed(decimals)}%`
}

export const abbreviateNumber = (number) => {
  if (number === null || number === undefined) return '0'
  
  const abbrev = ['', 'K', 'M', 'B']
  let index = 0
  
  while (number >= 1000 && index < abbrev.length - 1) {
    number /= 1000
    index++
  }
  
  return `${number.toFixed(index > 0 ? 1 : 0)}${abbrev[index]}`
}

// String utilities
export const generateInitials = (name) => {
  if (!name) return '??'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Engagement and status utilities
export const getEngagementLevel = (score) => {
  if (score >= 90) return { level: 'Excellent', color: 'green' }
  if (score >= 80) return { level: 'Good', color: 'blue' }
  if (score >= 70) return { level: 'Average', color: 'yellow' }
  if (score >= 60) return { level: 'Below Average', color: 'orange' }
  return { level: 'Poor', color: 'red' }
}

export const getEngagementColor = (score) => {
  if (score >= 90) return '#10B981' // green
  if (score >= 80) return '#3B82F6' // blue
  if (score >= 70) return '#F59E0B' // yellow
  if (score >= 60) return '#F97316' // orange
  return '#EF4444' // red
}

export const getStatusColor = (status) => {
  const colors = {
    active: '#10B981',
    inactive: '#6B7280',
    pending: '#F59E0B',
    completed: '#8B5CF6',
    upcoming: '#06B6D4'
  }
  return colors[status] || '#6B7280'
}

// Array utilities
export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    let aVal = a[key]
    let bVal = b[key]
    
    // Handle nested properties
    if (key.includes('.')) {
      const keys = key.split('.')
      aVal = keys.reduce((obj, k) => obj?.[k], a)
      bVal = keys.reduce((obj, k) => obj?.[k], b)
    }
    
    if (direction === 'desc') {
      return bVal > aVal ? 1 : -1
    }
    return aVal > bVal ? 1 : -1
  })
}

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

export const filterByQuery = (array, query, searchFields = []) => {
  if (!query) return array
  
  const lowercaseQuery = query.toLowerCase()
  
  return array.filter(item => {
    return searchFields.some(field => {
      const value = field.includes('.') 
        ? field.split('.').reduce((obj, key) => obj?.[key], item)
        : item[field]
      
      return value?.toString().toLowerCase().includes(lowercaseQuery)
    })
  })
}

// Challenge utilities
export const getChallengeProgress = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const now = new Date()
  
  if (now < start) return 0
  if (now > end) return 100
  
  const totalDuration = end - start
  const elapsed = now - start
  
  return Math.round((elapsed / totalDuration) * 100)
}

export const getDaysRemaining = (endDate) => {
  const end = new Date(endDate)
  const now = new Date()
  const diffTime = end - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 0
  return diffDays
}

export const getChallengeStatus = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const now = new Date()
  
  if (now < start) return 'upcoming'
  if (now > end) return 'completed'
  return 'active'
}

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Local storage utilities
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    return false
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

// Color utilities
export const generateRandomColor = () => {
  const colors = [
    '#3B82F6', '#10B981', '#EF4444', '#8B5CF6', 
    '#F59E0B', '#06B6D4', '#F97316', '#6366F1'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Team utilities
export const calculateTeamStats = (team, employees) => {
  const teamMembers = employees.filter(emp => 
    team.membersList?.includes(emp.id)
  )
  
  if (teamMembers.length === 0) {
    return {
      averageEngagement: 0,
      totalPoints: 0,
      memberCount: 0
    }
  }
  
  const totalEngagement = teamMembers.reduce((sum, emp) => sum + emp.engagementScore, 0)
  const totalPoints = teamMembers.reduce((sum, emp) => sum + emp.totalPoints, 0)
  
  return {
    averageEngagement: Math.round(totalEngagement / teamMembers.length),
    totalPoints,
    memberCount: teamMembers.length
  }
}

// Export all utilities as default object
export default {
  formatDate,
  getRelativeTime,
  formatNumber,
  formatPercentage,
  abbreviateNumber,
  generateInitials,
  truncateText,
  slugify,
  getEngagementLevel,
  getEngagementColor,
  getStatusColor,
  sortBy,
  groupBy,
  filterByQuery,
  getChallengeProgress,
  getDaysRemaining,
  getChallengeStatus,
  isValidEmail,
  isValidPhone,
  getFromStorage,
  setToStorage,
  removeFromStorage,
  generateRandomColor,
  hexToRgba,
  calculateTeamStats
}