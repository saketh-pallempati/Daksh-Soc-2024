import React from "react";

export const Header = () => {
  return (
    <div class="tabHeader">
      <div class="titleText" onClick="maxBtnFunc()">
        AstroSecure
      </div>
      <div class="closeBtn">
        <img
          type="button"
          id="closeBtn7"
          height="18px"
          width="18px"
          onClick="closeBtnFnc7()"
          src="https://assets.codepen.io/6611087/closeBtn.svg"
        />
      </div>
      <div class="maxBtn">
        <svg
          type="button"
          id="maxBtn7"
          onClick="maxBtnFnc7()"
          src="https://assets.codepen.io/6611087/maxBtn.svg"
        />
      </div>
      <div class="minBtn">
        <svg
          type="button"
          id=" minBtn7"
          onClick="minBtnFnc7()"
          src="https://assets.codepen.io/6611087/minBtn.svg"
        />
      </div>
      <div class="favicon">
        <img width="20px" height="20px" src="src\assets\img\daksh.png"></img>
      </div>
    </div>
  );
};
