import React, { useState, useEffect } from 'react'
import { 
  Target, 
  Plus, 
  Search, 
  Filter,
  Users,
  Calendar,
  TrendingUp,
  Award,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'
import { mockChallenges, wellnessCategories } from '../data/mockData'
import { 
  formatNumber, 
  formatDate, 
  getChallengeProgress,
  getDaysRemaining,
  getChallengeStatus,
  filterByQuery,
  sortBy
} from '../utils/helpers'
import Modal, { ConfirmModal, SuccessModal } from '../components/common/Modal'
import toast from 'react-hot-toast'

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([])
  const [filteredChallenges, setFilteredChallenges] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortField, setSortField] = useState('startDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [loading, setLoading] = useState(true)

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    points: 100,
    difficulty: 'Medium'
  })

  const difficulties = ['Easy', 'Medium', 'Hard']

  useEffect(() => {
    // Simulate loading and update challenge statuses
    setTimeout(() => {
      const updatedChallenges = mockChallenges.map(challenge => ({
        ...challenge,
        status: getChallengeStatus(challenge.startDate, challenge.endDate),
        progress: getChallengeProgress(challenge.startDate, challenge.endDate),
        daysRemaining: getDaysRemaining(challenge.endDate)
      }))
      setChallenges(updatedChallenges)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = challenges

    // Apply search filter
    if (searchTerm) {
      filtered = filterByQuery(filtered, searchTerm, ['title', 'description', 'category'])
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(challenge => challenge.category === filterCategory)
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(challenge => challenge.status === filterStatus)
    }

    // Apply sorting
    filtered = sortBy(filtered, sortField, sortDirection)

    setFilteredChallenges(filtered)
  }, [challenges, searchTerm, filterCategory, filterStatus, sortField, sortDirection])

  const handleCreateChallenge = () => {
    const IconComponent = wellnessCategories.find(cat => cat.name === newChallenge.category)?.icon || Target
    const color = wellnessCategories.find(cat => cat.name === newChallenge.category)?.color || '#3B82F6'
    
    const challenge = {
      id: challenges.length + 1,
      ...newChallenge,
      participants: 0,
      completionRate: 0,
      status: getChallengeStatus(newChallenge.startDate, newChallenge.endDate),
      icon: IconComponent,
      color: color,
      requirements: ['Complete daily activities', 'Track progress', 'Share updates'],
      rewards: [`${newChallenge.points} points`, 'Certificate of completion', 'Wellness badge']
    }

    setChallenges([...challenges, challenge])
    setNewChallenge({
      title: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
      points: 100,
      difficulty: 'Medium'
    })
    setShowCreateModal(false)
    setShowSuccessModal(true)
    toast.success('Challenge created successfully!')
  }

  const handleDeleteChallenge = () => {
    setChallenges(challenges.filter(challenge => challenge.id !== selectedChallenge.id))
    setShowDeleteModal(false)
    setSelectedChallenge(null)
    toast.success('Challenge deleted successfully!')
  }

  const handleToggleChallengeStatus = (challengeId) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const newStatus = challenge.status === 'active' ? 'paused' : 'active'
        return { ...challenge, status: newStatus }
      }
      return challenge
    }))
    toast.success('Challenge status updated!')
  }

  const ChallengeCard = ({ challenge }) => {
    const IconComponent = challenge.icon
    const isActive = challenge.status === 'active'
    const isCompleted = challenge.status === 'completed'
    const isUpcoming = challenge.status === 'upcoming'

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 card-hover">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: challenge.color }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">{challenge.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isActive ? 'bg-green-100 text-green-800' :
              isCompleted ? 'bg-blue-100 text-blue-800' :
              isUpcoming ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {challenge.status}
            </span>
            <div className="relative group">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Challenge
                  </button>
                  {isActive && (
                    <button 
                      onClick={() => handleToggleChallengeStatus(challenge.id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Challenge
                    </button>
                  )}
                  {challenge.status === 'paused' && (
                    <button 
                      onClick={() => handleToggleChallengeStatus(challenge.id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume Challenge
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedChallenge(challenge)
                      setShowDeleteModal(true)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-blue-600">{formatNumber(challenge.participants)}</p>
            <p className="text-xs text-gray-500">Participants</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-600">{challenge.completionRate}%</p>
            <p className="text-xs text-gray-500">Completion</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-yellow-600">{challenge.points}</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Category:</span>
            <span className="font-semibold">{challenge.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold">
              {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Difficulty:</span>
            <span className={`font-semibold ${
              challenge.difficulty === 'Easy' ? 'text-green-600' :
              challenge.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
          {isActive && challenge.daysRemaining > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Days remaining:</span>
              <span className="font-semibold text-blue-600">{challenge.daysRemaining} days</span>
            </div>
          )}
        </div>

        {/* Progress Bar for Active Challenges */}
        {(isActive || isCompleted) && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Challenge Progress</span>
              <span className="font-semibold">{challenge.progress || challenge.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${challenge.progress || challenge.completionRate}%`,
                  backgroundColor: challenge.color
                }}
              />
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
            View Details
          </button>
          <button 
            className="flex-1 text-white px-3 py-2 rounded-lg hover:opacity-90 transition text-sm"
            style={{ backgroundColor: challenge.color }}
          >
            Manage
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="bg-gray-200 rounded-xl h-20"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
          ))}
        </div>
      </div>
    )
  }

  const activeCount = challenges.filter(c => c.status === 'active').length
  const completedCount = challenges.filter(c => c.status === 'completed').length
  const upcomingCount = challenges.filter(c => c.status === 'upcoming').length
  const totalParticipants = challenges.reduce((sum, c) => sum + c.participants, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Wellness Challenges</h1>
          <p className="text-gray-500">{challenges.length} total challenges • {filteredChallenges.length} shown</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </button>
      </div>

      {/* Challenge Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{activeCount}</p>
          <p className="text-sm text-gray-500">Active Challenges</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{upcomingCount}</p>
          <p className="text-sm text-gray-500">Upcoming</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{formatNumber(totalParticipants)}</p>
          <p className="text-sm text-gray-500">Total Participants</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search challenges by title, description, or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {wellnessCategories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="paused">Paused</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-')
                setSortField(field)
                setSortDirection(direction)
              }}
            >
              <option value="startDate-desc">Newest First</option>
              <option value="startDate-asc">Oldest First</option>
              <option value="participants-desc">Most Participants</option>
              <option value="completionRate-desc">Highest Completion</option>
              <option value="points-desc">Highest Points</option>
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && !loading && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-500 mb-4">
            {challenges.length === 0 
              ? "Create your first wellness challenge to engage your team." 
              : "Try adjusting your search or filter criteria."
            }
          </p>
          {challenges.length === 0 && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Create Your First Challenge
            </button>
          )}
        </div>
      )}

      {/* Create Challenge Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create New Challenge"
        size="large"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Title</label>
            <input 
              type="text" 
              required
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter challenge title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              required
              rows="3"
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the challenge goals and activities"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                required
                value={newChallenge.category}
                onChange={(e) => setNewChallenge({...newChallenge, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {wellnessCategories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select 
                required
                value={newChallenge.difficulty}
                onChange={(e) => setNewChallenge({...newChallenge, difficulty: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input 
                type="date" 
                required
                value={newChallenge.startDate}
                onChange={(e) => setNewChallenge({...newChallenge, startDate: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input 
                type="date" 
                required
                value={newChallenge.endDate}
                onChange={(e) => setNewChallenge({...newChallenge, endDate: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Points Reward</label>
            <input 
              type="number" 
              min="50"
              max="1000"
              step="50"
              required
              value={newChallenge.points}
              onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Points awarded for completion"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateChallenge}
              disabled={!newChallenge.title || !newChallenge.description || !newChallenge.category || !newChallenge.startDate || !newChallenge.endDate}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Challenge
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteChallenge}
        title="Delete Challenge"
        message={`Are you sure you want to delete "${selectedChallenge?.title}"? This action cannot be undone and all participant data will be lost.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Challenge Created Successfully!"
        message="Your new wellness challenge has been created and is ready for participants to join."
      />
    </div>
  )
}

export default ChallengesPage