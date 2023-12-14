'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/LoginInput';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';
import { useMember } from '@/hooks/useMember';
import { UpdateUserPayload } from '@/lib/shared_types';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

const UserProfileForm = () => {
  const [isStudent, setIsStudent] = useState(false);
  const { member, student, fetchMember } = useMember();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: member?.name,
      email: member?.email,
      age: member?.age,
      phone_number: member?.phone,
      isStudent: member?.member_role === 'Student' ? true : false,
      school_name: '',
      department: '',
      grade: '',
    },
  });

  useEffect(() => {
    if (member?.member_role === 'Student') {
      setIsStudent(true);
      setValue('isStudent', true);
    }
  }, [member?.member_role, setValue]);

  useEffect(() => {
    if (student) {
      setValue('school_name', student.school_name);
      setValue('department', student.department);
      setValue('grade', student.grade);
    }
  }, [student, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data = {
      ...data,
      age: Number(data.age),
    };
    const hashed_password = member?.password;
    const user: UpdateUserPayload = {
      name: data.username,
      phone: data.phone_number,
      email: data.email,
      password: hashed_password!,
      age: data.age,
      member_role: isStudent ? 'Student' : 'Non-student',
      school_name: data.school_name,
      department: data.department,
      grade: data.grade,
    };
    axios
      .put(`/user/`, user)
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
        <div className="text-xl font-semibold">使用者個人資料</div>
        <Separator orientation="horizontal" className="bg-black" />
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            defaultValue={member?.name}
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="username"
            label="姓名"
          />
          <Input
            defaultValue={member?.email}
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="email"
            label="電子郵件"
            type="email"
          />
          {/* age shoud > 0 */}
          <Input
            defaultValue={member?.age}
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="age"
            label="年紀"
            type="number"
          />
          <Input
            defaultValue={member?.phone}
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
