import { 
  Dumbbell, 
  Brain, 
  Apple, 
  Moon, 
  Heart, 
  Zap 
} from 'lucide-react'

// Company Information
export const companyInfo = {
  name: "TechCorp Solutions",
  logo: "TC",
  plan: "Enterprise",
  industry: "Technology",
  totalEmployees: 245,
  activeEmployees: 189,
  totalTeams: 12,
  activeChallenges: 8,
  overallEngagement: 87,
  establishedYear: "2019",
  location: "San Francisco, CA"
}

// Mock Employees Data
export const mockEmployees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2023-01-15",
    engagementScore: 95,
    totalPoints: 2450,
    weeklyGoals: 4,
    completedGoals: 3,
    team: "Alpha Warriors",
    status: "active",
    lastActive: "2024-08-20",
    avatar: null,
    phone: "+1 (555) 123-4567",
    manager: "Mike Davis",
    birthday: "1990-03-15",
    emergencyContact: "Jane Smith - (555) 987-6543"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    department: "Human Resources",
    position: "HR Manager",
    joinDate: "2022-11-08",
    engagementScore: 92,
    totalPoints: 2100,
    weeklyGoals: 5,
    completedGoals: 5,
    team: "Beta Squad",
    status: "active",
    lastActive: "2024-08-20",
    avatar: null,
    phone: "+1 (555) 234-5678",
    manager: "Emily Brown",
    birthday: "1988-07-22",
    emergencyContact: "Mark Johnson - (555) 876-5432"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@techcorp.com",
    department: "Engineering",
    position: "Tech Lead",
    joinDate: "2023-03-22",
    engagementScore: 88,
    totalPoints: 2300,
    weeklyGoals: 4,
    completedGoals: 2,
    team: "Alpha Warriors",
    status: "active",
    lastActive: "2024-08-19",
    avatar: null,
    phone: "+1 (555) 345-6789",
    manager: "John Smith",
    birthday: "1985-12-10",
    emergencyContact: "Lisa Davis - (555) 765-4321"
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@techcorp.com",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2023-07-10",
    engagementScore: 78,
    totalPoints: 1950,
    weeklyGoals: 3,
    completedGoals: 2,
    team: "Gamma Force",
    status: "active",
    lastActive: "2024-08-18",
    avatar: null,
    phone: "+1 (555) 456-7890",
    manager: "Sarah Johnson",
    birthday: "1992-05-18",
    emergencyContact: "David Brown - (555) 654-3210"
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex.chen@techcorp.com",
    department: "Design",
    position: "UX Designer",
    joinDate: "2023-09-01",
    engagementScore: 85,
    totalPoints: 1750,
    weeklyGoals: 4,
    completedGoals: 3,
    team: "Creative Force",
    status: "active",
    lastActive: "2024-08-20",
    avatar: null,
    phone: "+1 (555) 567-8901",
    manager: "Emily Brown",
    birthday: "1991-09-25",
    emergencyContact: "Maria Chen - (555) 543-2109"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@techcorp.com",
    department: "Sales",
    position: "Sales Manager",
    joinDate: "2022-06-15",
    engagementScore: 90,
    totalPoints: 2200,
    weeklyGoals: 5,
    completedGoals: 4,
    team: "Sales Stars",
    status: "active",
    lastActive: "2024-08-19",
    avatar: null,
    phone: "+1 (555) 678-9012",
    manager: "Sarah Johnson",
    birthday: "1987-11-30",
    emergencyContact: "Anna Wilson - (555) 432-1098"
  }
]

