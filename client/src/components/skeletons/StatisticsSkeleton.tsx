export const StatisticsSkeleton = () => {
  return (
    <div className='rounded-xl border border-[#5F5F5F] py-8 px-6 bg-[#121212] text-white'>
      <div className='h-6 w-32 bg-[#1A1A1A] rounded mb-6 animate-pulse'></div>

      <div className='flex flex-col md:flex-row md:items-center'>
        <div className='flex justify-center mb-6 lg:mb-0 md:w-1/2'>
          {/* Skeleton para el gráfico circular */}
          <div className='h-[300px] w-[300px] rounded-full relative animate-pulse'>
            <div className='absolute inset-0 border-8 border-[#1A1A1A] rounded-full'></div>
            <div className='absolute inset-[20px] border-8 border-[#1A1A1A] rounded-full'></div>
            <div className='absolute inset-[40px] border-8 border-[#1A1A1A] rounded-full'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <div className='text-center'>
                <div className='h-8 w-16 bg-[#1A1A1A] rounded mb-2 mx-auto'></div>
                <div className='h-4 w-12 bg-[#1A1A1A] rounded mx-auto'></div>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4 md:w-1/2'>
          {/* Skeleton para los elementos de distribución */}
          {[1, 2, 3].map((item) => (
            <div key={item} className='flex items-center justify-between gap-2 md:pl-6 lg:pr-36 animate-pulse'>
              <div className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#1A1A1A]'></span>
                <div className='h-4 w-20 bg-[#1A1A1A] rounded'></div>
              </div>
              <div className='h-4 w-8 bg-[#1A1A1A] rounded'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
