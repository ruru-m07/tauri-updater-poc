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

          console.log(update)

          if (update) {
            const message = `found update ${update.version} from ${update.date} with notes ${update.body} - current version is ${update.currentVersion}`;
            console.log(message)
            setUpdate(message);
          } else {
            setUpdate("no update found");
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