// Mock Teams Data
export const mockTeams = [
  {
    id: 1,
    name: "Alpha Warriors",
    description: "Engineering excellence team focused on innovation",
    captain: "John Smith",
    members: 8,
    totalPoints: 12450,
    averageEngagement: 91,
    activeChallenges: 3,
    created: "2024-01-15",
    color: "#3B82F6",
    department: "Engineering",
    membersList: [1, 3, 5],
    achievements: ["Best Team Q1 2024", "Innovation Award", "100% Challenge Completion"]
  },
  {
    id: 2,
    name: "Beta Squad",
    description: "Cross-functional collaboration champions",
    captain: "Sarah Johnson",
    members: 6,
    totalPoints: 9800,
    averageEngagement: 88,
    activeChallenges: 2,
    created: "2024-02-01",
    color: "#10B981",
    department: "Mixed",
    membersList: [2, 6],
    achievements: ["Collaboration Award", "Wellness Champions", "Team Spirit Award"]
  },
  {
    id: 3,
    name: "Gamma Force",
    description: "Marketing and creative powerhouse",
    captain: "Emily Brown",
    members: 5,
    totalPoints: 7650,
    averageEngagement: 82,
    activeChallenges: 2,
    created: "2024-02-15",
    color: "#8B5CF6",
    department: "Marketing",
    membersList: [4],
    achievements: ["Creative Excellence", "Brand Ambassadors"]
  },
  {
    id: 4,
    name: "Creative Force",
    description: "Design thinking and user experience team",
    captain: "Alex Chen",
    members: 4,
    totalPoints: 6200,
    averageEngagement: 86,
    activeChallenges: 2,
    created: "2024-03-01",
    color: "#F59E0B",
    department: "Design",
    membersList: [5],
    achievements: ["Design Excellence", "User Focus Award"]
  },
  {
    id: 5,
    name: "Sales Stars",
    description: "Revenue driving and customer success team",
    captain: "James Wilson",
    members: 6,
    totalPoints: 8900,
    averageEngagement: 89,
    activeChallenges: 3,
    created: "2024-01-20",
    color: "#EF4444",
    department: "Sales",
    membersList: [6],
    achievements: ["Top Revenue Team", "Customer Success Champions"]
  }
]

// Mock Challenges Data
export const mockChallenges = [
  {
    id: 1,
    title: "30-Day Fitness Challenge",
    description: "Complete 30 minutes of exercise daily for 30 days. Track your workouts and stay consistent!",
    category: "Fitness",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    participants: 156,
    completionRate: 67,
    points: 500,
    status: "active",
    icon: Dumbbell,
    color: "#EF4444",
    difficulty: "Medium",
    requirements: ["Log daily exercise", "Minimum 30 minutes", "Photo proof"],
    rewards: ["500 points", "Fitness tracker", "Gym membership discount"]
  },
  {
    id: 2,
    title: "Mindfulness Week",
    description: "Practice meditation for 10 minutes daily to improve mental wellness and reduce stress",
    category: "Mental Health",
    startDate: "2024-08-15",
    endDate: "2024-08-22",
    participants: 89,
    completionRate: 78,
    points: 300,
    status: "active",
    icon: Brain,
    color: "#8B5CF6",
    difficulty: "Easy",
    requirements: ["Daily meditation", "Use mindfulness app", "Weekly reflection"],
    rewards: ["300 points", "Meditation app subscription", "Wellness books"]
  },
  {
    id: 3,
    title: "Healthy Eating Challenge",
    description: "Log healthy meals and track nutrition for better eating habits and overall health",
    category: "Nutrition",
    startDate: "2024-08-10",
    endDate: "2024-09-10",
    participants: 134,
    completionRate: 72,
    points: 400,
    status: "active",
    icon: Apple,
    color: "#10B981",
    difficulty: "Medium",
    requirements: ["Log all meals", "Include vegetables daily", "Limit processed foods"],
    rewards: ["400 points", "Nutrition consultation", "Healthy recipe book"]
  },
  {
    id: 4,
    title: "Sleep Quality Challenge",
    description: "Maintain 7-8 hours of sleep daily and improve sleep hygiene for better rest",
    category: "Sleep",
    startDate: "2024-07-15",
    endDate: "2024-08-15",
    participants: 78,
    completionRate: 84,
    points: 350,
    status: "completed",
    icon: Moon,
    color: "#6366F1",
    difficulty: "Easy",
    requirements: ["7-8 hours sleep", "Consistent bedtime", "No screens 1hr before bed"],
    rewards: ["350 points", "Sleep mask & pillow", "Sleep tracking device"]
  },
  {
    id: 5,
    title: "Hydration Heroes",
    description: "Drink 8 glasses of water daily to stay properly hydrated and healthy",
    category: "Wellness",
    startDate: "2024-08-20",
    endDate: "2024-09-20",
    participants: 92,
    completionRate: 0,
    points: 250,
    status: "upcoming",
    icon: Heart,
    color: "#06B6D4",
    difficulty: "Easy",
    requirements: ["8 glasses daily", "Track water intake", "Use company water bottle"],
    rewards: ["250 points", "Smart water bottle", "Hydration reminder app"]
  },
  {
    id: 6,
    title: "Step It Up Challenge",
    description: "Walk 10,000 steps daily to improve cardiovascular health and energy levels",
    category: "Fitness",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    participants: 0,
    completionRate: 0,
    points: 600,
    status: "upcoming",
    icon: Zap,
    color: "#F97316",
    difficulty: "Hard",
    requirements: ["10,000 steps daily", "Use step tracker", "Weekly progress photos"],
    rewards: ["600 points", "Fitness tracker upgrade", "Walking shoes voucher"]
  }
]

