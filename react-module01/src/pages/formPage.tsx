import { useForm, SubmitHandler } from 'react-hook-form';
import { validateImageFile } from '../actions/validation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FormCards } from '../components/formCards';
import { addUser, showConfirmation } from '../store/userSlice';

type FormFields = {
  userName: string;
  birthday: Date;
  country: string;
  isAgree: boolean;
  question: string;
  file: FileList;
};

export function FormPage() {
  const dispatch = useAppDispatch();
  const confirmText = useAppSelector<string>((state) => state.user.confirmation);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const newCard = {
      userName: data.userName,
      birthday: data.birthday.toDateString(),
      country: data.country,
      isMale: data.question === 'male',
      image: URL.createObjectURL(data.file[0]),
    };

    dispatch(addUser(newCard));
    dispatch(showConfirmation('Submit Successfull'));
    setTimeout(() => {
      dispatch(showConfirmation(''));
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
              required: 'Type your name',
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
              required: 'Choose birthday date',
              valueAsDate: true,
              validate: (value) => value.valueOf() < Date.now() || 'Should be before today',
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
              required: 'You must select a country',
              validate: (value: string) => value !== 'unselect' || 'You must select a country',
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
              {...register('question', { required: 'Gender must be selected' })}
              value="male"
            />
            Male
          </label>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="mr-2"
              type="radio"
              {...register('question', { required: 'Gender must be selected' })}
              value="female"
            />
            Female
          </label>
          {errors?.question && (
            <span className="text-red-700">{errors?.question?.message?.toString()}</span>
          )}
        </div>
        <label className="mr-2">
          Upload image:
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            accept="image/*"
            type="file"
            {...register('file', {
              required: 'Choose image file',
              validate: (value) => validateImageFile(value[0]) || 'Upload .jpg or .png file',
            })}
          />
          {errors?.file && <span className="text-red-700">{errors.file.message?.toString()}</span>}
        </label>
        <label className="cursor-pointer">
          <span>Agree:</span>
          <input
            className="m-2"
            type="checkbox"
            {...register('isAgree', { required: 'Your agreement is required' })}
          />
          {errors?.isAgree && (
            <span className="text-red-700">{errors.isAgree.message?.toString()}</span>
          )}
        </label>
        <div>
          <input
            className="cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500"
            type="submit"
            value="Submit"
          />
          {confirmText && <span className="ml-2 font-bold text-green-800">{confirmText}</span>}
        </div>
      </form>
      <FormCards />
    </>
  );
}
