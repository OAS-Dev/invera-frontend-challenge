import {Header} from '@/components';
import {ToggleThemeButton} from '@/components/shared';

export default function HomePage() {
  return (
    <div>
      <div className='flex justify-end px-4 py-2'>
        <ToggleThemeButton />
      </div>
      <Header />
    </div>
  );
}
