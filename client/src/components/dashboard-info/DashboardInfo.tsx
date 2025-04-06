'use client';

import {useEffect, useState} from 'react';
import {DashboadCard} from '../shared';
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
    return <div className='flex justify-center py-4'>Loading statistics...</div>;
  }

  if (error && !statistics) {
    return <div className='text-red-500 py-4'>{error}</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {cardData.map((card) => (
        <DashboadCard key={card.key} title={card.title} quantity={statistics?.[card.key] || 0} icon={card.icon} />
      ))}
    </div>
  );
};
