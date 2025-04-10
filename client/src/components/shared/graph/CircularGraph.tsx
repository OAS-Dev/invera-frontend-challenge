'use client';

import {useState, useEffect} from 'react';
import {PieChart, Pie, Cell} from 'recharts';
import {Distribution} from '@/interfaces/user.interface';

const COLORS = {
  Organic: '#7B99FF',
  Social: '#C9D7FD',
  Direct: '#2CE284',
};

const LIGHT_MODE_EMPTY_COLOR = '#E5E7EB';
const DARK_MODE_EMPTY_COLOR = '#5F5F5F';

const ringSizes = [80, 92, 104];

interface CircularGraphProps {
  distribution?: Distribution[];
  totalUsers?: number;
}

export const CircularGraph = ({distribution, totalUsers = 0}: CircularGraphProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches || document.documentElement.classList.contains('dark'));

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches || document.documentElement.classList.contains('dark'));
    };

    darkModeMediaQuery.addEventListener('change', handleChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {attributes: true});

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  const emptyColor = isDarkMode ? DARK_MODE_EMPTY_COLOR : LIGHT_MODE_EMPTY_COLOR;

  // Si no hay datos de distribución, no muestro el gráfico
  if (!distribution || distribution.length === 0) {
    return (
      <div className='flex justify-center items-center h-[300px] w-[300px] rounded-full relative'>
        <p className='text-gray-500 dark:text-gray-400 text-center'>No hay datos disponibles para mostrar</p>
      </div>
    );
  }

  const graphData = distribution
    .map((item) => [
      {value: item.percentage, color: COLORS[item.type as keyof typeof COLORS] || '#7B99FF'},
      {value: 100 - item.percentage, color: emptyColor},
    ])
    .flat();

  return (
    <div className='flex justify-center items-center h-[300px] w-[300px] rounded-full relative'>
      {isMounted && (
        <PieChart width={300} height={300}>
          {ringSizes.map((size, index) => {
            const dataSlice = graphData.slice(index * 2, index * 2 + 2);
            if (dataSlice.length < 2) return null;

            return (
              <Pie
                key={index}
                data={dataSlice}
                dataKey='value'
                cx='50%'
                cy='50%'
                innerRadius={size}
                outerRadius={size + 8}
                startAngle={180}
                endAngle={-180}
                paddingAngle={0}
                strokeWidth={0}
                cornerRadius={0}
              >
                {dataSlice.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} stroke='none' strokeWidth={0} />
                ))}
              </Pie>
            );
          })}
        </PieChart>
      )}

      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <div className='text-center text-black dark:text-white'>
          <p className='text-3xl font-bold'>
            {totalUsers ? `${totalUsers >= 1000 ? `${Math.floor(totalUsers / 1000)}k` : totalUsers}` : '150k'}
          </p>
          <p className='text-lg'>users</p>
        </div>
      </div>
    </div>
  );
};
