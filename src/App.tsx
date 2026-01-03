import { check } from "@tauri-apps/plugin-updater";

import "./App.css";
import { useState } from "react";

function App() {
  const [update, setUpdate] = useState<string | null>(null);
  
  return (
    <main>
      <button
        onClick={async () => {
          const update = await check();

          if (update) {
            setUpdate(`found update ${update.version} from ${update.date} with notes ${update.body} - current version is ${update.currentVersion}`);
          }
        }}
      >
        check for updates
      </button>
      {update && <p>{update}</p>}
    </main>
  );
}

export default App;
