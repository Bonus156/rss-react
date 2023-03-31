import React, { useCallback, useRef, useState } from 'react';
import { validateForm, validateImageFile } from '../actions/validation';
import { UserInfo } from '../models/types';
import { FormCards } from '../components/formCards';

type FormFields = {
  name: HTMLInputElement;
  date: HTMLInputElement;
  country: HTMLSelectElement;
  isAgree: HTMLInputElement;
  question: HTMLInputElement;
  file: HTMLInputElement;
};

export function FormPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputDate = useRef<HTMLInputElement>(null);
  const selectCountry = useRef<HTMLSelectElement>(null);
  const inputIsAgree = useRef<HTMLInputElement>(null);
  const inputRadioMale = useRef<HTMLInputElement>(null);
  const inputRadioFemale = useRef<HTMLInputElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);

  const [selectValue, setSelectVal] = useState('unselect');
  const [errors, setErrorsText] = useState({
    errorName: '',
    errorBirthday: '',
    errorCountry: '',
    errorAnswer: '',
    errorUpload: '',
    errorAgreement: '',
  });
  const [cardInfo, setCards] = useState<UserInfo[]>([]);
  const [confirmation, setConfirmText] = useState('');

  const validateInput = useCallback(() => {
    const {
      isNameCorrect,
      isDateCorrect,
      isCountrySelected,
      isGenderSelected,
      isFileUploaded,
      isAgree,
    } = validateForm(
      inputName.current?.value,
      inputDate.current?.value,
      selectCountry.current?.value as string,
      !!inputRadioMale.current?.checked || !!inputRadioFemale.current?.checked,
      validateImageFile((inputFile.current?.files as FileList)[0]),
      !!inputIsAgree.current?.checked
    );
    setErrorsText({
      errorName: isNameCorrect ? '' : 'incorrect name',
      errorBirthday: isDateCorrect ? '' : 'incorrect date',
      errorCountry: isCountrySelected ? '' : 'you must select a country',
      errorAnswer: isGenderSelected ? '' : 'gender must be selected',
      errorUpload: isFileUploaded ? '' : 'upload .jpg or .pdf file',
      errorAgreement: isAgree ? '' : 'your agreement is required',
    });
    return (
      isNameCorrect &&
      isDateCorrect &&
      isCountrySelected &&
      isGenderSelected &&
      isFileUploaded &&
      isAgree
    );
  }, []);

  const pushInfo = useCallback(
    (newCard: UserInfo) => {
      if (validateInput()) {
        setCards([...cardInfo, newCard]);
        setConfirmText('Submit Successfull');
        setTimeout(() => {
          setConfirmText('');
        }, 3000);
        formRef.current?.reset();
      }
    },
    [validateInput, cardInfo]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSelectVal(selectCountry.current?.value as string);
      pushInfo({
        userName: inputName.current?.value as string,
        birthday: inputDate.current?.value as string,
        country: selectValue,
        isMale: !!inputRadioMale.current?.checked,
        image: (inputFile.current?.files as FileList)[0],
      });
    },
    [pushInfo, selectValue]
  );

  const { errorName, errorBirthday, errorCountry, errorAnswer, errorUpload, errorAgreement } =
    errors;
  return (
    <>
      <form className="container mx-auto flex flex-col" ref={formRef} onSubmit={handleSubmit}>
        <label>
          <span>Your name</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            name="name"
            type="text"
            ref={inputName}
          />
          <span className="text-red-700">{errorName}</span>
        </label>
        <label>
          <span>Your birthday</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            name="date"
            type="date"
            ref={inputDate}
          />
          <span className="text-red-700">{errorBirthday}</span>
        </label>
        <label>
          <span>Choose country:</span>
          <select
            className="cursor-pointer border rounded px-4 py-2 m-2"
            name="country"
            ref={selectCountry}
          >
            <option value="unselect">Choose here</option>
            <option value="belarus">Belarus</option>
            <option value="ukraine">Ukraine</option>
            <option value="poland">Poland</option>
            <option value="russia">Russia</option>
            <option value="other">Other</option>
          </select>
          <span className="text-red-700">{errorCountry}</span>
        </label>
        <div>
          <label className="cursor-pointer mr-4 my-4">
            <input className="mr-2" type="radio" name="question" ref={inputRadioMale} />
            Male
          </label>
          <label className="cursor-pointer mr-4 my-4">
            <input className="mr-2" type="radio" name="question" ref={inputRadioFemale} />
            Female
          </label>
          <span className="text-red-700">{errorAnswer}</span>
        </div>
        <label className="mr-2">
          Upload image:
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            name="file"
            accept="image/*"
            type="file"
            ref={inputFile}
          />
          <span className="text-red-700">{errorUpload}</span>
        </label>
        <label className="cursor-pointer">
          <span>Agree:</span>
          <input className="m-2" name="isAgree" type="checkbox" ref={inputIsAgree} />
          <span className="text-red-700">{errorAgreement}</span>
        </label>
        <div>
          <input
            className="cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500"
            type="submit"
            value="Submit"
          />
          <span className="ml-2 font-bold text-green-800">{confirmation}</span>
        </div>
      </form>
      <FormCards cardsList={cardInfo} />
    </>
  );
}
