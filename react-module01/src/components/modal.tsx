import React, { MouseEvent } from 'react';
import { Character } from '../models/types';

export interface ModalProps {
  hero: Character;
  isVisible?: boolean;
  setVisible: (isVisible: boolean) => void;
}

export function Modal({ hero, isVisible, setVisible }: ModalProps) {
  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={
        isVisible
          ? 'modal flex flex-col block justify-center w-full h-full backdrop-blur-lg fixed inset-0'
          : 'hidden'
      }
      onClick={handleClick}
    >
      <div
        className="border bg-white py-2 px-2 rounded w-1/2 flex flex-col items-center mx-auto lg:w-1/3"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="inline-block self-end absolute cursor-pointer hover:scale-105"
          onClick={handleClick}
        >
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke="#d2d2d2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.16998 14.83L14.83 9.17004"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.83 14.83L9.16998 9.17004"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <img src={hero.image} className="w-full" alt={hero.name} />
        <p className="font-bold text-lg">
          <span className="font-normal">Name: </span>
          {hero.name}
        </p>
        <p>Origin: {hero.origin.name}</p>
        <p>Status: {hero.status}</p>
        <p>Species: {hero.species}</p>
        <p>Gender: {hero.gender}</p>
        <p>Location: {hero.location.name}</p>
        <p className="text-sm">Created: {new Date(hero.created).toDateString()}</p>
        <p className="my-2 text-sm self-start">ID: {hero.id}</p>
      </div>
    </div>
  );
}
