'use client';

import {useState, useEffect} from 'react';
import {toast} from 'sonner';
import {User} from '@/interfaces/user.interface';
import {DataTable} from '@/components/shared/tables/user-table/data-table';
import {columns} from '@/components/shared/tables/user-table/columns';
import {UserDataSkeleton} from '@/components';
import {UserFormModal} from '@/components/shared';
import {deleteUser, getAllUsers} from '@/services/user.services';

export const UsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => Number(user.id) === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => Number(user.id) !== id));
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error al eliminar el usuario', {
        description: 'Ha ocurrido un error al intentar eliminar el usuario',
      });
    }
  };

  if (loading && users.length === 0) {
    return <UserDataSkeleton />;
  }

  if (error && !users) {
    return <div className='text-red-500 py-4'>{error}</div>;
  }

  return (
    <>
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-xl font-bold dark:text-white'>Users</h2>
        <button
          onClick={handleOpenCreateModal}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700'
        >
          Add User
        </button>
      </div>

      <DataTable columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal para editar usuario */}
      {selectedUser && (
        <UserFormModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          mode='edit'
          userData={selectedUser}
          onSuccess={fetchUsers}
        />
      )}

      {/* Modal para crear usuario */}
      <UserFormModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} mode='create' onSuccess={fetchUsers} />
    </>
  );
};
