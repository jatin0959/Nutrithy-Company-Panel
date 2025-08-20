import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Trophy, 
  Target, 
  TrendingUp,
  Plus,
  CheckCircle,
  UserPlus,
  Award,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Heart,
  Zap,
  Clock
} from 'lucide-react'
import { 
  companyInfo, 
  mockEmployees, 
  mockTeams, 
  mockChallenges, 
  recentActivities,
  departmentStats
} from '../../data/mockData'
import { 
  formatNumber, 
  formatPercentage, 
  getRelativeTime,
  generateInitials 
} from '../../utils/helpers'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats({
        totalEmployees: companyInfo.totalEmployees,
        activeEmployees: companyInfo.activeEmployees,
        totalTeams: companyInfo.totalTeams,
        activeChallenges: companyInfo.activeChallenges,
        overallEngagement: companyInfo.overallEngagement,
        // Additional calculated stats
        completedChallenges: mockChallenges.filter(c => c.status === 'completed').length,
        avgChallengeCompletion: Math.round(
          mockChallenges.reduce((sum, c) => sum + c.completionRate, 0) / mockChallenges.length
        ),
        topPerformers: mockEmployees
          .sort((a, b) => b.engagementScore - a.engagementScore)
          .slice(0, 5),
        topTeams: mockTeams
          .sort((a, b) => b.averageEngagement - a.averageEngagement)
          .slice(0, 3)
      })
      setLoading(false)
    }, 1000)
  }, [])

  const StatCard = ({ icon: Icon, title, value, subtitle, change, changeType, color, onClick }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl cursor-pointer card-hover`}
      style={{ borderLeftColor: color }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'increase' ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <Icon className="w-12 h-12 opacity-20" style={{ color }} />
        </div>
      </div>
    </div>
  )

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'challenge_completed': return CheckCircle
        case 'team_joined': return UserPlus
        case 'milestone_reached': return Award
        case 'goal_completed': return Target
        case 'challenge_started': return Activity
        default: return Activity
      }
    }

    const getActivityColor = (type) => {
      switch (type) {
        case 'challenge_completed': return 'text-green-600 bg-green-50 border-green-500'
        case 'team_joined': return 'text-blue-600 bg-blue-50 border-blue-500'
        case 'milestone_reached': return 'text-purple-600 bg-purple-50 border-purple-500'
        case 'goal_completed': return 'text-orange-600 bg-orange-50 border-orange-500'
        case 'challenge_started': return 'text-indigo-600 bg-indigo-50 border-indigo-500'
        default: return 'text-gray-600 bg-gray-50 border-gray-500'
      }
    }

    const ActivityIcon = getActivityIcon(activity.type)
    const colorClass = getActivityColor(activity.type)

    return (
      <div className={`flex items-start space-x-3 p-4 border-l-4 rounded-r-lg ${colorClass} hover:bg-opacity-80 transition-colors`}>
        <ActivityIcon className="w-5 h-5 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800">{activity.title}</p>
          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          <p className="text-xs text-gray-400 mt-2">{getRelativeTime(activity.timestamp)}</p>
        </div>
      </div>
    )
  }

  const ProgressBar = ({ label, value, color, target = 100 }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="h-3 rounded-full transition-all duration-500 progress-bar"
          style={{ 
            width: `${Math.min(value, 100)}%`, 
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  )

  const QuickActionButton = ({ icon: Icon, title, description, onClick, color = 'blue' }) => (
    <button
      onClick={onClick}
      className={`p-6 bg-${color}-50 text-${color}-600 rounded-lg hover:bg-${color}-100 transition-all duration-200 text-left w-full group btn-hover border border-${color}-200`}
    >
      <div className="flex items-start space-x-4">
        <Icon className={`w-8 h-8 text-${color}-600 group-hover:scale-110 transition-transform`} />
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  )

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-200 rounded-xl h-64"></div>
          <div className="bg-gray-200 rounded-xl h-64"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back to {companyInfo.name}!</h2>
            <p className="text-blue-100">
              {stats.activeEmployees} of {stats.totalEmployees} employees are actively engaged in wellness programs
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.overallEngagement}%</p>
                <p className="text-blue-100 text-sm">Overall Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Employees"
          value={formatNumber(stats.totalEmployees)}
          subtitle={`${stats.activeEmployees} active today`}
          change="+12 this month"
          changeType="increase"
          color="#3B82F6"
          onClick={() => navigate('/employees')}
        />
        <StatCard
          icon={Trophy}
          title="Active Teams"
          value={formatNumber(stats.totalTeams)}
          subtitle="All teams engaged"
          change="+2 this month"
          changeType="increase"
          color="#8B5CF6"
          onClick={() => navigate('/teams')}
        />
        <StatCard
          icon={Target}
          title="Active Challenges"
          value={formatNumber(stats.activeChallenges)}
          subtitle={`${stats.avgChallengeCompletion}% avg completion`}
          change="+3 this week"
          changeType="increase"
          color="#10B981"
          onClick={() => navigate('/challenges')}
        />
        <StatCard
          icon={TrendingUp}
          title="Engagement Score"
          value={formatPercentage(stats.overallEngagement)}
          subtitle="Company average"
          change="+5% this month"
          changeType="increase"
          color="#F59E0B"
          onClick={() => navigate('/reports')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Department Performance</h3>
            <button 
              onClick={() => navigate('/reports')}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Details →
            </button>
          </div>
          <div className="space-y-6">
            {departmentStats.slice(0, 4).map((dept, index) => (
              <ProgressBar
                key={dept.name}
                label={`${dept.name} (${dept.employeeCount} employees)`}
                value={dept.averageEngagement}
                color={dept.color}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-500" />
            Recent Activity
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.slice(0, 5).map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              View all activity
            </button>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Employees */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Top Employees
            </h3>
            <button 
              onClick={() => navigate('/employees')}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {stats.topPerformers?.map((employee, index) => (
              <div 
                key={employee.id} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                }`}>
                  {index + 1}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {generateInitials(employee.name)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.department} • {employee.totalPoints} points</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{employee.engagementScore}%</p>
                  <p className="text-xs text-gray-500">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Teams */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-purple-500" />
              Top Teams
            </h3>
            <button 
              onClick={() => navigate('/teams')}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {stats.topTeams?.map((team, index) => (
              <div 
                key={team.id} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                }`}>
                  {index + 1}
                </div>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: team.color }}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{team.name}</p>
                  <p className="text-xs text-gray-500">{team.members} members • {team.captain}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-purple-600">{formatNumber(team.totalPoints)}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            icon={UserPlus}
            title="Add Employee"
            description="Invite new team members"
            onClick={() => navigate('/employees')}
            color="blue"
          />
          <QuickActionButton
            icon={Trophy}
            title="Create Team"
            description="Form new wellness teams"
            onClick={() => navigate('/teams')}
            color="purple"
          />
          <QuickActionButton
            icon={Target}
            title="New Challenge"
            description="Launch wellness challenges"
            onClick={() => navigate('/challenges')}
            color="green"
          />
          <QuickActionButton
            icon={TrendingUp}
            title="View Reports"
            description="Analyze performance data"
            onClick={() => navigate('/reports')}
            color="orange"
          />
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700">Today's Highlights</h4>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New registrations</span>
              <span className="font-semibold text-blue-600">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Goals completed</span>
              <span className="font-semibold text-green-600">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active sessions</span>
              <span className="font-semibold text-purple-600">156</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700">Wellness Metrics</h4>
            <Heart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Health score</span>
              <span className="font-semibold text-red-500">8.4/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Steps average</span>
              <span className="font-semibold text-blue-600">7,842</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sleep quality</span>
              <span className="font-semibold text-indigo-600">87%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700">Challenge Progress</h4>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fitness challenge</span>
              <span className="font-semibold text-orange-600">67%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mindfulness week</span>
              <span className="font-semibold text-purple-600">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nutrition tracking</span>
              <span className="font-semibold text-green-600">72%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard