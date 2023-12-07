'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/LoginInput';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';

const UserProfileForm = () => {
  const [isStudent, setIsStudent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmed_password: '',
      age: 0,
      phone_number: '',
      isStudent: false,
      school_name: '',
      department: '',
      grade: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    toast.error('後端尚未實作');
    // data = {
    //   ...data,
    //   age: Number(data.age),
    // };
    // if (variant === 'LOGIN') {
    //   axios
    //     .post(`/user/login`, data, {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         toast.success('登入成功');
    //         router.push('/secret');
    //       }
    //     })
    //     .catch(() => {
    //       toast.error('登入失敗');
    //     })
    //     .finally(() => reset());
    // }
    // if (variant === 'REGISTER') {
    //   if (data.password !== data.confirmed_password) {
    //     toast.error('密碼不一致');
    //     return;
    //   }
    //   axios
    //     .post(`/user/register`, data)
    //     .then((res) => {
    //       if (res.status === 201) {
    //         toast.success('註冊成功');
    //       }
    //     })
    //     .catch(() => {
    //       toast.error('註冊失敗');
    //     });
    // }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-xl xl:max-w-2xl">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 space-y-6">
        <div className="text-xl">使用者個人資料</div>
        <Separator orientation="horizontal" className="bg-black" />
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="username"
            label="姓名"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="email"
            label="電子郵件"
            type="email"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="password"
            label="密碼"
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
          {/* age shoud > 0 */}
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="age"
            label="年紀"
            type="number"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="phone_number"
            label="電話號碼"
          />
          <div className="flex items-center">
            <input
              id="isStudent"
              type="checkbox"
              className="focus:ring-sky-600 h-4 w-4 text-sky-600 border-gray-300 rounded"
              {...register('isStudent')}
              onChange={() => setIsStudent(!isStudent)}
            />
            <label htmlFor="isStudent" className="ml-2 block text-sm text-gray-900">
              我是學生
            </label>
          </div>
          {isStudent && (
            <>
              <Input
                disabled={isSubmitting}
                register={register}
                errors={errors}
                id="school_name"
                label="學校名稱"
              />
              <Input
                disabled={isSubmitting}
                register={register}
                errors={errors}
                id="department"
                label="系所名稱"
              />
              <Input
                disabled={isSubmitting}
                register={register}
                errors={errors}
                id="grade"
                label="年級"
              />
            </>
          )}
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
