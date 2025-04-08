'use client';

import {useEffect, useState} from 'react';
import {DashboadCard} from '@/components/shared';
import {DashboardInfoSkeleton} from '@/components';
import {getStatistics} from '@/services/statics.services';

interface StatisticsData {
  totalUsers: number;
  topUsers: number;
  newUsers: number;
  otherUsers: number;
}

interface CardData {
  title: string;
  key: keyof StatisticsData;
  icon: string;
}

export const DashboardInfo = () => {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cardData: CardData[] = [
    {title: 'Total Users', key: 'totalUsers', icon: '/icons/user_group_icon.svg'},
    {title: 'New Users', key: 'newUsers', icon: '/icons/users_icon.svg'},
    {title: 'Top Users', key: 'topUsers', icon: '/icons/heart_icon.svg'},
    {title: 'Other Users', key: 'otherUsers', icon: '/icons/dots_icon.svg'},
  ];

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics();
        setStatistics(data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics data');
        // Fallback data for development
        setStatistics({
          totalUsers: 250,
          topUsers: 180,
          newUsers: 25,
          otherUsers: 10,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <DashboardInfoSkeleton />;
  }

  if (error && !statistics) {
    return (
      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4'>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 text-red-500 mr-2'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
          <p className='text-red-700 dark:text-red-400 font-medium'>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className='mt-3 bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-700 dark:text-red-400 px-4 py-2 rounded-md text-sm font-medium transition-colors'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {cardData.map((card) => (
        <DashboadCard key={card.key} title={card.title} quantity={statistics?.[card.key] || 0} icon={card.icon} />
      ))}
    </div>
  );
};
