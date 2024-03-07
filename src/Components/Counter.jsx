import React from "react";
import Countdown from "react-countdown";

export const Counter = ({ minutes, seconds, onComplete }) => {
  const time = minutes * 60 * 1000 + seconds * 1000;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      onComplete();
    }
    return (
      <div className="countdown11">
        Time: {minutes}:{seconds} MM:SS
      </div>
    );
  };

  return <Countdown date={Date.now() + time} renderer={renderer} />;
};
