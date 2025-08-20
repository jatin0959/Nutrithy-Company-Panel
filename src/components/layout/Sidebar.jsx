import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  Trophy, 
  Target, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react'
import { companyInfo } from '../../data/mockData'

const Sidebar = ({ collapsed, mobileMenuOpen, onToggleCollapse, onCloseMobileMenu }) => {
  const location = useLocation()

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3, 
      path: '/dashboard',
      description: 'Overview & Analytics'
    },
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: Users, 
      path: '/employees',
      description: 'Manage Team Members'
    },
    { 
      id: 'teams', 
      label: 'Teams', 
      icon: Trophy, 
      path: '/teams',
      description: 'Team Management'
    },
    { 
      id: 'challenges', 
      label: 'Challenges', 
      icon: Target, 
      path: '/challenges',
      description: 'Wellness Challenges'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: TrendingUp, 
      path: '/reports',
      description: 'Analytics & Insights'
    }
  ]

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.path
    const Icon = item.icon

    return (
      <NavLink
        to={item.path}
        onClick={onCloseMobileMenu}
        className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-2 ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        } ${collapsed ? 'justify-center' : ''}`}
      >
        <Icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'} ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
        } transition-colors flex-shrink-0`} />
        
        {!collapsed && (
          <div className="ml-3 flex-1">
            <span className="block font-medium">{item.label}</span>
            <span className={`block text-xs ${
              isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-500'
            }`}>
              {item.description}
            </span>
          </div>
        )}
      </NavLink>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Company Logo & Info */}
      <div className={`p-6 border-b border-gray-200 ${collapsed ? 'p-4' : ''}`}>
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {companyInfo.logo}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {companyInfo.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-gray-900 text-lg truncate">
                {companyInfo.name}
              </h1>
              <p className="text-sm text-gray-500 truncate">
                Wellness Dashboard
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Company Stats (when not collapsed) */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Company Stats</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Employees:</span>
                <span className="font-semibold text-gray-900">{companyInfo.totalEmployees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teams:</span>
                <span className="font-semibold text-gray-900">{companyInfo.totalTeams}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-semibold text-green-600">{companyInfo.overallEngagement}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200 hidden lg:block">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2 text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 z-30 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } bg-white border-r border-gray-200 shadow-lg`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>
    </>
  )
}

export default Sidebar