'use client';

import {useEffect, useState} from 'react';
import {UserTypes} from '@/interfaces/user.interface';
import {CircularGraph} from '../shared';
import {StatisticsSkeleton} from '@/components';
import {getUserTypes} from '@/services/userTypes.services';

export const Statistics = () => {
  const [userTypes, setUserTypes] = useState<UserTypes>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const data = await getUserTypes();
        setUserTypes(data);
      } catch (err) {
        console.error('Error fetching user types:', err);
        setError('Failed to load user types data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTypes();
  }, []);

  if (loading) {
    return <StatisticsSkeleton />;
  }

  if (error && !userTypes) {
    return <div className='text-red-500 py-4'>{error}</div>;
  }

  return (
    <div className='rounded-xl border border-[#5F5F5F] py-8 px-6 bg-[#121212] text-white'>
      <h1 className='text-lg font-semibold mb-6'>Estadísticas</h1>

      <div className='flex flex-col md:flex-row md:items-center'>
        <div className='flex justify-center mb-6 lg:mb-0 md:w-1/2'>
          <CircularGraph distribution={userTypes?.distribution} totalUsers={userTypes?.totalUsers} />
        </div>

        <div className='space-y-4 md:w-1/2'>
          {userTypes?.distribution.map((item, index) => {
            // Determinar el color basado en el tipo
            let bgColor = '';
            if (item.type === 'Organic') bgColor = 'bg-[#7B99FF]';
            else if (item.type === 'Social') bgColor = 'bg-[#C9D7FD]';
            else if (item.type === 'Direct') bgColor = 'bg-[#2CE284]';

            return (
              <div key={index} className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36'>
                <div className='flex items-center gap-2'>
                  <span className={`h-2 w-2 rounded-full ${bgColor}`}></span>
                  <span>{item.type}</span>
                </div>
                <span className='font-semibold'>{item.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
