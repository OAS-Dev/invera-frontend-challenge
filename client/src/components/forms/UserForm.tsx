'use client';

import {useEffect, useState} from 'react';
import {z} from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {createUser, updateUser, getAllUsers} from '@/services/user.services';
import {User} from '@/interfaces/user.interface';

interface UserFormProps {
  initialData: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    company: string;
    status: 'Online' | 'Offline';
  };
  mode?: 'create' | 'edit';

  onClose?: () => void;
  onSuccess?: () => void;
}

type UserFormValues = z.infer<typeof userSchema>;

const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
  location: z.string().min(3, 'Location must be at least 3 characters long'),
  company: z.string().min(1, 'Company is required'),
  status: z.enum(['Online', 'Offline'], {
    errorMap: () => ({message: 'Status must be either Online or Offline'}),
  }),
});

export const UserForm = ({initialData, mode, onClose, onSuccess}: UserFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = mode === 'edit';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'Online',
      company: '',
    },
  });

  useEffect(() => {
    if (initialData && isEditMode) {
      form.reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        location: initialData.location,
        status: initialData.status,
        company: initialData.company,
      });
    }
  }, [initialData, isEditMode, form]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      setIsSubmitting(true);

      if (isEditMode && initialData.id) {
        await updateUser(Number(initialData.id), {
          ...data,
          id: initialData.id,
        });

        toast.success('User updated successfully!', {
          position: 'top-center',
          duration: 3000,
        });

        if (onSuccess) {
          onSuccess();
        }

        if (onClose) {
          onClose();
        }
      } else {
        const allUsers = await getAllUsers();

        let highestId = 0;
        if (allUsers && allUsers.length > 0) {
          highestId = Math.max(...allUsers.map((user: {id: string}) => Number(user.id) || 0));
        }

        const nextId = highestId + 1;

        const userData: Omit<User, 'id'> & {id: number} = {
          ...data,
          id: nextId, // ID como número
        };

        await createUser(userData as unknown as User);

        toast.success('User created successfully!', {
          position: 'top-center',
          duration: 3000,
        });
        form.reset();

        if (onSuccess) {
          onSuccess();
        }

        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user. Please try again.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Name */}
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter name'
                  className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter email'
                  className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name='phone'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter phone number'
                  className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name='location'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter location'
                  className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Company */}
        <FormField
          control={form.control}
          name='company'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter company'
                  className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name='status'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-sm font-medium dark:text-gray-200 text-gray-700'>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='dark:bg-[#1A1A1A] dark:border-[#5F5F5F] dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='dark:bg-[#212121] dark:border-[#5F5F5F] dark:text-white'>
                  <SelectItem value='Online' className='dark:hover:bg-[#1A1A1A] hover:bg-gray-100'>
                    Online
                  </SelectItem>
                  <SelectItem value='Offline' className='dark:hover:bg-[#1A1A1A] hover:bg-gray-100'>
                    Offline
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className='text-red-500 text-xs' />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className='pt-4'>
          <Button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors dark:bg-blue-600 dark:hover:bg-blue-700'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
