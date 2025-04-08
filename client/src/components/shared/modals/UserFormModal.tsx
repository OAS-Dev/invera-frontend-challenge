'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { User } from '@/interfaces/user.interface';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  userData?: User;
  onSubmit?: (data: Partial<User>) => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ 
  isOpen, 
  onClose, 
  mode = 'create',
  userData,
  onSubmit 
}) => {
  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Edit User' : 'Add New User';
  const description = isEditMode 
    ? 'Update the user information below.' 
    : 'Fill in the details to create a new user.';
  const submitButtonText = isEditMode ? 'Update User' : 'Create User';

  const handleSubmit = () => {
    // In the future, this will handle form submission
    if (onSubmit) {
      // For now, just pass the userData back or an empty object
      onSubmit(userData || {});
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="
        dark:bg-[#212121] dark:text-white dark:border-[#5F5F5F]
        bg-white text-gray-800 border-gray-200
        transition-colors duration-200
      ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold dark:text-white text-gray-800">{title}</DialogTitle>
          <DialogDescription className="dark:text-gray-400 text-gray-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Form will be added here in the future */}
          <p className="dark:text-gray-300 text-gray-600">
            {isEditMode 
              ? `Editing user: ${userData?.name || 'Unknown'}`
              : 'User creation form will be implemented here.'}
          </p>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="
              dark:border-[#5F5F5F] dark:text-white dark:hover:bg-[#1A1A1A]
              border-gray-300 text-gray-700 hover:bg-gray-100
              transition-colors
            "
          >
            Cancel
          </Button>
          <Button 
            className="
              bg-blue-500 hover:bg-blue-600 text-white
              transition-colors
            "
            onClick={handleSubmit}
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
