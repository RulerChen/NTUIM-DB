import UserProfile from '@/components/UserProfile';

const page = () => {
  return (
    <main className="flex flex-col justify-center bg-gray-100">
      <section>
        <UserProfile></UserProfile>
      </section>
      <section>我主持的活動...挑幾個列在這</section>
      <section>我追蹤的活動...挑幾個列在這</section>
      <section>我參加的活動...挑幾個列在這</section>
    </main>
  );
};

export default page;
