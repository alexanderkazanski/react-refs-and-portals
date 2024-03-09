import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  const handelReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  function handelStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handelStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        result="lost"
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handelReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime}
          {' '}
          second
          {targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button
            type="submit"
            onClick={timerIsActive ? handelStop : handelStart}
          >
            {timerIsActive ? 'Stop' : 'Start'}
            {' '}
            Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}

TimerChallenge.propTypes = {
  title: PropTypes.string.isRequired,
  targetTime: PropTypes.number.isRequired,
};

export default TimerChallenge;
