import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
