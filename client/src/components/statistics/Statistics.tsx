'use client';

import {CircularGraph} from '../index';

export const Statistics = () => {
  return (
    <div className='rounded-xl border border-[#5F5F5F] py-8 px-6 dark:bg-[#1A1A1A] dark:text-white'>
      <h1 className='text-lg font-semibold'>Statistics</h1>

      <div>
        <CircularGraph />
      </div>

      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-[#7B99FF]'></span>
          <span className='flex-1'>Organic</span>
          <span>30%</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-[#C9D7FD]'></span>
          <span className='flex-1'>Social</span>
          <span>50%</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-[#28E384]'></span>
          <span className='flex-1'>Direct</span>
          <span>20%</span>
        </div>
      </div>
    </div>
  );
};
