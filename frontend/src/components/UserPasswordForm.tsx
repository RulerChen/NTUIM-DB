'use client';
import { Separator } from '@/components/ui/separator';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/LoginInput';
import { UpdateUserPasswordPayload } from '@/lib/shared_types';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useMember } from '@/hooks/useMember';
import { useRouter } from 'next/navigation';

const UserProfileForm = () => {
  const { fetchMember } = useMember();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirmed_password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data = {
      ...data,
      age: Number(data.age),
    };
    if (data.new_password !== data.confirmed_password) {
      toast.error('兩次密碼輸入不一致');
      return;
    }
    const userPassword: UpdateUserPasswordPayload = {
      old_password: data.old_password,
      new_password: data.new_password,
    };
    axios
      .put(`/user/password`, userPassword)
      .then((res) => {
        if (res.status === 200) {
          toast.success('更新成功');
          fetchMember();
          router.push('/user');
        }
      })
      .catch(() => {
        toast.error('更新失敗');
      });
  };
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md sm:py-10 lg:max-w-xl xl:max-w-2xl">
      <div className="bg-white px-4 py-8 shadow sm:rounded-xl sm:px-10 space-y-6">
        <div className="text-xl font-semibold">變更使用者密碼</div>
        <Separator orientation="horizontal" className="bg-black" />
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="old_password"
            label="舊密碼"
            type="password"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="new_password"
            label="新密碼"
            type="password"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="confirmed_password"
            label="確認密碼"
            type="password"
          />
          <div>
            <Button disabled={isSubmitting} type="submit" variant="fullwidth" className="my-4">
              確定更新
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserProfileForm;
