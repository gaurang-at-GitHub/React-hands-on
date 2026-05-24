import { useState, useEffect } from 'react';

function StopWatch() {
  const [value, setValue] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    let intervalId;
    if (on) {
      intervalId = setInterval(() => {
        setValue((v) => v + 1);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [on]);

  return (
    <div className="card">
      <h2>Stopwatch</h2>
      <div className="display">{value / 10} seconds</div>
      <div className="controls">
        <button onClick={() => setOn(!on)}>{on ? "Pause" : "Start"}</button>
        <button onClick={() => { setOn(false); setValue(0); }}>Reset</button>
      </div>
    </div>
  );
}

function Timer() {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      setInput('');
      return;
    }
    const digits = raw.replace(/\D/g, '').replace(/^0+/, '');
    setInput(digits);
  };

  const handleStart = () => {
    const seconds = time > 0 ? time : Number(input);
    if (!seconds || seconds <= 0) return;
    setTime(seconds);
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setInput('');
  };

  return (
    <div className="card">
      <h2>Timer</h2>
      <label className="input-label" htmlFor="timer-seconds">
        Duration (seconds)
      </label>
      <input
        id="timer-seconds"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={input}
        onChange={handleInputChange}
        placeholder="e.g. 60"
      />
      <div className="display">
        {time > 0 ? `${time} seconds remaining` : '0 seconds'}
      </div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <StopWatch />
      <Timer />
    </div>
  );
}