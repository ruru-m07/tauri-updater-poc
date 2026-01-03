import { check } from "@tauri-apps/plugin-updater";

import "./App.css";

function App() {
  return (
    <main>
      <button
        onClick={async () => {
          const data = await check();
          console.log(data);
        }}
      >
        check for updates
      </button>
    </main>
  );
}

export default App;
