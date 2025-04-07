'use client';

import React, {useState, useEffect} from 'react';
import {PieChart, Pie, Cell} from 'recharts';
import {Distribution} from '@/interfaces/user.interface';

// Colores para cada tipo de distribución
const COLORS = {
  Organic: '#7B99FF',
  Social: '#C9D7FD',
  Direct: '#2CE284',
};

// Tamaños de los anillos
const ringSizes = [80, 92, 104];

interface CircularGraphProps {
  distribution?: Distribution[];
  totalUsers?: number;
}

export const CircularGraph = ({distribution, totalUsers = 0}: CircularGraphProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si no hay datos de distribución, usamos datos predeterminados
  const graphData = !distribution
    ? [
        {value: 85, color: '#7B99FF'}, // Organic
        {value: 100 - 85, color: '#5F5F5F'},
        {value: 90, color: '#C9D7FD'}, // Social
        {value: 100 - 90, color: '#5F5F5F'},
        {value: 75, color: '#2CE284'}, // Direct
        {value: 100 - 75, color: '#5F5F5F'},
      ]
    : distribution
        .map((item) => [
          {value: item.percentage, color: COLORS[item.type as keyof typeof COLORS] || '#7B99FF'},
          {value: 100 - item.percentage, color: '#5F5F5F'},
        ])
        .flat();

  return (
    <div className='flex justify-center items-center h-[300px] w-[300px] rounded-full relative'>
      {isMounted && (
        <PieChart width={300} height={300}>
          {ringSizes.map((size, index) => {
            // Asegurarse de que hay suficientes datos para cada anillo
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
        <div className='text-center text-white'>
          <p className='text-3xl font-bold'>
            {totalUsers ? `${totalUsers >= 1000 ? `${Math.floor(totalUsers / 1000)}k` : totalUsers}` : '150k'}
          </p>
          <p className='text-lg'>users</p>
        </div>
      </div>
    </div>
  );
};
