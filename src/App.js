import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [breaks, setBreaks] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timer, setTimer] = React.useState("25:00");
  const [onGoing, setonGoing] = React.useState(false);
  const timeInterval = useRef(0);
  const sound = useRef();
  const [timerSeconds, setTimerSeconds] = React.useState(
    timer.match(/^\d+/) * 60 * 1000 + timer.match(/\d+$/) * 1000
  );

  useEffect(
    function () {
      if (timerLabel === "Session" && session === 60) {
        setTimer("60:00");
      } else if (timerLabel === "Session") {
        setTimer(session + ":00");
        setTimerSeconds(session * 60 * 1000);
      } else {
        setTimer(breaks + ":" + "00");
        setTimerSeconds(breaks * 60 * 1000);
      }
    },
    [session, breaks]
  );

  useEffect(
    function () {
      if (timerSeconds < 0) {
        changeLabel();
      } else {
        setTimer(new Date(timerSeconds).toISOString().slice(-10, -5));
      }
    },
    [timerSeconds]
  );

  function reset() {
    setBreaks(5);
    setSession(25);
    setTimer("25:00");
    setTimerLabel("Session");
    setonGoing(false);
    sound.current.pause();
    sound.current.currentTime = 0;
    clearInterval(timeInterval.current);
  }
  function breakDecrease() {
    if (breaks === 1) {
      setBreaks(breaks);
    } else {
      setBreaks(breaks - 1);
    }
  }
  function breakIncrease() {
    if (breaks === 60) {
      setBreaks(breaks);
    } else {
      setBreaks(breaks + 1);
    }
  }
  function sessionDecrease() {
    if (session === 1) {
      setSession(session);
    } else {
      setSession(session - 1);
    }
  }
  function sessionIncrease() {
    if (session === 60) {
      setSession(session);
    } else {
      setSession(session + 1);
    }
  }

  function changeLabel() {
    if (timerLabel === "Session") {
      sound.current.play();
      setTimerSeconds(breaks * 60 * 1000);

      console.log(timerSeconds + "at session");
      setTimerLabel("Break");
      console.log(timerLabel);
      setTimer(new Date(breaks * 60 * 1000).toISOString().slice(-10, -5));
    } else if (timerLabel === "Break") {
      sound.current.play();
      setTimerSeconds(session * 60 * 1000);
      console.log(timerSeconds + "at break");
      console.log(timerLabel);
      setTimerLabel("Session");
      setTimer(new Date(session * 60 * 1000).toISOString().slice(-10, -5));
    }
  }

  function startStop() {
    if (!onGoing) {
      setonGoing(true);

      function countdown() {
        setTimerSeconds((timerSeconds) => timerSeconds - 1000);
        console.log(timerSeconds + "at greater than 0");
      }
      timeInterval.current = setInterval(countdown, 1000);
    } else {
      clearInterval(timeInterval.current);
      setonGoing(false);
    }
  }

  return (
    <div className="App">
      <div id="container">
        <div id="title">25 + 5 Clock</div>
        <div id="length-group">
          <div id="break-group">
            <div id="break-label">Break Length</div>
            <div class="length-control">
              <div id="break-decrement" onClick={breakDecrease}>
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
              </div>
              <div id="break-length">{breaks}</div>
              <div id="break-increment" onClick={breakIncrease}>
                <FontAwesomeIcon icon={faArrowUp} size="2x" />
              </div>
            </div>
          </div>
          <div id="session-group">
            <div id="session-label">Session Length</div>
            <div class="length-control">
              <div id="session-decrement" onClick={sessionDecrease}>
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
              </div>
              <div id="session-length">{session}</div>
              <div id="session-increment" onClick={sessionIncrease}>
                <FontAwesomeIcon icon={faArrowUp} size="2x" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="time-display-section">
            <div id="time-display">
              <div id="timer-label">{timerLabel}</div>
              <div id="time-left">{timer}</div>
            </div>
          </div>
        </div>

        <audio
          id="beep"
          ref={sound}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
        <div id="controls-section">
          <div id="buttons">
            <div id="start_stop" onClick={startStop}>
              <FontAwesomeIcon icon={faPlay} size="2x" />
              <FontAwesomeIcon icon={faPause} size="2x" />
            </div>
            <div id="reset" onClick={reset}>
              <FontAwesomeIcon icon={faSync} size="2x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}