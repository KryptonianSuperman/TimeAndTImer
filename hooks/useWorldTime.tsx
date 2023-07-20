import axios from "axios";
import { useEffect, useState } from "react";

const useWorldTime = () => {
    const [timeZone, setTimeZone] = useState('America/Los_Angeles');
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        // Function to fetch current time from the cloud API
        const fetchTime = async () => {
            try {
                const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timeZone}`);
                const { datetime, utc_offset } = response.data;
                const utcTime = new Date(datetime)
                setCurrentTime(utcTime)
            } catch (error) {
                console.error('Error fetching time:', error);
            }
        };

        // Fetch time initially
        fetchTime();

        // Update time every minute
        const intervalId = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime) {
                    const updatedTime = new Date(prevTime);
                    updatedTime.setSeconds(updatedTime.getSeconds() + 1);
                    return updatedTime;
                }
                return prevTime;
            });
        }, 1000);

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, [timeZone]);


    return { timeZone, setTimeZone, currentTime }
}

export default useWorldTime