import React, { useState, useEffect } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Award,
  Mail,
  Phone
} from 'lucide-react'
import { mockEmployees, departmentStats } from '../data/mockData'
import { 
  formatNumber, 
  formatPercentage, 
  formatDate, 
  generateInitials,
  getEngagementColor,
  filterByQuery,
  sortBy
} from '../utils/helpers'
import Modal, { ConfirmModal, SuccessModal } from '../components/common/Modal'
import toast from 'react-hot-toast'

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or table
  const [loading, setLoading] = useState(true)

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phone: ''
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setEmployees(mockEmployees)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = employees

    // Apply search filter
    if (searchTerm) {
      filtered = filterByQuery(filtered, searchTerm, ['name', 'email', 'department', 'position'])
    }

    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === filterDepartment)
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(emp => emp.status === filterStatus)
    }

    // Apply sorting
    filtered = sortBy(filtered, sortField, sortDirection)

    setFilteredEmployees(filtered)
  }, [employees, searchTerm, filterDepartment, filterStatus, sortField, sortDirection])

  const handleAddEmployee = () => {
    const employee = {
      id: employees.length + 1,
      ...newEmployee,
      joinDate: new Date().toISOString().split('T')[0],
      engagementScore: Math.floor(Math.random() * 40) + 60, // Random 60-100
      totalPoints: Math.floor(Math.random() * 1000) + 500,
      weeklyGoals: 4,
      completedGoals: Math.floor(Math.random() * 4),
      team: 'Unassigned',
      status: 'active',
      lastActive: new Date().toISOString().split('T')[0],
      avatar: null,
      manager: 'Sarah Johnson',
      birthday: '1990-01-01',
      emergencyContact: 'Emergency Contact - (555) 000-0000'
    }

    setEmployees([...employees, employee])
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      position: '',
      phone: ''
    })
    setShowAddModal(false)
    setShowSuccessModal(true)
    toast.success('Employee added successfully!')
  }

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id))
    setShowDeleteModal(false)
    setSelectedEmployee(null)
    toast.success('Employee removed successfully!')
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const EmployeeCard = ({ employee }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {generateInitials(employee.name)}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
            <p className="text-xs text-gray-500">{employee.department}</p>
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
                View Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Edit className="w-4 h-4 mr-2" />
                Edit Employee
              </button>
              <button 
                onClick={() => {
                  setSelectedEmployee(employee)
                  setShowDeleteModal(true)
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-blue-600">{employee.engagementScore}%</p>
          <p className="text-xs text-gray-500">Engagement</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-600">{formatNumber(employee.totalPoints)}</p>
          <p className="text-xs text-gray-500">Points</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Weekly Goals:</span>
          <span className="font-semibold">{employee.completedGoals}/{employee.weeklyGoals}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
            style={{ width: `${(employee.completedGoals / employee.weeklyGoals) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600">Team:</span>
          <span className="ml-2 font-semibold">{employee.team}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600">Last active:</span>
          <span className="ml-2">{formatDate(employee.lastActive)}</span>
        </div>
      </div>
    </div>
  )

  const EmployeeTableRow = ({ employee }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {generateInitials(employee.name)}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">{employee.name}</p>
            <p className="text-sm text-gray-500">{employee.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <p className="text-sm font-medium text-gray-900">{employee.department}</p>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="h-2 rounded-full"
              style={{ 
                width: `${employee.engagementScore}%`,
                backgroundColor: getEngagementColor(employee.engagementScore)
              }}
            />
          </div>
          <span className="text-sm font-semibold">{employee.engagementScore}%</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
        {formatNumber(employee.totalPoints)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {employee.team}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {employee.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 transition">View</button>
          <button className="text-green-600 hover:text-green-800 transition">Edit</button>
          <button 
            onClick={() => {
              setSelectedEmployee(employee)
              setShowDeleteModal(true)
            }}
            className="text-red-600 hover:text-red-800 transition"
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  )

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="bg-gray-200 rounded-xl h-20"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
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
          <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-500">{employees.length} total employees • {filteredEmployees.length} shown</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {departmentStats.map((dept) => (
          <div key={dept.name} className="bg-white rounded-lg shadow-md p-4 text-center">
            <div 
              className="w-8 h-8 rounded-full mx-auto mb-2"
              style={{ backgroundColor: dept.color }}
            />
            <h3 className="font-semibold text-gray-800 text-sm">{dept.name}</h3>
            <p className="text-xl font-bold text-gray-900">{dept.employeeCount}</p>
            <p className="text-xs text-gray-500">{dept.averageEngagement}% engagement</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departmentStats.map(dept => (
                <option key={dept.name} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    Employee
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('department')}
                  >
                    Department & Role
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('engagementScore')}
                  >
                    Engagement
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalPoints')}
                  >
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map(employee => (
                  <EmployeeTableRow key={employee.id} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEmployees.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-500 mb-4">
            {employees.length === 0 
              ? "Get started by adding your first employee." 
              : "Try adjusting your search or filter criteria."
            }
          </p>
          {employees.length === 0 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First Employee
            </button>
          )}
        </div>
      )}

      {/* Add Employee Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Employee"
        size="medium"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="employee@company.com"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select 
                required
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departmentStats.map(dept => (
                  <option key={dept.name} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input 
                type="text" 
                required
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job title"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddEmployee}
              disabled={!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.position}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Employee
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteEmployee}
        title="Remove Employee"
        message={`Are you sure you want to remove "${selectedEmployee?.name}" from the company? This action cannot be undone.`}
        confirmText="Remove"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Employee Added Successfully!"
        message="The new employee has been added to your company and will receive their wellness account details via email."
      />
    </div>
  )
}

export default EmployeesPage