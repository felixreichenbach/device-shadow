import React from "react";

console.log("renderer");

////////////////////////
// IPC Event Handler via preload.js
////////////////////////

window.api.receive("fromMain", (data) => {
    console.log(`Received ${data} from main process`);
});

window.api.send("toMain", "some data");

export class Gui extends React.Component {
  render() {
    return (
      <div>
       <p>
            Logout
        </p>
      </div>
    );
  }
}