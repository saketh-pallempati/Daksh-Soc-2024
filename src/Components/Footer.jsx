import "./styles/Footer.css";
export const Footer = ({ pswd }) => {
  console.log(pswd);
  return (
    <div class="tabFooter">
      <button className="terminal-btn">
        <img
          width="10px"
          height="10px"
          src="src\assets\img\terminal.png"
          alt="Terminal"
        />
      </button>
      <div className="Footer-Text">Your Vault Password:{pswd} </div>
    </div>
  );
};
