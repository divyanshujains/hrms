import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  FileText,
  UserCircle
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const adminLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'Leaves', path: '/leaves', icon: FileText },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'My Leaves', path: '/leaves', icon: FileText },
    { name: 'Profile', path: '/profile', icon: UserCircle },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full hidden sm:flex flex-col shadow-sm">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600 tracking-tight">HRMS</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
