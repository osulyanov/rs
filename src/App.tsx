import './App.css';

const ansiiHeader = `   ______          _      __
  / __/ /____ ____| | /| / ___ ________
 _\\ \\/ __/ _ \`/ __| |/ |/ / _ \`/ __(_-<
/_______/\\_,_/_/  |__/|__/\\_,_/_/ /___/
  / _____ ___ ____(____ ___
 _\\ \\/ _ / -_/ __/ / -_(_-<
/___/ .__\\__/\\__/_/\\__/___/
   /_/`;

function App() {
  const dataData = `
+-------+-----------------------------------------------+
| Name  |                  Description                  |
+-------+-----------------------------------------------+
| Human | classification: mammal, designation: sentient |
+-------+-----------------------------------------------+`;

  return (
    <div className="container">
      <pre className="ascii-header">{ansiiHeader}</pre>
      <div className="input-group">
        <input
          type="text"
          className="input-field"
          placeholder="[ENTER LOCATION]"
        />
        <button onClick={() => console.log('fetch')} className="fetch-button">
          &gt; SCAN
        </button>
      </div>
      <pre className="data-report hidden">{dataData}</pre>
    </div>
  );
}

export default App;
