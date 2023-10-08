'use client';

// import axios from 'axios';
// import { signIn, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AuthSocialButton from './AuthSocialButton';
// import { toast } from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  // const session = useSession();
  // const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (session?.status === 'authenticated') {
  //     router.push('/conversations');
  //   }
  // }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (_data) => {
    setIsLoading(true);

    // if (variant === 'REGISTER') {
    //   axios
    //     .post('/api/register', data)
    //     .then(() =>
    //       signIn('credentials', {
    //         ...data,
    //         redirect: false,
    //       })
    //     )
    //     .then((callback) => {
    //       if (callback?.error) {
    //         toast.error('Invalid credentials!');
    //       }

    //       if (callback?.ok) {
    //         router.push('/conversations');
    //       }
    //     })
    //     .catch(() => toast.error('Something went wrong!'))
    //     .finally(() => setIsLoading(false));
    // }

    // if (variant === 'LOGIN') {
    //   signIn('credentials', {
    //     ...data,
    //     redirect: false,
    //   })
    //     .then((callback) => {
    //       if (callback?.error) {
    //         toast.error('Invalid credentials!');
    //       }

    //       if (callback?.ok) {
    //         router.push('/conversations');
    //       }
    //     })
    //     .finally(() => setIsLoading(false));
    // }
  };

  const socialAction = (_action: string) => {
    // setIsLoading(true);
    // signIn(action, { redirect: false })
    //   .then((callback) => {
    //     if (callback?.error) {
    //       toast.error('Invalid credentials!');
    //     }
    //     if (callback?.ok) {
    //       router.push('/conversations');
    //     }
    //   })
    //   .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">名字</Label>
              <Input
                disabled={isLoading}
                // register={register}
                // errors={errors}
                required
                id="name"
                // label="Name"
              />
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">電子郵件</Label>
            <Input
              disabled={isLoading}
              // register={register}
              // errors={errors}
              required
              id="email"
              // label="Email address"
              type="email"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">密碼</Label>
            <Input
              disabled={isLoading}
              // register={register}
              // errors={errors}
              required
              id="password"
              // label="Password"
              type="password"
            />
          </div>
          <div>
            <Button disabled={isLoading} type="submit" variant="fullwidth">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
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
