import React from 'react';

type Props = {
  input: string;
};

export class FormPage extends React.Component {
  inputName: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputName = React.createRef<HTMLInputElement>();
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="container mx-auto" onSubmit={this.handleSubmit}>
        <label>
          What?
          <input name="country" type="text" ref={this.inputName} />
        </label>
        <input type="submit" value="send" />
      </form>
    );
  }
}
