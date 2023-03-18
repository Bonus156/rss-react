import React from 'react';

export class SearchBar extends React.Component {
  constructor(props: string) {
    super(props);
    this.state = { value: localStorage.getItem('search') || '' };

    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: localStorage.getItem('search'),
    });
  }

  componentWillUnmount() {
    localStorage.setItem('search', this.state.value);
  }

  changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="py-2 relative w-1/2 text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-base focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          value={this.state.value}
          onChange={this.changeHandler}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 px-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 m-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    );
  }
}
