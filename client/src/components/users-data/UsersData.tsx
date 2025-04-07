'use client';

import {useState, useEffect} from 'react';
import {User} from '@/interfaces/user.interface';
import {DataTable} from '../shared/tables/user-table/data-table';
import {columns} from '../shared/tables/user-table/columns';
import {getAllUsers} from '@/services/user.services';
import {UserDataSkeleton} from '@/components';

export const UsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <UserDataSkeleton />;
  }

  if (error && !users) {
    return <div className='text-red-500 py-4'>{error}</div>;
  }

  return <DataTable columns={columns} data={users} />;
};
