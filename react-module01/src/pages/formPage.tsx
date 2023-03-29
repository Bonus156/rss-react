import React, { Component, createRef } from 'react';
import { validateForm, validateImageFile } from '../actions/validation';
import { CardsState, UserInfo } from '../models/types';
import { FormCards } from '../components/formCards';

type FormFields = {
  name: HTMLInputElement;
  date: HTMLInputElement;
  country: HTMLSelectElement;
  isAgree: HTMLInputElement;
  question: HTMLInputElement;
  file: HTMLInputElement;
};

type Errors = {
  errorName: string;
  errorBirthday: string;
  errorCountry: string;
  errorAnswer: string;
  errorUpload: string;
  errorAgreement: string;
};

interface State {
  selectValue: string | undefined;
  errors: Errors;
  cardInfo: UserInfo[];
  confirmation: string;
}

interface FormPageProps {
  setCards: CardsState;
}

export class FormPage extends Component<FormPageProps, State> {
  inputName: React.RefObject<HTMLInputElement>;
  inputDate: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  inputIsAgree: React.RefObject<HTMLInputElement>;
  inputRadioMale: React.RefObject<HTMLInputElement>;
  inputRadioFemale: React.RefObject<HTMLInputElement>;
  inputFile: React.RefObject<HTMLInputElement>;
  formRef: React.RefObject<HTMLFormElement>;

  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      selectValue: 'unselect',
      errors: {
        errorName: '',
        errorBirthday: '',
        errorCountry: '',
        errorAnswer: '',
        errorUpload: '',
        errorAgreement: '',
      },
      cardInfo: [],
      confirmation: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = createRef<HTMLFormElement>();
    this.inputName = createRef<HTMLInputElement>();
    this.inputDate = createRef<HTMLInputElement>();
    this.selectCountry = createRef<HTMLSelectElement>();
    this.inputIsAgree = createRef<HTMLInputElement>();
    this.inputRadioMale = createRef<HTMLInputElement>();
    this.inputRadioFemale = createRef<HTMLInputElement>();
    this.inputFile = createRef<HTMLInputElement>();
  }

  pushInfo(newCard: UserInfo) {
    if (this.validateInput()) {
      this.state.cardInfo.push(newCard);
      this.setState({
        confirmation: 'Submit Successfull',
      });
      setTimeout(() => {
        this.setState({ confirmation: '' });
      }, 3000);
      this.formRef.current?.reset();
    }
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    this.pushInfo({
      userName: this.inputName.current?.value as string,
      birthday: this.inputDate.current?.value as string,
      country: this.selectCountry.current?.value as string,
      isMale: !!this.inputRadioMale.current?.checked,
      image: (this.inputFile.current?.files as FileList)[0],
    });
    this.setState({
      selectValue: this.selectCountry.current?.value,
    });
  };

  validateInput() {
    const {
      isNameCorrect,
      isDateCorrect,
      isCountrySelected,
      isGenderSelected,
      isFileUploaded,
      isAgree,
    } = validateForm(
      this.inputName.current?.value,
      this.inputDate.current?.value,
      this.selectCountry.current?.value as string,
      !!this.inputRadioMale.current?.checked || !!this.inputRadioFemale.current?.checked,
      validateImageFile((this.inputFile.current?.files as FileList)[0]),
      !!this.inputIsAgree.current?.checked
    );
    this.setState({
      errors: {
        errorName: isNameCorrect ? '' : 'incorrect name',
        errorBirthday: isDateCorrect ? '' : 'incorrect date',
        errorCountry: isCountrySelected ? '' : 'you must select a country',
        errorAnswer: isGenderSelected ? '' : 'gender must be selected',
        errorUpload: isFileUploaded ? '' : 'upload .jpg or .pdf file',
        errorAgreement: isAgree ? '' : 'your agreement is required',
      },
    });
    return (
      isNameCorrect &&
      isDateCorrect &&
      isCountrySelected &&
      isGenderSelected &&
      isFileUploaded &&
      isAgree
    );
  }

  render() {
    const { errorName, errorBirthday, errorCountry, errorAnswer, errorUpload, errorAgreement } =
      this.state.errors;
    const confirmation = this.state.confirmation;
    return (
      <>
        <form className="container mx-auto" ref={this.formRef} onSubmit={this.handleSubmit}>
          <label>
            <span>Your name</span>
            <input
              className="cursor-text border rounded px-4 py-2 m-2"
              name="name"
              type="text"
              ref={this.inputName}
            />
            <br />
            <span className="text-red-700">{errorName}</span>
          </label>
          <br />
          <label>
            <span>Your birthday</span>
            <input
              className="cursor-text border rounded px-4 py-2 m-2"
              name="date"
              type="date"
              ref={this.inputDate}
            />
            <br />
            <span className="text-red-700">{errorBirthday}</span>
          </label>
          <br />
          <label>
            <span>Choose country:</span>
            <select
              className="cursor-pointer border rounded px-4 py-2 m-2"
              name="country"
              ref={this.selectCountry}
            >
              <option value="unselect">Choose here</option>
              <option value="belarus">Belarus</option>
              <option value="ukraine">Ukraine</option>
              <option value="poland">Poland</option>
              <option value="russia">Russia</option>
              <option value="other">Other</option>
            </select>
            <br />
            <span className="text-red-700">{errorCountry}</span>
          </label>
          <br />
          <label className="cursor-pointer mr-4 my-4">
            <input className="mr-2" type="radio" name="question" ref={this.inputRadioMale} />
            Male
          </label>
          <label className="cursor-pointer my-4">
            <input className="mr-2" type="radio" name="question" ref={this.inputRadioFemale} />
            Female
          </label>
          <br />
          <span className="text-red-700">{errorAnswer}</span>
          <br />
          <label className="mr-2">
            Upload image:
            <input
              className="cursor-text border rounded px-4 py-2 m-2"
              name="file"
              type="file"
              ref={this.inputFile}
            />
            <br />
            <span className="text-red-700">{errorUpload}</span>
          </label>
          <br />
          <label className="cursor-pointer">
            <span>Agree:</span>
            <input className="m-2" name="isAgree" type="checkbox" ref={this.inputIsAgree} />
          </label>
          <br />
          <span className="text-red-700">{errorAgreement}</span>
          <br />
          <input
            className="cursor-pointer border rounded px-4 py-2 bg-green-400 hover:bg-green-500"
            type="submit"
            value="send"
          />
          <span className="ml-2 font-bold text-green-800">{confirmation}</span>
        </form>
        <FormCards cardsList={this.state.cardInfo} />
      </>
    );
  }
}
