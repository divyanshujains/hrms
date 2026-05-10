import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { Users, UserCheck, UserX, FileText, CheckCircle, XCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-full ${colorClass}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-500">Overview of today's attendance and leave requests.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Employees" value={stats?.totalEmployees || 0} icon={Users} colorClass="bg-blue-100 text-blue-600" />
          <StatCard title="Present Today" value={stats?.presentToday || 0} icon={UserCheck} colorClass="bg-green-100 text-green-600" />
          <StatCard title="Absent Today" value={stats?.absentToday || 0} icon={UserX} colorClass="bg-red-100 text-red-600" />
          <StatCard title="Pending Leaves" value={stats?.pendingLeaves || 0} icon={FileText} colorClass="bg-yellow-100 text-yellow-600" />
          <StatCard title="Approved Leaves" value={stats?.approvedLeaves || 0} icon={CheckCircle} colorClass="bg-emerald-100 text-emerald-600" />
          <StatCard title="Rejected Leaves" value={stats?.rejectedLeaves || 0} icon={XCircle} colorClass="bg-gray-100 text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h2>
        <p className="text-gray-500">Here's your attendance and leave summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Days Present" value={stats?.attendanceSummary?.present || 0} icon={UserCheck} colorClass="bg-green-100 text-green-600" />
        <StatCard title="Days Absent" value={stats?.attendanceSummary?.absent || 0} icon={UserX} colorClass="bg-red-100 text-red-600" />
        <StatCard title="Leave Balance" value={stats?.leaveSummary?.balance || 0} icon={FileText} colorClass="bg-blue-100 text-blue-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Attendance</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {stats?.recentAttendance?.length > 0 ? (
            stats.recentAttendance.map((record) => (
              <div key={record._id} className="px-6 py-4 flex justify-between items-center">
                <span className="text-gray-600">{new Date(record.date).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === 'Present' ? 'bg-green-100 text-green-700' :
                  record.status === 'Absent' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {record.status}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">No recent attendance records</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
