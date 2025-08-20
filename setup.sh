#!/bin/bash

# Company Wellness Panel Setup Script
echo "🏢 Setting up Wellness Company Panel..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Create project directory
PROJECT_NAME="wellness-company-panel"
if [ ! -d "$PROJECT_NAME" ]; then
    echo "📁 Creating project directory..."
    mkdir "$PROJECT_NAME"
fi

cd "$PROJECT_NAME"

# Initialize Vite React project
echo "⚡ Initializing Vite React project..."
npm create vite@latest . -- --template react --yes

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional packages
echo "📦 Installing additional packages..."
npm install react-router-dom lucide-react react-hot-toast recharts

# Install dev dependencies
echo "🔧 Installing dev dependencies..."
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
echo "🎨 Initializing Tailwind CSS..."
npx tailwindcss init -p

# Create environment file
echo "⚙️ Creating environment file..."
if [ ! -f ".env" ]; then
    cp .env.example .env 2>/dev/null || echo "VITE_USE_MOCK_AUTH=true" > .env
fi

# Set up directory structure
echo "📂 Setting up directory structure..."
mkdir -p src/components/layout
mkdir -p src/components/dashboard
mkdir -p src/components/common
mkdir -p src/pages
mkdir -p src/data
mkdir -p src/utils

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Copy the provided source files to their respective directories"
echo "2. Update the configuration files with the provided content"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📖 For detailed instructions, check the README.md file"
echo ""
echo "Happy coding! 🎉"