# Micro-Match Marketplace

A modern, full-stack marketplace platform that connects students, labs, and startups with skilled contributors for short and long-term projects. Built with Next.js, TypeScript, TailwindCSS, and shadcn/ui components.

## 🚀 Features

### Core Functionality
- **Role-based Authentication**: Client, Contributor, and Admin roles with distinct dashboards
- **Project Marketplace**: Browse, filter, and search projects by skills, budget, and timeline
- **Bidding System**: Submit competitive bids with proposals and pricing
- **Project Management**: Track milestones, deliverables, and project progress
- **Real-time Messaging**: Built-in communication system for project collaboration
- **Notification System**: Stay updated with bid status, milestones, and messages
- **Admin Panel**: User management, dispute resolution, and platform analytics

### User Roles

#### 👥 Clients
- Post projects with detailed requirements and budgets
- Review and accept/reject contributor bids
- Manage project milestones and deliverables
- Rate completed work and provide feedback

#### 💼 Contributors
- Browse available projects matching their skills
- Submit competitive bids with proposals
- Manage accepted assignments and deliverables
- Build reputation through quality work

#### 🛡️ Admins
- Manage user accounts and platform moderation
- Resolve disputes and maintain platform integrity
- View analytics and platform performance metrics
- Oversee project quality and user interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks
- **Form Handling**: React forms with validation

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── dashboard/                # Dashboard pages
│   │   ├── client/              # Client-specific pages
│   │   ├── contributor/         # Contributor-specific pages
│   │   └── admin/               # Admin-specific pages
│   ├── login/                   # Authentication pages
│   ├── signup/
│   ├── projects/                # Project marketplace
│   └── page.tsx                 # Landing page
├── components/
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── main-layout.tsx
│   └── ui/                      # Reusable UI components
│       ├── project-card.tsx
│       ├── bid-card.tsx
│       ├── notification-dropdown.tsx
│       ├── message-thread.tsx
│       └── ... (shadcn/ui components)
└── lib/
    └── utils.ts                 # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #111827 (Dark Gray)
- **Background**: #F9FAFB (Light Gray)
- **Accent**: #10B981 (Green)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Error**: #EF4444 (Red)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive**: Mobile-first design approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-match-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with call-to-action
- Feature highlights and benefits
- How it works for both clients and contributors
- Statistics and testimonials
- Responsive design for all devices

### Authentication (`/login`, `/signup`)
- Role selection during signup
- Social login options (Google, Facebook)
- Form validation and error handling
- Responsive design

### Project Marketplace (`/projects`)
- Project feed with filtering and search
- Skills-based filtering
- Budget range filtering
- Project type filtering (short/long term)
- Sort by various criteria
- Responsive grid layout

### Client Dashboard (`/dashboard/client`)
- **Post Project** (`/post`): Create new projects with requirements
- **Manage Bids** (`/bids`): Review and accept/reject bids
- **Project Management**: Track milestones and deliverables
- **Analytics**: View project statistics and spending

### Contributor Dashboard (`/dashboard/contributor`)
- **Browse Projects** (`/browse`): Find projects matching skills
- **Submit Bids**: Competitive bidding with proposals
- **Manage Assignments**: Track accepted projects
- **Portfolio**: Showcase completed work and ratings

### Admin Panel (`/dashboard/admin`)
- **User Management**: Manage user accounts and permissions
- **Project Moderation**: Review and moderate projects
- **Dispute Resolution**: Handle conflicts and issues
- **Analytics**: Platform performance and metrics

## 🧩 Components

### Reusable Components

#### ProjectCard
- Displays project information
- Shows client details and ratings
- Budget and timeline information
- Skills tags and bid count
- Action buttons for bidding

#### BidCard
- Contributor information and ratings
- Bid amount and timeline
- Proposal text
- Status indicators
- Accept/reject actions

#### NotificationDropdown
- Real-time notifications
- Different notification types
- Mark as read functionality
- Timestamp display

#### MessageThread
- Real-time messaging interface
- File attachment support
- Message history
- User avatars and timestamps

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your API keys and database URLs here
```

### TailwindCSS Configuration
The project uses TailwindCSS v4 with custom color variables defined in `globals.css`.

### shadcn/ui Components
Components are configured in `components.json` and can be added using:
```bash
npx shadcn@latest add [component-name]
```

## 🎯 Key Features Implemented

✅ **Complete UI/UX Design**
- Modern, responsive design
- Consistent component library
- Mobile-first approach
- Accessibility considerations

✅ **Role-based Dashboards**
- Client dashboard with project management
- Contributor dashboard with bidding system
- Admin panel with platform management

✅ **Project Marketplace**
- Advanced filtering and search
- Project cards with detailed information
- Bid submission and management
- Status tracking

✅ **Authentication System**
- Role selection during signup
- Social login integration ready
- Form validation and error handling

✅ **Reusable Components**
- Modular component architecture
- Consistent design patterns
- Easy to maintain and extend

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real APIs and databases
- **Real-time Features**: WebSocket integration for live updates
- **Payment Processing**: Stripe integration for transactions
- **File Upload**: Project attachments and deliverables
- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native mobile application
- **AI Matching**: Smart project-contributor matching
- **Video Calls**: Integrated video communication
- **Escrow System**: Secure payment handling
- **Multi-language**: Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library

---

Built with ❤️ using modern web technologies. Ready for production deployment and backend integration.