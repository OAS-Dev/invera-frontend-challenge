'use client';

import {useState} from 'react';
import {Button} from '@/components/ui';
import {UserFormModal} from '@/components/shared';

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleAddUser = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <header
        className='flex justify-between items-center transition-colors duration-200 
        dark:bg-[#212121] dark:text-white 
        bg-white text-black dark:border-none'
      >
        <div className='text-xl font-medium'>Users</div>
        <Button
          onClick={handleAddUser}
          className='w-[140px] font-bold bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors'
          variant='default'
        >
          Add user
        </Button>
      </header>

      <UserFormModal
        isOpen={open}
        onClose={handleCloseModal}
        mode='create'
        onSuccess={() => console.log('User created successfully!')}
      />
    </>
  );
};
