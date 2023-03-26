import { UserInfo } from '../models/types';

export function UserCard({ userName, birthday, country, isMale, image }: UserInfo) {
  const appeal = isMale ? 'Mr' : 'Mrs';
  return (
    <div className="border py-2 px-2 rounded w-[calc((100%-1rem)/3)] flex flex-col items-center lg:w-[calc((100%-1.5rem)/4)]">
      <img src={URL.createObjectURL(image)} className="w-full" alt="avatar" />
      <p className="font-bold">
        <span>{appeal}</span>
        {userName}
      </p>
      <p>{birthday}</p>
      <p>{country}</p>
    </div>
  );
}
