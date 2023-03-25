import React, { Component, createRef } from 'react';

type Props = {
  input: string;
};

export class DateForm extends Component {
  inputName: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputName = createRef<HTMLInputElement>();
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="container mx-auto" onSubmit={this.handleSubmit}>
        <label>
          <span>Type your birthday</span>
          <br />
          <input
            className="cursor-text border rounded px-4 py-2 mr-2"
            name="name"
            type="date"
            ref={this.inputName}
          />
        </label>
      </form>
    );
  }
}
