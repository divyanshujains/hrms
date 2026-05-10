import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.user?.name || '',
        email: employee.user?.email || '',
        role: employee.user?.role || 'employee',
        employeeCode: employee.employeeCode || '',
        department: employee.department || '',
        designation: employee.designation || '',
        salary: employee.salary || '',
        joiningDate: employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '',
        phone: employee.phone || '',
        address: employee.address || '',
      });
    } else {
      reset({});
    }
  }, [employee, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="relative inline-block w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input {...register('name', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              {!employee && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" {...register('email', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" {...register('password', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Code</label>
                <input {...register('employeeCode', { required: true })} disabled={!!employee} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input {...register('department', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input {...register('designation', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input type="number" {...register('salary', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                <input type="date" {...register('joiningDate', { required: true })} disabled={!!employee} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input {...register('phone', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select {...register('role', { required: true })} disabled={!!employee} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100">
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea {...register('address', { required: true })} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
