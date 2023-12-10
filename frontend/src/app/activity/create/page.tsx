'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardContent, Card } from '@/components/ui/card';

import { categories } from '@/components/navbar/Categories';

export default function Page() {
  return (
    <div className="mx-auto max-w-[850px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">新增活動</h1>
      </div>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 mt-2">
              <Label htmlFor="title">標題</Label>
              <Input id="title" placeholder="新增標題" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea id="description" placeholder="新增描述" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-start">活動開始時間</Label>
                <Input id="event-start" required type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end">活動結束時間</Label>
                <Input id="event-end" required type="datetime-local" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">地點</Label>
              <Input id="location" placeholder="新增地點" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">人數</Label>
              <Input id="capacity" placeholder="新增人數" required type="number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="register-start">註冊開始時間</Label>
                <Input id="register-start" required type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-end">註冊結束時間</Label>
                <Input id="register-end" required type="datetime-local" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-fee">學生價</Label>
                <Input id="student-fee" required type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="non-student-fee">非學生價</Label>
                <Input id="non-student-fee" required type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">選擇主題</Label>
              <div className="flex flex-wrap gap-2" id="tags">
                {categories.map((category) => (
                  <Badge className="px-2 py-1 text-white rounded" key={category.type}>
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
            <Button className="w-full" type="submit">
              新增活動
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
