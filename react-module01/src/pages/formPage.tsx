import React, { Component, createRef } from 'react';
import { validateForm } from '../actions/validation';

type Props = {
  input: string;
};

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
};

interface State {
  selectValue: string | undefined;
  errors: Errors;
}

export class FormPage extends Component<Props, State> {
  inputName: React.RefObject<HTMLInputElement>;
  inputDate: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  inputIsAgree: React.RefObject<HTMLInputElement>;
  inputRadioYes: React.RefObject<HTMLInputElement>;
  inputRadioNo: React.RefObject<HTMLInputElement>;
  inputFile: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      selectValue: 'unselect',
      errors: {
        errorName: '',
        errorBirthday: '',
        errorCountry: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputName = createRef<HTMLInputElement>();
    this.inputDate = createRef<HTMLInputElement>();
    this.selectCountry = createRef<HTMLSelectElement>();
    this.inputIsAgree = createRef<HTMLInputElement>();
    this.inputRadioYes = createRef<HTMLInputElement>();
    this.inputRadioNo = createRef<HTMLInputElement>();
    this.inputFile = createRef<HTMLInputElement>();
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    this.setState({ selectValue: this.selectCountry.current?.value });
    this.validateInput();
    console.log({
      name: this.inputName.current?.value,
      date: this.inputDate.current?.value,
      country: this.selectCountry.current?.value,
      isAgree: this.inputIsAgree.current?.checked,
      question: this.inputRadioYes.current?.checked,
      file:
        this.inputFile.current?.files == undefined ? '' : this.inputFile.current?.files[0]?.name,
    });
  };

  validateInput() {
    const { isNameCorrect, isDateCorrect, isCountrySelected } = validateForm(
      this.inputName.current?.value,
      this.inputDate.current?.value,
      this.selectCountry.current?.value as string
    );
    this.setState({
      errors: {
        errorName: isNameCorrect ? '' : 'incorrect name',
        errorBirthday: isDateCorrect ? '' : 'incorrect date',
        errorCountry: isCountrySelected ? '' : 'you must select a country',
      },
    });
  }

  render() {
    const { errorName, errorBirthday, errorCountry } = this.state.errors;
    return (
      <form className="container mx-auto" onSubmit={this.handleSubmit}>
        <label>
          <span>Your name</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            name="name"
            type="text"
            defaultValue="My Name is ..."
            ref={this.inputName}
          />
          <br />
          <span>{errorName}</span>
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
          <span>{errorBirthday}</span>
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
          <span>{errorCountry}</span>
        </label>
        <br />
        <label className="cursor-pointer">
          <span>Agree:</span>
          <input className="m-2" name="isAgree" type="checkbox" ref={this.inputIsAgree} />
        </label>
        <br />
        <label className="cursor-pointer mr-4 my-4">
          <input className="mr-2" type="radio" name="question" ref={this.inputRadioYes} />
          Yes
        </label>
        <label className="cursor-pointer my-4">
          <input className="mr-2" type="radio" name="question" ref={this.inputRadioNo} />
          No
        </label>
        <br />
        <label className="mr-2">
          Upload file:
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            name="file"
            type="file"
            ref={this.inputFile}
          />
        </label>
        <br />
        <input
          className="cursor-pointer border rounded px-4 py-2 bg-green-400 hover:bg-green-500"
          type="submit"
          value="send"
        />
      </form>
    );
  }
}
