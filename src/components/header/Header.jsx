
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearch = props.onSearch;
    this.state = {
      searchStr: ''
    }
  }


  handleSubmit(e) {
    const{ searchStr } = this.state;
    e.preventDefault();
    this.onSearch(searchStr);
  }

  handleChange(e) {
    this.setState({
      searchStr: e.target.value
    })
  }

  render() {
    const { searchStr } = this.setState;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="#">GCC Movies</a>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchStr} onChange={this.handleChange} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default Header;

