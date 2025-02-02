import { Component } from 'react';

class Header extends Component {
  ansiiHeader = `   ______          _      __
  / __/ /____ ____| | /| / ___ ________
 _\\ \\/ __/ _ \`/ __| |/ |/ / _ \`/ __(_-<
/_______/\\_,_/_/  |__/|__/\\_,_/_/ /___/
  / _____ ___ ____(____ ___
 _\\ \\/ _ / -_/ __/ / -_(_-<
/___/ .__\\__/\\__/_/\\__/___/
   /_/`;

  render() {
    return <pre className="ascii-header">{this.ansiiHeader}</pre>;
  }
}

export default Header;
