'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {UserForm} from '@/components';
import {User} from '@/interfaces/user.interface';

interface UserFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  userData?: User;

  onClose: () => void;
  onSuccess?: () => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  mode = 'create',
  userData,
  onSuccess,
}) => {
  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Edit User' : 'Add New User';
  const description = isEditMode ? 'Update the user information below.' : 'Fill in the details to create a new user.';

  const formattedUserData = userData
    ? {
        ...userData,
        status: (userData.status === 'Offline' ? 'Offline' : 'Online') as 'Online' | 'Offline',
      }
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className='
        dark:bg-[#212121] dark:text-white dark:border-[#5F5F5F]
        bg-white text-gray-800 border-gray-200
        transition-colors duration-200
      '
      >
        <DialogHeader>
          <DialogTitle className='text-xl font-bold dark:text-white text-gray-800'>{title}</DialogTitle>
          <DialogDescription className='dark:text-gray-400 text-gray-500'>{description}</DialogDescription>
        </DialogHeader>

        {isEditMode && (
          <div className='py-4'>
            <p className='dark:text-gray-300 text-gray-600'>Editing user: {userData?.name || 'Unknown'}</p>
          </div>
        )}

        <UserForm
          initialData={
            formattedUserData || {name: '', email: '', phone: '', location: '', company: '', status: 'Online' as const}
          }
          mode={mode}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};
