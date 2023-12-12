'use client';
import { useState } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaRegStar } from 'react-icons/fa';

export default function Rating() {
  const [star, setStar] = useState(0);

  const handleRating = (rate: number) => {
    setStar(rate);
  };

  return (
    <Card className="flex flex-col justify-between w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">評分</CardTitle>
        <CardDescription className="text-gray-700 mt-2">歡迎留下評分</CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6 flex-grow flex flex-col">
        <div className=" border-gray-200 flex items-center justify-start">
          <FaRegStar
            className="h-10 w-10 px-1"
            onClick={() => handleRating(1)}
            color={star >= 1 ? 'yellow' : 'gray'}
          />
          <FaRegStar
            className="h-10 w-10 px-1"
            onClick={() => handleRating(2)}
            color={star >= 2 ? 'yellow' : 'gray'}
          />
          <FaRegStar
            className="h-10 w-10 px-1"
            onClick={() => handleRating(3)}
            color={star >= 3 ? 'yellow' : 'gray'}
          />
          <FaRegStar
            className="h-10 w-10 px-1"
            onClick={() => handleRating(4)}
            color={star >= 4 ? 'yellow' : 'gray'}
          />
          <FaRegStar
            className="h-10 w-10 px-1"
            onClick={() => handleRating(5)}
            color={star >= 5 ? 'yellow' : 'gray'}
          />
        </div>
        <textarea
          aria-label="Leave a comment"
          className="w-full h-24 p-3 border border-gray-300 rounded-md flex-grow"
          placeholder="Type your comment here..."
        />
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        <Button className="w-full text-white bg-blue-500 hover:bg-blue-600">提交評論</Button>
      </CardFooter>
    </Card>
  );
}