// Recent Activities
export const recentActivities = [
  {
    id: 1,
    type: "challenge_completed",
    title: "Challenge Completed",
    description: "John Smith completed the 30-Day Fitness Challenge",
    user: "John Smith",
    timestamp: "2024-08-20T10:30:00Z",
    points: 500,
    challenge: "30-Day Fitness Challenge"
  },
  {
    id: 2,
    type: "team_joined",
    title: "New Team Member",
    description: "Alex Chen joined Creative Force team",
    user: "Alex Chen",
    timestamp: "2024-08-20T08:15:00Z",
    team: "Creative Force"
  },
  {
    id: 3,
    type: "milestone_reached",
    title: "Team Achievement",
    description: "Beta Squad reached 10,000 points milestone",
    team: "Beta Squad",
    timestamp: "2024-08-19T16:45:00Z",
    points: 10000
  },
  {
    id: 4,
    type: "goal_completed",
    title: "Weekly Goal Achieved",
    description: "Sarah Johnson completed all 5 weekly wellness goals",
    user: "Sarah Johnson",
    timestamp: "2024-08-19T14:20:00Z",
    goals: 5
  },
  {
    id: 5,
    type: "challenge_started",
    title: "New Challenge Started",
    description: "Emily Brown started the Mindfulness Week challenge",
    user: "Emily Brown",
    timestamp: "2024-08-19T09:10:00Z",
    challenge: "Mindfulness Week"
  }
]

// Department Statistics
export const departmentStats = [
  {
    name: "Engineering",
    employeeCount: 85,
    averageEngagement: 89,
    totalPoints: 45200,
    activeTeams: 3,
    color: "#3B82F6"
  },
  {
    name: "Marketing",
    employeeCount: 32,
    averageEngagement: 82,
    totalPoints: 18900,
    activeTeams: 2,
    color: "#10B981"
  },
  {
    name: "Sales",
    employeeCount: 45,
    averageEngagement: 88,
    totalPoints: 28700,
    activeTeams: 2,
    color: "#EF4444"
  },
  {
    name: "Human Resources",
    employeeCount: 18,
    averageEngagement: 94,
    totalPoints: 12400,
    activeTeams: 1,
    color: "#8B5CF6"
  },
  {
    name: "Design",
    employeeCount: 24,
    averageEngagement: 86,
    totalPoints: 15800,
    activeTeams: 1,
    color: "#F59E0B"
  },
  {
    name: "Operations",
    employeeCount: 41,
    averageEngagement: 81,
    totalPoints: 22100,
    activeTeams: 3,
    color: "#06B6D4"
  }
]

// Wellness Categories
export const wellnessCategories = [
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "#EF4444",
    description: "Physical exercise and activity challenges"
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: Brain,
    color: "#8B5CF6",
    description: "Mindfulness, meditation, and mental wellness"
  },
  {
    id: "nutrition",
    name: "Nutrition",
    icon: Apple,
    color: "#10B981",
    description: "Healthy eating and nutrition tracking"
  },
  {
    id: "sleep",
    name: "Sleep",
    icon: Moon,
    color: "#6366F1",
    description: "Sleep quality and sleep hygiene challenges"
  },
  {
    id: "wellness",
    name: "General Wellness",
    icon: Heart,
    color: "#06B6D4",
    description: "Overall health and wellness activities"
  }
]