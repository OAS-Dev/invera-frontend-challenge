export const UserDataSkeleton = () => {
  return (
    <div className='rounded-xl border border-[#5F5F5F] py-6 px-6 bg-[#212121] text-white'>
      {/* Header del skeleton */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
        <div className='flex items-center gap-4'>
          <div className='h-8 w-32 bg-[#1A1A1A] rounded animate-pulse'></div>
          <div className='relative ml-4'>
            <div className='bg-[#1A1A1A] border border-[#5F5F5F] rounded-lg h-10 w-[160px] md:w-[320px] animate-pulse'></div>
          </div>
        </div>
        <div className='h-4 w-32 bg-[#1A1A1A] rounded mt-2 md:mt-0 animate-pulse'></div>
      </div>

      {/* Tabla skeleton */}
      <div className='w-full overflow-hidden'>
        {/* Header de la tabla */}
        <div className='w-full border-t border-[#5F5F5F]'>
          <div className='flex border-b border-[#5F5F5F] py-3'>
            <div className='w-10 px-4'>
              <div className='h-4 w-4 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='flex-1 px-4'>
              <div className='h-4 w-20 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='hidden md:block w-24 px-4'>
              <div className='h-4 w-16 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='hidden md:block w-24 px-4'>
              <div className='h-4 w-20 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='hidden md:block w-32 px-4'>
              <div className='h-4 w-24 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='w-24 px-4'>
              <div className='h-4 w-16 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
            <div className='w-20 px-4'>
              <div className='h-4 w-4 bg-[#1A1A1A] rounded animate-pulse'></div>
            </div>
          </div>
        </div>

        {/* Filas de la tabla */}
        <div className='w-full'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row, index) => (
            <div
              key={row}
              className={`flex border-b border-[#5F5F5F] py-4 ${index % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#212121]'}`}
            >
              <div className='w-10 px-4'>
                <div className='h-4 w-4 bg-[#2D3348] rounded animate-pulse'></div>
              </div>
              <div className='flex-1 px-4'>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-full bg-[#2D3348] animate-pulse'></div>
                  <div>
                    <div className='h-3 w-24 bg-[#2D3348] rounded mb-1 animate-pulse'></div>
                    <div className='h-3 w-32 bg-[#2D3348] rounded animate-pulse'></div>
                  </div>
                </div>
              </div>
              <div className='hidden md:block w-24 px-4'>
                <div className='h-4 w-20 bg-[#2D3348] rounded animate-pulse'></div>
              </div>
              <div className='hidden md:block w-24 px-4'>
                <div className='h-4 w-16 bg-[#2D3348] rounded animate-pulse'></div>
              </div>
              <div className='hidden md:block w-32 px-4'>
                <div className='flex items-center gap-2'>
                  <div className='h-5 w-5 rounded-full bg-[#2D3348] animate-pulse'></div>
                  <div className='h-4 w-16 bg-[#2D3348] rounded animate-pulse'></div>
                </div>
              </div>
              <div className='w-24 px-4'>
                <div className='h-6 w-16 bg-[#2D3348] rounded-md animate-pulse'></div>
              </div>
              <div className='w-20 px-4 flex justify-end'>
                <div className='flex gap-1'>
                  <div className='h-6 w-6 bg-[#2D3348] rounded animate-pulse'></div>
                  <div className='h-6 w-6 bg-[#2D3348] rounded animate-pulse'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginación skeleton */}
      <div className='flex items-center justify-between mt-4 px-4'>
        <div className='h-4 w-24 bg-[#1A1A1A] rounded animate-pulse'></div>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-24 bg-[#1A1A1A] rounded animate-pulse'></div>
          <div className='flex gap-2'>
            <div className='h-8 w-8 bg-[#1A1A1A] rounded animate-pulse'></div>
            <div className='h-8 w-8 bg-[#1A1A1A] rounded animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
