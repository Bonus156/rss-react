import { UserInfoString } from '../models/types';

export function UserCard({ userName, birthday, country, isMale, image }: UserInfoString) {
  const appeal = isMale ? 'Mr ' : 'Ms ';
  return (
    <div className="border py-2 px-2 rounded w-[calc((100%-1rem)/3)] flex flex-col items-center lg:w-[calc((100%-1.5rem)/4)]">
      <img src={image} className="w-full" alt="avatar" />
      <p className="font-bold">
        <span>
          {appeal}
          {userName}
        </span>
      </p>
      <p>birthday: {birthday}</p>
      <p className="capitalize">country: {country}</p>
    </div>
  );
}
