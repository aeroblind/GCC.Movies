
import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    const { searchStr } = this.setState;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="#">GCC Movies</a>
      </nav>
    );
  }
}

export default Header;

