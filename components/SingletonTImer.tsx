import { useEffect, useState } from "react";

export default function SingletonTimer({ id, startTime, onRemove }: {id: number, startTime: number,  onRemove: (id: number) => void}) {
    const [timeRemaining, setTimeRemaining] = useState(startTime);
    const [isPaused, setIsPaused] = useState(false);
  
    useEffect(() => {
      let interval: NodeJS.Timer | null = null;
  
      if (!isPaused) {
        interval = setInterval(() => {
          setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);
      }
  
      return () => {
        interval ? clearInterval(interval) : null;
      };
    }, [isPaused]);
  
    useEffect(() => {
      if (timeRemaining === 0) {
        onRemove(id);
      }
    }, [timeRemaining, id, onRemove]);
  
    const formatTime = time => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    const handlePause = () => {
      setIsPaused(prevPaused => !prevPaused);
    };
  
    return (
      <div className="flex gap-8 my-10" >
        <span>{formatTime(timeRemaining)}</span>
        <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button onClick={() => onRemove(id)}>Delete</button>
      </div>
    );
  }
  