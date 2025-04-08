'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#212121] text-gray-800 dark:text-white p-4 transition-colors duration-200'>
      <div className='text-center max-w-md'>
        <div className='mb-8 relative h-40 w-40 mx-auto'>
          <Image src='/icons/404_icon.svg' alt='404 Error' fill className='object-contain' />
        </div>

        <h1 className='text-3xl font-bold mb-4'>Página no encontrada</h1>

        <p className='text-gray-600 dark:text-[#BABABA] mb-8'>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <Link
          href='/'
          className='inline-flex items-center justify-center px-6 py-3 bg-blue-500 dark:bg-[#7B99FF] text-white font-medium rounded-lg transition-colors hover:bg-blue-600 dark:hover:bg-[#6A85E5] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#7B99FF] focus:ring-opacity-50'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
