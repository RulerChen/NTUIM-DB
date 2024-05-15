'use client';
import { Separator } from '@/components/ui/separator';
import { useMember } from '@/hooks/useMember';
import { cn } from '@/lib/utils';

const UserProfileForm = () => {
  const { member, student } = useMember();

  return (
    <div className="mx-4 sm:mx-auto text-center sm:text-left sm:w-full max-w-xs sm:max-w-md py-10 sm:py-10 lg:max-w-xl xl:max-w-2xl">
      <div className="bg-white px-4 sm:px-10 py-8 shadow rounded-xl space-y-6 text-sm sm:text-lg">
        <div className="text-xl font-semibold">使用者個人資料</div>
        <Separator orientation="horizontal" className="bg-black" />
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-4')}>
          <div className={cn('flex flex-col')}>
            <label className="font-semibold">使用者名稱</label>
            <div className="">{member?.name}</div>
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">電子郵件</label>
            <div className="">{member?.email}</div>
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">手機號碼</label>
            <div className="">{member?.phone}</div>
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">年齡</label>
            <div className="">{member?.age}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">身分</label>
            <div className="">{member?.member_role === 'Student' ? '學生' : '一般會員'}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">餘額</label>
            <div className="">{member?.money}</div>
          </div>
          {member?.member_role === 'Student' && (
            <div className="flex flex-col">
              <label className=" font-semibold">學校</label>
              <div className="">{student?.school_name}</div>
            </div>
          )}
          {member?.member_role === 'Student' && (
            <div className="flex flex-col">
              <label className=" font-semibold">科系</label>
              <div className="">{student?.department}</div>
            </div>
          )}
          {member?.member_role === 'Student' && (
            <div className="flex flex-col">
              <label className=" font-semibold">年級</label>
              <div className="">{student?.grade}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
