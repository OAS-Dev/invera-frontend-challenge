export const DashboardInfoSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className='rounded-xl border border-gray-200 dark:border-[#5F5F5F] bg-white dark:bg-[#121212] text-black dark:text-white h-20 animate-pulse shadow-sm'>
          <div className='flex justify-between items-center px-4 py-0 h-full'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 dark:bg-[#2D3348] rounded-full flex items-center justify-center'>
                <div className='h-5 w-5 rounded-full bg-gray-300 dark:bg-[#1A1A1A]'></div>
              </div>
              <div className='flex flex-col gap-1 ml-1'>
                <div className='h-4 w-24 bg-gray-200 dark:bg-[#1A1A1A] rounded'></div>
                <div className='h-4 w-12 bg-gray-200 dark:bg-[#1A1A1A] rounded'></div>
              </div>
            </div>
            <div className='h-8 w-8 bg-gray-200 dark:bg-[#1A1A1A] rounded-full'></div>
          </div>
        </div>
      ))}
    </div>
  );
};
