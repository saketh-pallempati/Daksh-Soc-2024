import "./styles/Footer.css";
export const Footer = ({ value }) => {
  return (
    <div class="tabFooter">
      <button
        className="terminal-btn"
        onClick={() =>
          window.open("https://daksh-soc-terminal.vercel.app", "_blank")
        }
      >
        <img
          width="10px"
          height="10px"
          src="src\assets\img\terminal.png"
          alt="Terminal"
        />
      </button>
      <xdiv className="Footer-Text">Previous command:{value} </xdiv>
    </div>
  );
};
