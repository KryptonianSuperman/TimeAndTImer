'use client'

import useWorldTime from '@/hooks/useWorldTime';
import React from 'react';

const WorldClock = () => {

  const { timeZone, setTimeZone, currentTime } = useWorldTime()

  const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(event.target.value);
  };

  return (
    <div>
      <h1>World Clock</h1>
      <div>
        <label htmlFor="timezone">Select a Time Zone:</label>
        <select id="timezone" value={timeZone} onChange={handleTimeZoneChange}>
          <option value="America/Los_Angeles">PST (Pacific Time)</option>
          <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
        </select>
      </div>
      <div>
        {currentTime ? (
          <p>Current Time in {timeZone}: {currentTime.toLocaleString('en-US', {
            timeZone,
          })}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WorldClock;