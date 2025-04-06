import {DashboardInfo, Header, Statistics} from '@/components';
// import {ToggleThemeButton} from '@/components/shared';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-8 mx-4 mt-8 md:m-14 lg:mx-10'>
      {/* <div className='flex justify-end mt-4'>
        <ToggleThemeButton />
      </div> */}

      <Header />

      <DashboardInfo />

      <Statistics />
    </div>
  );
}
