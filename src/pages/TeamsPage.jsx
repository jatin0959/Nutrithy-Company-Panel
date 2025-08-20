import React, { useState, useEffect } from 'react'
import { 
  Trophy, 
  Users, 
  Plus, 
  Search, 
  Award, 
  Target,
  TrendingUp,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Star,
  Calendar
} from 'lucide-react'
import { mockTeams, mockEmployees } from '../data/mockData'
import { 
  formatNumber, 
  formatDate, 
  calculateTeamStats,
  filterByQuery,
  sortBy
} from '../utils/helpers'
import Modal, { ConfirmModal, SuccessModal } from '../components/common/Modal'
import toast from 'react-hot-toast'

const TeamsPage = () => {
  const [teams, setTeams] = useState([])
  const [employees, setEmployees] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [loading, setLoading] = useState(true)

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    captain: '',
    department: '',
    color: '#3B82F6'
  })

  const teamColors = [
    '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', 
    '#06B6D4', '#EC4899', '#6366F1', '#84CC16', '#F97316'
  ]

  const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design', 'Operations']

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTeams(mockTeams)
      setEmployees(mockEmployees)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = teams

    // Apply search filter
    if (searchTerm) {
      filtered = filterByQuery(filtered, searchTerm, ['name', 'description', 'captain', 'department'])
    }

    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(team => team.department === filterDepartment)
    }

    // Apply sorting
    filtered = sortBy(filtered, sortField, sortDirection)

    setFilteredTeams(filtered)
  }, [teams, searchTerm, filterDepartment, sortField, sortDirection])

  const handleCreateTeam = () => {
    const team = {
      id: teams.length + 1,
      ...newTeam,
      members: 1, // Captain is the first member
      totalPoints: 0,
      averageEngagement: 0,
      activeChallenges: 0,
      created: new Date().toISOString().split('T')[0],
      membersList: [],
      achievements: []
    }

    setTeams([...teams, team])
    setNewTeam({
      name: '',
      description: '',
      captain: '',
      department: '',
      color: '#3B82F6'
    })
    setShowCreateModal(false)
    setShowSuccessModal(true)
    toast.success('Team created successfully!')
  }

  const handleDeleteTeam = () => {
    setTeams(teams.filter(team => team.id !== selectedTeam.id))
    setShowDeleteModal(false)
    setSelectedTeam(null)
    toast.success('Team deleted successfully!')
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const TeamCard = ({ team }) => {
    const teamStats = calculateTeamStats(team, employees)
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 card-hover" 
           style={{ borderLeftColor: team.color }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: team.color }}
            >
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{team.name}</h3>
              <p className="text-sm text-gray-600">{team.description}</p>
              <p className="text-xs text-gray-500">{team.department}</p>
            </div>
          </div>
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
                  Edit Team
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Members
                </button>
                <button 
                  onClick={() => {
                    setSelectedTeam(team)
                    setShowDeleteModal(true)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Team
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-blue-600">{team.members}</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Star className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-600">{formatNumber(team.totalPoints)}</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-purple-600">{team.activeChallenges}</p>
            <p className="text-xs text-gray-500">Challenges</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Captain:</span>
            <span className="font-semibold">{team.captain}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg Engagement:</span>
            <span className="font-semibold">{team.averageEngagement}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Created:</span>
            <span className="font-semibold">{formatDate(team.created)}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Team Performance</span>
            <span className="font-semibold">{team.averageEngagement}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${team.averageEngagement}%`, 
                backgroundColor: team.color 
              }}
            />
          </div>
        </div>

        {team.achievements && team.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
            <div className="flex flex-wrap gap-1">
              {team.achievements.slice(0, 2).map((achievement, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800"
                >
                  {achievement}
                </span>
              ))}
              {team.achievements.length > 2 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                  +{team.achievements.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
            View Details
          </button>
          <button 
            className="flex-1 text-white px-3 py-2 rounded-lg hover:opacity-90 transition text-sm"
            style={{ backgroundColor: team.color }}
          >
            Manage Team
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          <p className="text-gray-500">{teams.length} total teams • {filteredTeams.length} shown</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Team</span>
        </button>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{teams.length}</p>
          <p className="text-sm text-gray-500">Total Teams</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">
            {teams.reduce((sum, team) => sum + team.members, 0)}
          </p>
          <p className="text-sm text-gray-500">Team Members</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">
            {formatNumber(teams.reduce((sum, team) => sum + team.totalPoints, 0))}
          </p>
          <p className="text-sm text-gray-500">Total Points</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(teams.reduce((sum, team) => sum + team.averageEngagement, 0) / teams.length) || 0}%
          </p>
          <p className="text-sm text-gray-500">Avg Engagement</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams by name, description, or captain..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-')
                setSortField(field)
                setSortDirection(direction)
              }}
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="members-desc">Most Members</option>
              <option value="totalPoints-desc">Highest Points</option>
              <option value="averageEngagement-desc">Best Performance</option>
              <option value="created-desc">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && !loading && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-500 mb-4">
            {teams.length === 0 
              ? "Create your first team to get started with team challenges." 
              : "Try adjusting your search or filter criteria."
            }
          </p>
          {teams.length === 0 && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Create Your First Team
            </button>
          )}
        </div>
      )}

      {/* Create Team Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create New Team"
        size="medium"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
            <input 
              type="text" 
              required
              value={newTeam.name}
              onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              required
              rows="3"
              value={newTeam.description}
              onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the team's purpose and goals"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Captain</label>
              <select 
                required
                value={newTeam.captain}
                onChange={(e) => setNewTeam({...newTeam, captain: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Captain</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name} - {emp.department}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select 
                required
                value={newTeam.department}
                onChange={(e) => setNewTeam({...newTeam, department: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
                <option value="Mixed">Cross-Department</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Color</label>
            <div className="flex space-x-2">
              {teamColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewTeam({...newTeam, color})}
                  className={`w-8 h-8 rounded-full border-2 ${
                    newTeam.color === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateTeam}
              disabled={!newTeam.name || !newTeam.description || !newTeam.captain || !newTeam.department}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Team
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTeam}
        title="Delete Team"
        message={`Are you sure you want to delete "${selectedTeam?.name}"? This action cannot be undone and all team data will be lost.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Team Created Successfully!"
        message="Your new team has been created and is ready for challenges and collaboration."
      />
    </div>
  )
}

export default TeamsPage