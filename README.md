# 🏢 Wellness Company Panel

A comprehensive company wellness management dashboard built with React, Vite, and Tailwind CSS. This panel allows company administrators to manage employees, create teams, launch wellness challenges, and track engagement metrics.

![Wellness Panel Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Wellness+Company+Panel)

## ✨ Features

### 📊 Dashboard Overview
- Real-time company wellness metrics
- Employee engagement tracking
- Recent activity feed
- Top performers and teams
- Quick action buttons

### 👥 Employee Management
- Add and manage employees
- Track individual performance
- Monitor engagement scores
- Department-wise analytics
- Search and filter capabilities

### 🏆 Team Management
- Create and organize teams
- Assign team captains
- Track team performance
- Team collaboration metrics
- Achievement tracking

### 🎯 Wellness Challenges
- Create custom wellness challenges
- Multiple categories (Fitness, Mental Health, Nutrition, Sleep)
- Track participation and completion rates
- Points-based reward system
- Challenge lifecycle management

### 📈 Analytics & Reports
- Comprehensive performance analytics
- Department-wise reports
- Wellness metrics tracking
- Engagement trends
- Exportable reports

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or create the project:**
```bash
mkdir wellness-company-panel
cd wellness-company-panel
```

2. **Initialize the project:**
```bash
npm create vite@latest . -- --template react
```

3. **Install dependencies:**
```bash
npm install
npm install react-router-dom lucide-react react-hot-toast recharts
npm install -D tailwindcss postcss autoprefixer
```

4. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

5. **Copy the project files:**
   - Copy all the provided source files into their respective directories
   - Update `package.json` with the provided configuration
   - Replace the default files with the provided components

6. **Set up environment variables:**
```bash
cp .env.example .env
```

7. **Start the development server:**
```bash
npm run dev
```

8. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
wellness-company-panel/
├── public/
│   └── wellness-favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx          # Main app layout
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── Header.jsx          # Top header bar
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx       # Dashboard overview
│   │   └── common/
│   │       └── Modal.jsx           # Reusable modal component
│   ├── pages/
│   │   ├── DashboardPage.jsx       # Dashboard page wrapper
│   │   ├── EmployeesPage.jsx       # Employee management
│   │   ├── TeamsPage.jsx           # Team management
│   │   ├── ChallengesPage.jsx      # Wellness challenges
│   │   └── ReportsPage.jsx         # Analytics & reports
│   ├── data/
│   │   └── mockData.js             # Sample data for demo
│   ├── utils/
│   │   └── helpers.js              # Utility functions
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── README.md                       # Project documentation
```

## 🎨 Key Components

### Dashboard Features
- **Company Overview**: Total employees, teams, challenges, and engagement
- **Performance Metrics**: Real-time engagement tracking
- **Activity Feed**: Recent company wellness activities
- **Quick Actions**: Fast access to common tasks

### Employee Management
- **Employee Profiles**: Comprehensive employee information
- **Performance Tracking**: Individual engagement scores and points
- **Department Analytics**: Performance by department
- **Goal Monitoring**: Weekly goal completion tracking

### Team System
- **Team Creation**: Build teams with custom names and descriptions
- **Team Performance**: Track collective engagement and achievements
- **Captain Assignment**: Designate team leaders
- **Achievement System**: Team-based rewards and recognition

### Challenge Platform
- **Multi-Category Challenges**: Fitness, Mental Health, Nutrition, Sleep
- **Flexible Duration**: Custom start and end dates
- **Progress Tracking**: Real-time completion monitoring
- **Points System**: Reward-based participation

## 🛠️ Customization

### Company Branding
Update `src/data/mockData.js` to customize company information:
```javascript
export const companyInfo = {
  name: "Your Company Name",
  logo: "YCN",
  industry: "Your Industry",
  // ... other settings
}
```

### Theme Colors
Modify `tailwind.config.js` to change the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-primary-color',
        // ... other shades
      }
    }
  }
}
```

### Features
Enable/disable features in `.env`:
```bash
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_TEAMS=true
VITE_ENABLE_CHALLENGES=true
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate directories
2. Add routes in `App.jsx`
3. Update navigation in `Sidebar.jsx`
4. Add mock data in `mockData.js`

### API Integration
Replace mock data with real API calls in:
- `src/services/api.js` (create this file)
- Update components to use API instead of mock data

## 🚀 Production Deployment

### Build the Project
```bash
npm run build
```

### Deploy to Hosting Platform
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder
- **AWS S3**: Upload `dist` contents to S3 bucket
- **Docker**: Create Dockerfile for containerized deployment

### Environment Variables for Production
```bash
VITE_API_URL=https://your-api-domain.com/api
VITE_USE_MOCK_AUTH=false
VITE_DEBUG_MODE=false
```

## 📱 Mobile Responsiveness

The panel is fully responsive and includes:
- Mobile-first design approach
- Responsive navigation (hamburger menu on mobile)
- Touch-friendly interface elements
- Optimized layouts for tablet and mobile screens

## 🎯 Use Cases

### Company Administrators
- Monitor overall wellness program effectiveness
- Track employee engagement and participation
- Create and manage wellness initiatives
- Generate reports for stakeholders

### HR Departments
- Manage employee wellness profiles
- Track departmental wellness metrics
- Organize team-building activities
- Monitor program ROI

### Wellness Coordinators
- Design and launch wellness challenges
- Track program participation
- Analyze wellness trends
- Coordinate team activities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the component examples

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Mobile app integration
- [ ] Advanced analytics with charts
- [ ] Integration with fitness trackers
- [ ] Social features and leaderboards
- [ ] Gamification elements
- [ ] Calendar integration
- [ ] Export functionality
- [ ] Multi-language support
- [ ] Dark mode theme

---

**Built with ❤️ for company wellness initiatives**# Nutrithy-Company-Panel
