'use client';

import { useCallback, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import { AuthContext } from '@/context/auth';

import axios from '@/lib/axios';

import { Button } from '@/components/ui/button';
import Input from '@/components/LoginInput';
import AuthSocialButton from '@/components/AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [variant, setVariant] = useState<Variant>('LOGIN');

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/secret');
    }
  }, [router, isLoggedIn]);

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
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === 'LOGIN') {
      axios
        .post(`/user/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success('登入成功');
            router.push('/secret');
          }
        })
        .catch(() => {
          toast.error('登入失敗');
        })
        .finally(() => reset());
    }

    if (variant === 'REGISTER') {
      axios
        .post(`/user/register`, data)
        .then((res) => {
          if (res.status === 200) {
            toast.success('註冊成功');
            router.push('/secret');
          }
        })
        .catch(() => {
          toast.error('註冊失敗');
        })
        .finally(() => reset());
    }
  };

  const socialAction = (action: string) => {
    switch (action) {
      case 'google':
        // signIn('google', { callbackUrl: 'http://localhost:3000/conversations' });
        break;
      case 'github':
        // signIn('github', { callbackUrl: 'http://localhost:3000/conversations' });
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
              id="name"
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
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
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