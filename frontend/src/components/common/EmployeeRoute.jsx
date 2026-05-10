import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loader from './Loader';

const EmployeeRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return user && user.role === 'employee' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default EmployeeRoute;
