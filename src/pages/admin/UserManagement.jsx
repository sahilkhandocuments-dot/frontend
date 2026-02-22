import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiUserCheck, 
  FiUserX,
  FiMail,
  FiCalendar,
  FiEye,
  FiMoreVertical,
  FiDownload,
  FiRefreshCw,
  FiX,
  FiCheck,
  FiAlertTriangle
} from 'react-icons/fi';
import { mockUsers } from '../../data/mockData';
import Layout from '../../components/layout/Layout';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Use mock users
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users.filter(user => {
      const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || (
        filterStatus === 'active' ? user.is_active : !user.is_active
      );
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    setFilteredUsers(filtered);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateUser = async (userId, updates) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: true }));
      await adminAPI.updateUser(userId, updates);
      await fetchUsers();
      showNotification('User updated successfully');
      setShowUserModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification(error.response?.data?.detail || 'Failed to update user', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, [userId]: true }));
      await adminAPI.deleteUser(userId);
      await fetchUsers();
      showNotification('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification(error.response?.data?.detail || 'Failed to delete user', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const response = await adminAPI.getUserDetails(userId);
      setSelectedUser(response.data);
      setEditMode(false);
      setShowUserModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      showNotification('Failed to load user details', 'error');
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Registrations', 'Created At'];
    const rows = filteredUsers.map(user => [
      user.id,
      user.full_name || 'N/A',
      user.email,
      user.role,
      user.is_active ? 'Active' : 'Inactive',
      user.total_registrations || 0,
      new Date(user.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUserAction = async (userId, action) => {
    const loadingKey = `user_${userId}`;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user status locally
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              status: action === 'approve' ? 'active' : action === 'suspend' ? 'suspended' : user.status 
            }
          : user
      ));
      
      console.log(`User ${userId} ${action}d successfully`);
    } catch (error) {
      console.error(`Error performing ${action} on user:`, error);
    } finally {
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) return;
    
    setActionLoading(prev => ({ ...prev, bulk: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update selected users status locally
      setUsers(prev => prev.map(user => 
        selectedUsers.includes(user.id)
          ? { 
              ...user, 
              status: action === 'approve' ? 'active' : action === 'suspend' ? 'suspended' : user.status 
            }
          : user
      ));
      
      setSelectedUsers([]);
      console.log(`Bulk ${action} completed for ${selectedUsers.length} users`);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, bulk: false }));
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Login'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        new Date(user.created_at).toLocaleDateString(),
        user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
          <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiUsers className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  User Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage all platform users and their permissions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={exportUsers}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Search */}
            <div className="relative lg:col-span-2">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-blue-800 dark:text-blue-400 font-medium">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
              </span>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleBulkAction('approve')}
                  disabled={actionLoading.bulk}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <FiUserCheck className="w-4 h-4 mr-2" />
                  Approve
                </button>
                
                <button
                  onClick={() => handleBulkAction('suspend')}
                  disabled={actionLoading.bulk}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <FiUserX className="w-4 h-4 mr-2" />
                  Suspend
                </button>
                
                <button
                  onClick={() => setSelectedUsers([])}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : user.role === 'organizer'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : user.status === 'suspended'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {user.status === 'pending' && (
                          <button
                            onClick={() => handleUserAction(user.id, 'approve')}
                            disabled={actionLoading[`user_${user.id}`]}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors disabled:opacity-50"
                            title="Approve User"
                          >
                            {actionLoading[`user_${user.id}`] ? (
                              <FiRefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiUserCheck className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        
                        {user.status === 'active' && (
                          <button
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            disabled={actionLoading[`user_${user.id}`]}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                            title="Suspend User"
                          >
                            {actionLoading[`user_${user.id}`] ? (
                              <FiRefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiUserX className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        
                        {user.status === 'suspended' && (
                          <button
                            onClick={() => handleUserAction(user.id, 'approve')}
                            disabled={actionLoading[`user_${user.id}`]}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors disabled:opacity-50"
                            title="Reactivate User"
                          >
                            {actionLoading[`user_${user.id}`] ? (
                              <FiRefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiUserCheck className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                          title="More Actions"
                        >
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
    </Layout>
  );
};

export default UserManagement;
