import Image from 'next/image';
import {Button, Card, CardContent} from '@/components/ui';

interface DashboadCardProps {
  title: string;
  quantity: number;
  icon: string;
}

export const DashboadCard = ({title, quantity, icon}: DashboadCardProps) => {
  return (
    <Card className='rounded-xl border border-[#5F5F5F] dark:border-[#5F5F5F] bg-white dark:bg-[#121212] text-black dark:text-white h-20 shadow-sm'>
      <CardContent className='flex justify-between items-center px-4 py-0 h-full'>
        <div className='flex items-center gap-2'>
          <div className='h-12 w-12 bg-[#F0F4FF] dark:bg-[#2D3348] rounded-full flex items-center justify-center'>
            {icon ? (
              <Image src={icon} alt='icon' width={20} height={20} />
            ) : (
              <span className='h-2 w-2 rounded-full bg-[#7B99FF]'></span>
            )}
          </div>
          <div className='flex flex-col gap-1 ml-1'>
            <p className='text-[#6B7280] dark:text-[#BABABA] font-bold text-lg'>{title}</p>
            <p className='text-[#111827] dark:text-[#FCFCFC] font-normal text-lg'>{quantity}</p>
          </div>
        </div>
        <Button
          variant='outline'
          size='icon'
          className='bg-transparent border-none hover:bg-gray-100 dark:hover:bg-[#2D3348]'
        >
          <Image
            src='/icons/dots_three.svg'
            alt='menu icon'
            width={18}
            height={18}
            style={{width: 'auto', height: 'auto'}}
          />
        </Button>
      </CardContent>
    </Card>
  );
};
