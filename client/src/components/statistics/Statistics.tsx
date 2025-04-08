'use client';

import {useEffect, useState} from 'react';
import {CircularGraph} from '@/components/shared';
import {StatisticsSkeleton} from '@/components';
import {UserTypes} from '@/interfaces/user.interface';
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
    <div className='rounded-xl border border-[#5F5F5F] dark:border-[#5F5F5F] py-8 px-6 bg-white dark:bg-[#121212] text-black dark:text-white shadow-sm'>
      <h1 className='text-lg font-semibold mb-6'>Statistics</h1>

      <div className='flex flex-col md:flex-row md:items-center'>
        <div className='flex justify-center mb-6 lg:mb-0 md:w-1/2'>
          <CircularGraph distribution={userTypes?.distribution} totalUsers={userTypes?.totalUsers} />
        </div>

        <div className='space-y-4 md:w-1/2'>
          {userTypes?.distribution.map((item, index) => {
            let bgColor = '';
            if (item.type === 'Organic') bgColor = 'bg-[#7B99FF]';
            else if (item.type === 'Social') bgColor = 'bg-[#C9D7FD]';
            else if (item.type === 'Direct') bgColor = 'bg-[#2CE284]';

            return (
              <div key={index} className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36'>
                <div className='flex items-center gap-2'>
                  <span className={`h-2 w-2 rounded-full ${bgColor}`}></span>
                  <p className='text-[#6B7280] dark:text-white'>{item.type}</p>
                </div>
                <p className='text-[#111827] dark:text-white font-medium'>{item.percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
