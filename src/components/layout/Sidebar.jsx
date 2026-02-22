import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiBell,
  FiTarget,
  FiBookmark,
  FiClock,
  FiAward,
  FiShield,
  FiPieChart,
  FiUserCheck,
  FiTool
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ closeSidebar, isMobile }) => {
  const { user, isAdmin, isOrganizer } = useAuth();
  const { animations } = useTheme();
  const location = useLocation();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Dashboard',
        icon: FiHome,
        href: '/dashboard',
        description: 'Overview and quick actions'
      },
      {
        label: 'Festivals',
        icon: FiCalendar,
        href: '/festivals',
        description: 'Browse and explore festivals'
      },
      {
        label: 'Competitions',
        icon: FiAward,
        href: '/competitions',
        description: 'View and join competitions'
      },
      {
        label: 'My Teams',
        icon: FiUsers,
        href: '/teams',
        description: 'Manage team memberships'
      },
      {
        label: 'My Registrations',
        icon: FiBookmark,
        href: '/my-registrations',
        description: 'Track your registrations'
      },
      {
        label: 'Results',
        icon: FiAward,
        href: '/results',
        description: 'View competition results'
      },
      {
        label: 'Schedule',
        icon: FiClock,
        href: '/schedule',
        description: 'Event schedules and timing'
      },
      {
        label: 'Rankings',
        icon: FiBarChart2,
        href: '/rankings',
        description: 'Leaderboards and rankings'
      }
    ];

    const organizerItems = [
      {
        label: 'Create Festival',
        icon: FiCalendar,
        href: '/organizer/festivals/create',
        description: 'Create new festival'
      },
      {
        label: 'Create Competition',
        icon: FiAward,
        href: '/organizer/competitions/create',
        description: 'Add new competition'
      }
    ];

    const adminItems = [
      {
        label: 'User Management',
        icon: FiUserCheck,
        href: '/admin/users',
        description: 'Manage users and roles'
      },
      {
        label: 'Festival Management',
        icon: FiCalendar,
        href: '/admin/festivals',
        description: 'Oversee all festivals'
      },
      {
        label: 'Analytics',
        icon: FiPieChart,
        href: '/admin/analytics',
        description: 'System analytics and insights'
      },
      {
        label: 'Resource Management',
        icon: FiTool,
        href: '/admin/resources',
        description: 'Manage system resources'
      },
      {
        label: 'Reports',
        icon: FiBarChart2,
        href: '/admin/reports',
        description: 'Generate system reports'
      }
    ];

    let items = [...baseItems];
    
    if (isOrganizer() && !isAdmin()) {
      // Add organizer-specific items after dashboard
      items = [baseItems[0], ...organizerItems, ...baseItems.slice(1)];
    } else if (isAdmin()) {
      // Add admin-specific items after dashboard
      items = [baseItems[0], ...adminItems, ...organizerItems, ...baseItems.slice(1)];
    }

    // Add bottom items
    items.push({
      label: 'Notifications',
      icon: FiBell,
      href: '/notifications',
      description: 'Your notifications'
    });

    return items;
  };

  const navigationItems = getNavigationItems();

  const isActive = (href) => {
    return location.pathname === href || 
           (href !== '/dashboard' && location.pathname.startsWith(href));
  };

  const handleLinkClick = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* User info section */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.full_name || user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item, index) => {
          const isItemActive = isActive(item.href);
          
          return (
            <motion.div
              key={item.href}
              initial={animations ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: animations ? 0.2 : 0, 
                delay: animations ? index * 0.05 : 0 
              }}
            >
              <Link
                to={item.href}
                onClick={handleLinkClick}
                className={`
                  group relative flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200
                  ${isItemActive 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                  }
                `}
                title={item.description}
              >
                {/* Icon */}
                <item.icon 
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isItemActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`} 
                />
                
                {/* Label */}
                <span className="text-sm truncate">
                  {item.label}
                </span>

                {/* Badge */}
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Active indicator */}
                {isItemActive && (
                  <motion.div
                    layoutId="sidebar-active-item"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-lg"
                    transition={{ duration: animations ? 0.2 : 0 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <Link
          to="/profile"
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors"
        >
          <FiUser className="w-5 h-5" />
          Profile & Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;