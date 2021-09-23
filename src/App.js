import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [breaks, setBreaks] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timer, setTimer] = React.useState("25:00");
  const [onOff, setOnOff] = React.useState("off");

  function reset() {
    setBreaks(5);
    setSession(25);
  }
  function breakDecrease() {
    if (breaks === 1) {
      setBreaks(breaks);
    } else {
      setBreaks(breaks - 1);
    }
  }
  function breakIncrease() {
    setBreaks(breaks + 1);
  }
  function sessionDecrease() {
    setSession(session - 1);
  }
  function sessionIncrease() {
    if (session === 60) {
      setSession(session);
    } else {
      setSession(session + 1);
    }
  }

  return (
    <div className="App">
      <div>25 + 5 Clock</div>
      <div id="break-label">Break Length</div>
      <div id="break-decrement" onClick={breakDecrease}>
        down
      </div>
      <div id="break-length">{breaks}</div>
      <div id="break-increment" onClick={breakIncrease}>
        up
      </div>

      <div id="session-label">Session Length</div>
      <div id="session-decrement" onClick={sessionDecrease}>
        down
      </div>
      <div id="session-length">{session}</div>
      <div id="session-increment" onClick={sessionIncrease}>
        up
      </div>

      <div>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{timer}</div>
      </div>

      <div id="start_stop">start/stop</div>
      <div id="reset" onClick={reset}>
        reset
      </div>
    </div>
  );
}
