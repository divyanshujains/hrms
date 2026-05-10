import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-primary-600 sm:hidden">HRMS</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="h-8 w-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
            <UserIcon size={18} />
          </div>
          <span className="font-medium hidden sm:block">{user?.name}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize hidden sm:block">
            {user?.role}
          </span>
        </div>
        
        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
