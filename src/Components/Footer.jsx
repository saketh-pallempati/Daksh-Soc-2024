import React from "react";

export const Footer = () => {
  return (
    <div class="tabFooter">
      {/* <img width="10px" height="10px" src="src\assets\img\terminal.png"></img> */}
      <button className="terminal-btn">
        <img
          width="10px"
          height="10px"
          src="src\assets\img\terminal.png"
          alt="Terminal"
        />
      </button>
      <div className="titleText move">Vault Password</div>
    </div>
  );
};
