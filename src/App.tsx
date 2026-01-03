import { check } from "@tauri-apps/plugin-updater";

import "./App.css";
import { useState } from "react";
import { relaunch } from "@tauri-apps/plugin-process";

function App() {
  const [update, setUpdate] = useState<string | null>(null);

  const [logs, setLogs] = useState<string[]>([]);

  const startDownloadAndInstall = async () => {
    const update = await check();

    if (update) {
      console.log(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      let downloaded = 0;
      let contentLength = 0;

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength as number;
            setLogs((logs) => [
              ...logs,
              `started downloading ${event.data.contentLength} bytes`,
            ]);
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            setLogs((logs) => [
              ...logs,
              `downloaded ${downloaded} from ${contentLength}`,
            ]);
            break;
          case "Finished":
            setLogs((logs) => [...logs, "download finished"]);
            break;
        }
      });

      setLogs((logs) => [...logs, "update installed"]);
    }
  };

  return (
    <main>
      <button
        onClick={async () => {
          const update = await check();

          console.log(update);

          if (update) {
            const message = `found update ${update.version} from ${update.date}   - current version is ${update.currentVersion}`;
            console.log(message);
            setUpdate(message);
          } else {
            setUpdate("no update found");
          }
        }}
      >
        check for updates
      </button>
      <button onClick={startDownloadAndInstall}>
        download and install update
      </button>
      <button onClick={relaunch}>relaunch</button>
      {update && <p>{update}</p>}
      <hr />
      <div>
        logs:
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </main>
  );
}

export default App;
