'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import axios from '@/lib/axios';
import { readAsBase64 } from '@/lib/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardContent, Card } from '@/components/ui/card';

import { mainPageCategories } from '@/components/navbar/Categories';
import clsx from 'clsx';

export default function Page() {
  const router = useRouter();
  const [topic, setTopic] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      event_start_timestamp: '',
      event_end_timestamp: '',
      location: '',
      capacity: 0,
      register_start_timestamp: '',
      register_end_timestamp: '',
      student_fee: 0,
      non_student_fee: 0,
      category: '',
    },
  });

  const handleFileChange = async (event: React.ChangeEvent): Promise<void> => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
      setImage(`${dataImage}`);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.event_start_timestamp > data.event_end_timestamp) {
      toast.error('活動開始時間不得晚於活動結束時間');
      return;
    } else if (data.register_start_timestamp > data.register_end_timestamp) {
      toast.error('註冊開始時間不得晚於註冊結束時間');
      return;
    } else if (data.register_end_timestamp > data.event_start_timestamp) {
      toast.error('註冊結束時間不得晚於活動開始時間');
      return;
    } else if (data.non_student_fee < data.student_fee) {
      toast.error('非學生價不得低於學生價');
      return;
    } else if (data.register_start_timestamp < new Date().toISOString()) {
      toast.error('註冊開始時間不得早於現在時間');
      return;
    } else if (data.event_start_timestamp < new Date().toISOString()) {
      toast.error('活動開始時間不得早於現在時間');
      return;
    }
    data = {
      ...data,
      category: topic,
      capacity: Number(data.capacity),
      student_fee: Number(data.student_fee),
      non_student_fee: Number(data.non_student_fee),
      picture: image,
    };

    axios
      .post(`/activity`, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success('新增成功');
          router.push('/');
        }
      })
      .catch(() => {
        toast.error('新增失敗');
      });
  };
  return (
    <div className="mx-auto max-w-[850px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">新增活動</h1>
      </div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2 mt-2">
                <Label htmlFor="title">標題</Label>
                <Input
                  id="title"
                  placeholder="新增標題"
                  {...register('title')}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  placeholder="新增描述"
                  {...register('description')}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-start">活動開始時間</Label>
                  <Input
                    id="event-start"
                    required
                    type="datetime-local"
                    {...register('event_start_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-end">活動結束時間</Label>
                  <Input
                    id="event-end"
                    required
                    type="datetime-local"
                    {...register('event_end_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">地點</Label>
                <Input
                  id="location"
                  placeholder="新增地點"
                  required
                  {...register('location')}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">人數</Label>
                <Input
                  id="capacity"
                  placeholder="新增人數"
                  required
                  type="number"
                  {...register('capacity')}
                  disabled={isSubmitting}
                  min={1}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-start">註冊開始時間</Label>
                  <Input
                    id="register-start"
                    required
                    type="datetime-local"
                    {...register('register_start_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-end">註冊結束時間</Label>
                  <Input
                    id="register-end"
                    required
                    type="datetime-local"
                    disabled={isSubmitting}
                    {...register('register_end_timestamp')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-fee">學生價</Label>
                  <Input
                    id="student-fee"
                    required
                    type="number"
                    {...register('student_fee')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="non-student-fee">非學生價</Label>
                  <Input
                    id="non-student-fee"
                    required
                    type="number"
                    {...register('non_student_fee')}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">圖片</Label>
                <Input name="image" type="file" onChange={handleFileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">選擇類別</Label>
                <div className="flex flex-wrap gap-2" id="tags">
                  {mainPageCategories.map(
                    (category) =>
                      category.type !== 'all' && (
                        <Badge
                          className={clsx(
                            `px-2 py-1 text-white rounded ${
                              topic === category.type ? 'bg-sky-600' : 'bg-gray-200 text-gray-800'
                            }`
                          )}
                          key={category.type}
                          onClick={() => setTopic(category.type)}
                          {...register('category')}
                        >
                          {category.label}
                        </Badge>
                      )
                  )}
                </div>
              </div>
              <Button className="w-full" type="submit">
                新增活動
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
