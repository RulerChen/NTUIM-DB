'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGoogle, BsFacebook } from 'react-icons/bs';

import axios, { url } from '@/lib/axios';

import { Button } from '@/components/ui/button';
import Input from '@/components/LoginInput';
import AuthSocialButton from '@/components/AuthSocialButton';

import { useMember } from '@/hooks/useMember';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isStudent, setIsStudent] = useState(false);
  const { setMember } = useMember();
  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data = {
      ...data,
      age: Number(data.age),
    };
    if (variant === 'LOGIN') {
      axios
        .post(`/user/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success('登入成功');
            router.push('/');
          }
          setMember(res.data);
        })
        .catch(() => {
          toast.error('登入失敗');
        })
        .finally(() => reset());
    }

    if (variant === 'REGISTER') {
      if (data.password !== data.confirmed_password) {
        toast.error('密碼不一致');
        return;
      }
      axios
        .post(`/user/register`, data)
        .then((res) => {
          if (res.status === 201) {
            toast.success('註冊成功');
            setVariant('LOGIN');
          }
        })
        .catch(() => {
          toast.error('註冊失敗');
        });
    }
  };

  const socialAction = (action: string) => {
    switch (action) {
      case 'google':
        window.location.href = `${url}/user/google`;
        break;
      case 'facebook':
        window.location.href = `${url}/user/facebook`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isSubmitting}
              register={register}
              errors={errors}
              required
              id="username"
              label="姓名"
            />
          )}
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
          {variant === 'REGISTER' && (
            <>
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
            </>
          )}
          <div>
            <Button disabled={isSubmitting} type="submit" variant="fullwidth">
              {variant === 'LOGIN' ? '登入' : '註冊'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">使用第三方登入</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
            <AuthSocialButton icon={BsFacebook} onClick={() => socialAction('facebook')} />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === 'LOGIN' ? '剛加入資料庫嗎?' : '有帳戶了嗎?'}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? '註冊帳戶' : '登入'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
