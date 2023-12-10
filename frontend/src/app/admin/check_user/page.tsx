const page = () => {
    return (
      <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
 <ul role="list" className="divide-y divide-gray-100">
  <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">user name</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">user_role</p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">發起活動</p>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">參與活動</p>
    </div>
    <button>刪除</button>
  </li>
</ul>
      </main>
    );
  };
  
export default page;