import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { BiSearch } from 'react-icons/bi';

export default function Search() {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchQuery = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter') {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="relative w-80">
      <div className="absolute top-3 left-3">
        <BiSearch className="text-gray-400" />
      </div>
      <Input type="text" placeholder="Search" className="pl-12 pr-4" onKeyDown={handleKeyDown} />
    </div>
  );
}
