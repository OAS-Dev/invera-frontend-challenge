'use client';

import React, {useState, useEffect} from 'react';
import {PieChart, Pie, Cell} from 'recharts';

const data = [
  {value: 75, color: '#2CE284'},
  {value: 100 - 75, color: '#5F5F5F'},
  {value: 90, color: '#C9D7FD'},
  {value: 100 - 90, color: '#5F5F5F'},
  {value: 85, color: '#7B99FF'},
  {value: 100 - 85, color: '#5F5F5F'},
];

const ringSizes = [80, 92, 104];

export const CircularGraph = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='flex justify-center items-center h-[300px] w-[300px]  rounded-full relative'>
      {isMounted && (
        <PieChart width={300} height={300}>
          {ringSizes.map((size, index) => (
            <Pie
              key={index}
              data={data.slice(index * 2, index * 2 + 2)}
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
              {data.slice(index * 2, index * 2 + 2).map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} stroke='none' strokeWidth={0} />
              ))}
            </Pie>
          ))}
        </PieChart>
      )}

      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <div className='text-center text-white'>
          <p className='text-3xl font-bold'>150k</p>
          <p className='text-lg'>users</p>
        </div>
      </div>
    </div>
  );
};
