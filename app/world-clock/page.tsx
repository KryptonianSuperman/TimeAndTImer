'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorldClock = () => {
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to fetch current time from the cloud API
    const fetchTime = async () => {
      try {
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timeZone}`);
        const { utc_datetime } = response.data;
        const localTime = new Date(utc_datetime).toLocaleString('en-US', {
          timeZone,
        });
        setCurrentTime(localTime);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    // Fetch time initially
    fetchTime();

    // Update time every minute
    const intervalId = setInterval(fetchTime, 60000);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, [timeZone]);

  const handleTimeZoneChange = (event) => {
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
        <p>Current Time in {timeZone}: {currentTime}</p>
      </div>
    </div>
  );
};

export default WorldClock;