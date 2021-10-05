import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  const [breaks, setBreaks] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timer, setTimer] = React.useState("25:00");
  const [onGoing, setonGoing] = React.useState(false);
  const timeInterval = useRef(0);
  const sound = useRef();

  useEffect(
    function () {
      if (timerLabel === "Session") {
        setTimer(session + ":" + "00");
      } else {
        setTimer(breaks + ":" + "00");
      }
    },
    [session, breaks]
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

  function startStop() {
    if (!onGoing) {
      setonGoing(true);
      var timerSeconds =
        timer.match(/^\d+/) * 60 * 1000 + timer.match(/\d+$/) * 1000;

      function countdown() {
        console.log(timerSeconds);
        if (timerSeconds === 0 && timerLabel === "Session") {
          sound.current.play();
          timerSeconds = breaks * 60 * 1000;
          console.log(timerLabel);
          console.log(timerSeconds + "at session");
          setTimerLabel("Breaks");
          setTimer(new Date(breaks * 60 * 1000).toISOString().slice(-10, -5));
        } else if (timerSeconds === 0 && timerLabel === "Break") {
          sound.current.play();
          timerSeconds = session * 60 * 1000;
          console.log(timerSeconds + "at break");
          console.log(timerLabel);
          setTimerLabel("Session");
          setTimer(new Date(session * 60 * 1000).toISOString().slice(-10, -5));
        } else if (timerSeconds > 1000) {
          timerSeconds = timerSeconds - 1000;
          console.log(timerSeconds + "at greater than 0");
          setTimer(new Date(timerSeconds).toISOString().slice(-10, -5));
        } else {
          timerSeconds = timerSeconds - 1000;
          console.log(timerSeconds + "at  0");
          setTimer(new Date(0).toISOString().slice(-10, -5));
        }
      }
      timeInterval.current = setInterval(countdown, 1000);
    } else {
      clearInterval(timeInterval.current);
      setonGoing(false);
    }
    console.log(onGoing);
    console.log(timerLabel);
  }

  return (
    <div className="App">
      <div id="title">25 + 5 Clock</div>
      <div id="length-group">
        <div id="break-group">
          <div id="break-label">Break Length</div>
          <div id="break-decrement" onClick={breakDecrease}>
            decrease
          </div>
          <div id="break-length">{breaks}</div>
          <div id="break-increment" onClick={breakIncrease}>
            increase
          </div>
        </div>
        <div id="session-group">
          <div id="session-label">Session Length</div>
          <div id="session-decrement" onClick={sessionDecrease}>
            decrease
          </div>
          <div id="session-length">{session}</div>
          <div id="session-increment" onClick={sessionIncrease}>
            increase
          </div>
        </div>
      </div>
      <div>
        <div id="time-display">
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{timer}</div>
        </div>
      </div>

      <audio
        id="beep"
        ref={sound}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
      <div id="controls">
        <div id="start_stop" onClick={startStop}>
          start/stop
        </div>
        <div id="reset" onClick={reset}>
          reset
        </div>
      </div>
    </div>
  );
}