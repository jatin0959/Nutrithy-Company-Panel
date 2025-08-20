import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User,
  ChevronDown,
  Filter,
  Download,
  Plus
} from 'lucide-react'
import { companyInfo, recentActivities } from '../../data/mockData'
import { getRelativeTime } from '../../utils/helpers'

const Header = ({ onToggleSidebar, onToggleMobileMenu, sidebarCollapsed }) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Get page title based on current route
  const getPageTitle = () => {
    const routes = {
      '/dashboard': 'Dashboard',
      '/employees': 'Employees',
      '/teams': 'Teams', 
      '/challenges': 'Challenges',
      '/reports': 'Reports'
    }
    return routes[location.pathname] || 'Dashboard'
  }

  const getPageDescription = () => {
    const descriptions = {
      '/dashboard': 'Welcome back! Here\'s your wellness overview',
      '/employees': 'Manage your team members and track their wellness journey',
      '/teams': 'Organize teams and boost collaboration',
      '/challenges': 'Create and manage wellness challenges',
      '/reports': 'Analyze wellness data and generate insights'
    }
    return descriptions[location.pathname] || 'Manage your company wellness program'
  }

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: 'Sarah Johnson',
    role: 'Wellness Admin',
    email: 'sarah.johnson@techcorp.com',
    avatar: null
  }

  // Get recent notifications from activities
  const notifications = recentActivities.slice(0, 5).map(activity => ({
    id: activity.id,
    title: activity.title,
    message: activity.description,
    time: getRelativeTime(activity.timestamp),
    unread: Math.random() > 0.5 // Random unread status for demo
  }))

  const unreadCount = notifications.filter(n => n.unread).length

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Implement search functionality
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page Title & Description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500 mt-1">{getPageDescription()}</p>
            </div>
          </div>

          {/* Center Section - Search (Hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search employees, teams, challenges..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Quick Actions (Hidden on small screens) */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Company Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <span className="w-4 h-4 mr-3">🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}

export default Header