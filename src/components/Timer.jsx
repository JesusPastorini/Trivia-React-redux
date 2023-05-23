import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ time, setTime, setOut }) {
  const [seconds, setSeconds] = useState(time);
  const ms = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((secs) => {
        const s = secs > 0 ? secs - 1 : secs;
        setTime(s);
        if (s <= 0) { setOut(true); }
        return (s);
      });
    }, ms);
    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      {`Tempo: ${seconds}`}
    </p>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  setOut: PropTypes.func.isRequired,
};

export default Timer;
