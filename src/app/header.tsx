import { Link } from 'react-router';

function Header() {
  const asciiHeader = `   ______          _      __
  / __/ /____ ____| | /| / ___ ________
 _\\ \\/ __/ _ \`/ __| |/ |/ / _ \`/ __(_-<
/_______/\\_,_/_/  |__/|__/\\_,_/_/ /___/
  / _____ ___ ____(____ ___
 _\\ \\/ _ / -_/ __/ / -_(_-<
/___/ .__\\__/\\__/_/\\__/___/
   /_/`;

  return (
    <Link to="/" className="ascii-header">
      <pre>{asciiHeader}</pre>
    </Link>
  );
}

export default Header;
