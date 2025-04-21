"use client";

import { useEffect, useState } from 'react'
import { validateNumber } from '@/utils/validate';
import { getCache, setCache, updateCache } from '@/utils/cache-helpers';


interface ITimerCache {
    timer: number,
    hours: string,
    minutes: string,
    seconds: string,
    title: string,
    theme: 'one' | 'two' | 'three'
}

interface CountDownProps {
    timer: number;
    theme?: 'one' | 'two' | 'three'
    isRunning: boolean;
    reset: number;
    removeTimer: (id: number) => void;
}

const CountDown: React.FC<CountDownProps> = ({ timer, isRunning, theme, reset, removeTimer }) => {
    const cacheKey = `timer-${timer}`;

    const [hours, setHours] = useState<string>("00");
    const [minutes, setMinutes] = useState<string>("00");
    const [seconds, setSeconds] = useState<string>("00");
    const [title, setTitle] = useState<string>(`Timer ${timer}`);
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                let newSeconds = parseInt(seconds) - 1;
                let newMinutes = parseInt(minutes);
                let newHours = parseInt(hours);

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }

                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }

                if (newHours < 0) {
                    clearInterval(interval);
                    setCompleted(true);
                    return;
                }
                setCompleted(false);

                const formattedSeconds = formatTime(newSeconds.toString());
                const formattedMinutes = formatTime(newMinutes.toString());
                const formattedHours = formatTime(newHours.toString());

                setSeconds(formattedSeconds);
                setMinutes(formattedMinutes);
                setHours(formattedHours);

                setCache(cacheKey, {
                    timer: timer,
                    hours: formattedHours,
                    minutes: formattedMinutes,
                    seconds: formattedSeconds,
                    title: title,
                    theme: theme || 'one'
                })
            }, 1000);

            return () => clearInterval(interval);
        }
    })

    useEffect(() => {
        // Reset state when resetCounter changes
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        setTitle(`Timer ${timer}`);
        setCompleted(false);

        const cache = getCache(cacheKey) as ITimerCache;
        if (cache) {
            setHours(cache.hours);
            setMinutes(cache.minutes);
            setSeconds(cache.seconds);
            setTitle(cache.title);
        }
    }, [reset, cacheKey, timer]);

    useEffect(() => {
        const cache = getCache(cacheKey) as ITimerCache;
        if (cache) {
            setHours(cache.hours);
            setMinutes(cache.minutes);
            setSeconds(cache.seconds);
            setTitle(cache.title);
        } else {
            setCache(cacheKey, {
                timer: timer,
                hours: formatTime(hours),
                minutes: formatTime(minutes),
                seconds: formatTime(seconds),
                title: title,
                theme: theme || 'one'
            })
        }
    }, [cacheKey, hours, minutes, seconds, timer, title, theme]);

    function formatTime(value: string): string {
        if (value === "") return "00";
        const numberValue = parseInt(value, 10);
        return numberValue < 10 ? `0${numberValue}` : `${numberValue}`
    }

    function themeOne(): string {
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }

    function themeTwo(): string {
        return `${hours}h ${formatTime(minutes)}min ${formatTime(seconds)}s`
    }

    function themeThree(): string {
        return `${hours} hours ${minutes} minutes ${seconds} seconds`
    }

    function handleTheme() {
        switch (theme) {
            case 'one':
                return themeOne()
            case 'two':
                return themeTwo()
            case 'three':
                return themeThree()
            default:
                return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        }
    }

    function handleInputChange(value: string, type: 'hours' | 'minutes' | 'seconds') {
        if (value !== "") {
            const isNumber = validateNumber(value);
            if (!isNumber) return;
        }

        switch (type) {
            case 'hours':
                if (parseInt(value) > 99) return;
                setHours(value);
                updateCache(cacheKey, 'hours', value);
                break;
            case 'minutes':
                if (parseInt(value) > 59) return;
                setMinutes(value);
                updateCache(cacheKey, 'minutes', value);
                break;
            case 'seconds':
                if (parseInt(value) > 59) return;
                setSeconds(value);
                updateCache(cacheKey, 'seconds', value);
                break;
        }
    }

    function handleBlur() {
        const formattedHours = formatTime(hours);
        const formattedMinutes = formatTime(minutes);
        const formattedSeconds = formatTime(seconds);

        setHours(formattedHours);
        setMinutes(formattedMinutes);
        setSeconds(formattedSeconds);

        updateCache(cacheKey, 'hours', formattedHours);
        updateCache(cacheKey, 'minutes', formattedMinutes);
        updateCache(cacheKey, 'seconds', formattedSeconds);
    }

    function handleTitleChange(value: string) {
        setTitle(value);
        updateCache(cacheKey, 'title', value);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 font-bold text-white">
            {/* Title & Remove */}
            <div className='w-full flex flex-row items-center justify-between'>
                {isRunning && (
                    <h1 className='w-full text-2xl text-start'>{title}</h1>
                )}

                {!isRunning && (
                    <div className='w-3/4 flex justify-start'>
                        <input
                            type="text"
                            value={title}
                            className='text-2xl text-start text-black placeholder-gray-600 px-4 py-3 transition duration-200 ease-in-out transform border-transparent rounded-2xl bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />
                    </div>
                )}
                <div className='w-1/4 flex justify-end items-center text-white'>
                    <button
                        className="self-end focus:outline-none"
                        onClick={() => removeTimer(timer)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Set Timer */}
            {!isRunning && (
                <div className='flex flex-row text-3xl sm:text-8xl w-full justify-start'>
                    <input
                        type="text"
                        value={hours}
                        onChange={(e) => handleInputChange(e.target.value, "hours")}
                        onBlur={handleBlur}
                        className="w-28 sm:w-48 text-center text-black placeholder-gray-600 px-6 py-5 transition duration-200 ease-in-out transform border-transparent rounded-2xl bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                    <span>:</span>
                    <input
                        type="text"
                        value={minutes}
                        onChange={(e) => handleInputChange(e.target.value, "minutes")}
                        onBlur={handleBlur}
                        className="w-28 sm:w-48 text-center text-black placeholder-gray-600 px-6 py-5 transition duration-200 ease-in-out transform border-transparent rounded-2xl bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                    <span>:</span>
                    <input
                        type="text"
                        value={seconds}
                        onChange={(e) => handleInputChange(e.target.value, "seconds")}
                        onBlur={handleBlur}
                        className="w-28 sm:w-48 text-center text-black placeholder-gray-600 px-6 py-5 transition duration-200 ease-in-out transform border-transparent rounded-2xl bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                </div>
            )}

            {/* Running Timer */}
            {isRunning && !completed && (
                <div className="w-full text-7xl sm:text-9xl text-start">
                    {handleTheme()}
                </div>
            )}

            {/* Completed Timer */}
            {isRunning && completed && (
                <div className="w-full text-3xl sm:text-5xl text-start">
                    Completed
                </div>
            )}
        </div>
    )
}

export default CountDown
