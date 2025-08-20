import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download,
  Calendar,
  Filter,
  Users,
  Target,
  Award,
  Activity,
  Heart,
  Zap,
  Clock,
  Star
} from 'lucide-react'
import { 
  companyInfo, 
  mockEmployees, 
  mockTeams, 
  mockChallenges, 
  departmentStats,
  recentActivities
} from '../data/mockData'
import { 
  formatNumber, 
  formatPercentage, 
  formatDate,
  groupBy
} from '../utils/helpers'

const ReportsPage = () => {
  const [loading, setLoading] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState('30')
  const [selectedMetric, setSelectedMetric] = useState('engagement')
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      const mockAnalytics = {
        overview: {
          totalEmployees: companyInfo.totalEmployees,
          activeUsers: companyInfo.activeEmployees,
          overallEngagement: companyInfo.overallEngagement,
          totalPoints: mockEmployees.reduce((sum, emp) => sum + emp.totalPoints, 0),
          goalsCompleted: mockEmployees.reduce((sum, emp) => sum + emp.completedGoals, 0),
          activeChallenges: mockChallenges.filter(c => c.status === 'active').length
        },
        engagement: {
          daily: [85, 87, 89, 88, 90, 86, 88],
          weekly: [86, 88, 87, 89, 88, 90, 87, 89],
          byDepartment: departmentStats
        },
        wellness: {
          healthScore: 8.4,
          stepsAverage: 7842,
          sleepQuality: 87,
          stressLevel: 3.2,
          workLifeBalance: 7.8
        },
        challenges: {
          active: mockChallenges.filter(c => c.status === 'active').length,
          completed: mockChallenges.filter(c => c.status === 'completed').length,
          avgCompletion: Math.round(
            mockChallenges.reduce((sum, c) => sum + c.completionRate, 0) / mockChallenges.length
          ),
          totalParticipants: mockChallenges.reduce((sum, c) => sum + c.participants, 0)
        },
        teams: {
          total: mockTeams.length,
          avgSize: Math.round(mockTeams.reduce((sum, t) => sum + t.members, 0) / mockTeams.length),
          topPerforming: mockTeams.sort((a, b) => b.averageEngagement - a.averageEngagement).slice(0, 3),
          collaboration: 89
        }
      }
      setAnalytics(mockAnalytics)
      setLoading(false)
    }, 1000)
  }, [selectedDateRange])

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className="w-5 h-5" style={{ color }} />
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend.direction === 'down' ? 'rotate-180' : ''}`} />
              <span>{trend.value} vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const EngagementChart = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Engagement Trends</h3>
        <select 
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>
      
      {/* Simple Bar Chart Representation */}
      <div className="space-y-4">
        {analytics.engagement?.daily?.map((value, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-16">Day {index + 1}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-800 w-12">{value}%</span>
          </div>
        )) || [...Array(7)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded h-6 animate-pulse"></div>
        ))}
      </div>
    </div>
  )

  const DepartmentPerformance = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Department Performance</h3>
      <div className="space-y-4">
        {analytics.engagement?.byDepartment?.map((dept) => (
          <div key={dept.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: dept.color }}
              />
              <span className="text-gray-700 font-medium">{dept.name}</span>
              <span className="text-sm text-gray-500">({dept.employeeCount} employees)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${dept.averageEngagement}%`,
                    backgroundColor: dept.color
                  }}
                />
              </div>
              <span className="font-semibold text-sm w-12">{dept.averageEngagement}%</span>
            </div>
          </div>
        )) || [...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded h-8 animate-pulse"></div>
        ))}
      </div>
    </div>
  )

  const WellnessMetrics = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Wellness Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">Health Score</span>
            </div>
            <span className="text-xl font-bold text-red-500">
              {analytics.wellness?.healthScore}/10
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Daily Steps</span>
            </div>
            <span className="text-xl font-bold text-blue-500">
              {formatNumber(analytics.wellness?.stepsAverage)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700">Sleep Quality</span>
            </div>
            <span className="text-xl font-bold text-purple-500">
              {analytics.wellness?.sleepQuality}%
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{analytics.wellness?.workLifeBalance}/10</p>
            <p className="text-sm text-gray-600">Work-Life Balance</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-red-50 rounded-lg">
            <Heart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{analytics.wellness?.stressLevel}/10</p>
            <p className="text-sm text-gray-600">Stress Level</p>
          </div>
        </div>
      </div>
    </div>
  )

  const TopPerformers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Top Performing Teams</h3>
      <div className="space-y-4">
        {analytics.teams?.topPerforming?.map((team, index) => (
          <div key={team.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
            }`}>
              {index + 1}
            </div>
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: team.color }}
            >
              <Star className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{team.name}</p>
              <p className="text-sm text-gray-500">{team.members} members • {team.department}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg" style={{ color: team.color }}>
                {team.averageEngagement}%
              </p>
              <p className="text-xs text-gray-500">engagement</p>
            </div>
          </div>
        )) || [...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-16 animate-pulse"></div>
        ))}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-200 rounded-xl h-64"></div>
          <div className="bg-gray-200 rounded-xl h-64"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-500">Track your company's wellness performance and insights</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          title="Active Users"
          value={formatNumber(analytics.overview?.activeUsers)}
          subtitle={`${analytics.overview?.totalEmployees} total employees`}
          trend={{ direction: 'up', value: '+5%' }}
          color="#3B82F6"
        />
        <MetricCard
          icon={TrendingUp}
          title="Overall Engagement"
          value={formatPercentage(analytics.overview?.overallEngagement)}
          subtitle="Company average"
          trend={{ direction: 'up', value: '+3%' }}
          color="#10B981"
        />
        <MetricCard
          icon={Target}
          title="Goals Completed"
          value={formatNumber(analytics.overview?.goalsCompleted)}
          subtitle="This month"
          trend={{ direction: 'up', value: '+12%' }}
          color="#8B5CF6"
        />
        <MetricCard
          icon={Award}
          title="Total Points"
          value={formatNumber(analytics.overview?.totalPoints)}
          subtitle="All time earned"
          trend={{ direction: 'up', value: '+8%' }}
          color="#F59E0B"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart />
        <DepartmentPerformance />
      </div>

      {/* Wellness and Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WellnessMetrics />
        <TopPerformers />
      </div>

      {/* Challenge Analytics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Challenge Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{analytics.challenges?.active}</p>
            <p className="text-sm text-gray-600">Active Challenges</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{analytics.challenges?.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{formatNumber(analytics.challenges?.totalParticipants)}</p>
            <p className="text-sm text-gray-600">Total Participants</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{analytics.challenges?.avgCompletion}%</p>
            <p className="text-sm text-gray-600">Avg Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Team Collaboration */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Team Collaboration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-600">{analytics.teams?.total}</p>
            <p className="text-sm text-gray-600">Active Teams</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <Star className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-600">{analytics.teams?.avgSize}</p>
            <p className="text-sm text-gray-600">Average Team Size</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <Heart className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-600">{analytics.teams?.collaboration}%</p>
            <p className="text-sm text-gray-600">Collaboration Score</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Challenges Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {recentActivities.filter(a => a.type === 'challenge_completed').length}
            </p>
            <p className="text-xs text-green-600">Last 7 days</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">New Members</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {recentActivities.filter(a => a.type === 'team_joined').length}
            </p>
            <p className="text-xs text-blue-600">Last 7 days</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Milestones</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {recentActivities.filter(a => a.type === 'milestone_reached').length}
            </p>
            <p className="text-xs text-purple-600">Last 7 days</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Goals Achieved</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {recentActivities.filter(a => a.type === 'goal_completed').length}
            </p>
            <p className="text-xs text-orange-600">Last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage