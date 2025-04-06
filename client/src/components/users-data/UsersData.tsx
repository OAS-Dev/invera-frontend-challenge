'use client';

import {useState, useEffect} from 'react';
import {User} from '@/interfaces/user.interface';
import {DataTable} from '../shared/tables/user-table/data-table';
import {columns} from '../shared/tables/user-table/columns';
import {getAllUsers} from '@/services/user.services';

export const UsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className='rounded-xl border border-[#5F5F5F] py-6 px-6 bg-[#212121] text-white'>
        <div className='flex justify-center items-center h-40'>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-xl border border-[#5F5F5F] py-6 px-6 bg-[#212121] text-white'>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
