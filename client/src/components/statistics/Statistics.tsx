'use client';

import {CircularGraph} from '../shared';

export const Statistics = () => {
  return (
    <div className='rounded-xl border border-[#5F5F5F] py-8 px-6 bg-[#121212] text-white'>
      <h1 className='text-lg font-semibold mb-6'>Estadísticas</h1>

      <div className='flex flex-col md:flex-row md:items-center'>
        <div className='flex justify-center mb-6 lg:mb-0 md:w-1/2'>
          <CircularGraph />
        </div>

        <div className='space-y-4 md:w-1/2'>
          <div className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-[#7B99FF]'></span>
              <span>Organic</span>
            </div>
            <span>30%</span>
          </div>
          <div className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-[#C9D7FD]'></span>
              <span>Social</span>
            </div>
            <span>50%</span>
          </div>
          <div className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-[#28E384]'></span>
              <span>Direct</span>
            </div>
            <span>20%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
