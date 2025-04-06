'use client';

import {Button} from '../ui';

interface HeaderProps {
  onAddUser?: () => void;
}

export const Header: React.FC<HeaderProps> = ({onAddUser}) => {
  return (
    <header
      className='flex justify-between items-center p-10 transition-colors duration-200 
      dark:bg-black dark:text-white 
      bg-white text-black border-b border-gray-200 dark:border-none'
    >
      <div className='text-xl font-medium'>Users</div>
      <Button
        onClick={onAddUser}
        className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors'
        variant='default'
      >
        Add user
      </Button>
    </header>
  );
};
