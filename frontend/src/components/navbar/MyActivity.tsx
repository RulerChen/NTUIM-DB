import { useRouter } from "next/navigation";
const MyActivity = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <div
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        onClick={() => handleClick("/userActivities/")}
      >
        我的活動
      </div>
    </div>
  );
};
export default MyActivity;
