'use client'

import ScrollableInput,{ScrollInputRefType} from '@/components/ScrollableInput';
import SingletonTimer from '@/components/SingletonTImer';
import React, { useState, useEffect, useRef } from 'react';

function generateArray(N: number){
    var a=Array(N), b=0
    while(b<N) {
      a[b] = b
      b++
    }
    return a
}

const hourValues = generateArray(100)
const minSecValues = generateArray(60)

function CountdownTimer() {
  const [timers, setTimers] = useState<{id: number, startTime: number}[]>();
  const handleStart = () => {
    console.log("inputRef.current",hoursInputRef.current, minutesInputRef.current, secondsInputRef.current)
    const totalTime = hoursInputRef.current.value * 3600 + minutesInputRef.current.value * 60 + secondsInputRef.current.value;
    if (totalTime > 0) {
      setTimers(prevTimers => {
        return prevTimers ? [
          ...prevTimers,
          { id: Date.now(), startTime: totalTime }
        ]: [{ id: Date.now(), startTime: totalTime }];
      })
      hoursInputRef.current?.setValue(0);
      minutesInputRef.current?.setValue(0);
      secondsInputRef.current?.setValue(0);
    }
  };

  const handleRemove = (id: number) => {
    setTimers(prevTimers => prevTimers?.filter(timer => timer.id !== id));
  };

  const hoursInputRef = useRef<ScrollInputRefType>(null)
  const minutesInputRef = useRef<ScrollInputRefType>(null)
  const secondsInputRef = useRef<ScrollInputRefType>(null)

  return (
    <div>
      <div className='flex'>
        <ScrollableInput items={hourValues} ref={hoursInputRef} />
        <span className=' font-extrabold text-lg self-center'>&#58;</span>
        <ScrollableInput items={minSecValues} ref={minutesInputRef} />
        <span className=' font-extrabold text-lg self-center'>&#58;</span>
        <ScrollableInput items={minSecValues} ref={secondsInputRef} />
        <button className='' onClick={handleStart}>Start</button>
      </div>
      {timers ? <div className='my-10'>
        <h2>Timers</h2>
        {timers?.map(timer => (
          <SingletonTimer
            key={timer.id}
            id={timer.id}
            startTime={timer.startTime}
            onRemove={handleRemove}
          />
        ))}
      </div>: null}
    </div> 
  );
}

export default CountdownTimer;