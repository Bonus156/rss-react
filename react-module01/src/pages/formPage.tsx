import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateImageFile } from '../actions/validation';
import { UserInfo } from '../models/types';
import { FormCards } from '../components/formCards';

type FormFields = {
  userName: HTMLInputElement;
  birthday: HTMLInputElement;
  country: HTMLSelectElement;
  isAgree: HTMLInputElement;
  question: HTMLInputElement;
  file: HTMLInputElement;
};

export function FormPage() {
  const [cardInfo, setCards] = useState<UserInfo[]>([]);
  const [confirmation, setConfirmText] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const newCard = {
      userName: data.userName,
      birthday: data.birthday.toDateString(),
      country: data.country,
      isMale: data.question === 'male',
      image: data.file[0],
    };

    setCards([...cardInfo, newCard]);
    setConfirmText('Submit Successfull');
    setTimeout(() => {
      setConfirmText('');
    }, 3000);
    reset();
  };

  return (
    <>
      <form className="container mx-auto flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Your name</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            type="text"
            {...register('userName', {
              required: 'incorrect name',
              minLength: { value: 3, message: 'Min 3 letters' },
              pattern: { value: /^[A-Z]/, message: 'First letter should be uppercase' },
            })}
          />
          {errors?.userName && (
            <span className="text-red-700">{errors?.userName?.message?.toString()}</span>
          )}
        </label>
        <label>
          <span>Your birthday</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            type="date"
            {...register('birthday', {
              required: 'incorrect date',
              valueAsDate: true,
              validate: (value) => Date.parse(value) < Date.now() || 'should be before today',
            })}
          />
          {errors?.birthday && (
            <span className="text-red-700">{errors?.birthday?.message?.toString()}</span>
          )}
        </label>
        <label>
          <span>Choose country:</span>
          <select
            className="cursor-pointer border rounded px-4 py-2 m-2"
            {...register('country', {
              required: 'you must select a country',
              validate: (value: string) => value !== 'unselect' || 'you must select a country',
            })}
          >
            <option value="unselect">Choose here</option>
            <option value="belarus">Belarus</option>
            <option value="ukraine">Ukraine</option>
            <option value="poland">Poland</option>
            <option value="russia">Russia</option>
            <option value="other">Other</option>
          </select>
          {errors?.country && (
            <span className="text-red-700">{errors?.country?.message?.toString()}</span>
          )}
        </label>
        <div>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="mr-2"
              type="radio"
              {...register('question', { required: 'gender must be selected' })}
              value="male"
            />
            Male
          </label>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="mr-2"
              type="radio"
              {...register('question', { required: 'gender must be selected' })}
              value="female"
            />
            Female
          </label>
          {errors.question && <span className="text-red-700">{errors.question.message}</span>}
        </div>
        <label className="mr-2">
          Upload image:
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            accept="image/*"
            type="file"
            {...register('file', {
              required: 'choose image file',
              validate: (value) => validateImageFile(value[0]) || 'upload .jpg or .png file',
            })}
          />
          {errors?.file && <span className="text-red-700">{errors.file.message}</span>}
        </label>
        <label className="cursor-pointer">
          <span>Agree:</span>
          <input
            className="m-2"
            type="checkbox"
            {...register('isAgree', { required: 'your agreement is required' })}
          />
          {errors?.isAgree && <span className="text-red-700">{errors.isAgree.message}</span>}
        </label>
        <div>
          <input
            className="cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500"
            type="submit"
            value="Submit"
          />
          {confirmation && <span className="ml-2 font-bold text-green-800">{confirmation}</span>}
        </div>
      </form>
      <FormCards cardsList={cardInfo} />
    </>
  );
}
