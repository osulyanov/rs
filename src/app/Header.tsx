function Header() {
  const asciiHeader = `   ______          _      __
  / __/ /____ ____| | /| / ___ ________
 _\\ \\/ __/ _ \`/ __| |/ |/ / _ \`/ __(_-<
/_______/\\_,_/_/  |__/|__/\\_,_/_/ /___/
  / _____ ___ ____(____ ___
 _\\ \\/ _ / -_/ __/ / -_(_-<
/___/ .__\\__/\\__/_/\\__/___/
   /_/`;

  return <pre className="ascii-header">{asciiHeader}</pre>;
}

export default Header;
