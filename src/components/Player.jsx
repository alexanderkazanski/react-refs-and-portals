import React, { useState, useRef } from 'react';

function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handelClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>
        Welcome
        {' '}
        {enteredPlayerName ?? 'unknown entity'}
      </h2>
      <p>
        <input ref={playerName} type="text" />
        <button
          type="submit"
          onClick={handelClick}
        >
          Set Name
        </button>
      </p>
    </section>
  );
}

export default Player;
