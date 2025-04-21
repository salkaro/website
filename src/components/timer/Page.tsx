"use client";


// Local Imports
import CountDown from './CountDown'
import { clearCache } from '@/utils/cache-helpers';

// External Imports
import { useEffect, useState } from 'react'
import Title from '../ui/title';


const Page = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timers, setTimers] = useState<{ id: number }[]>([]);
    const [resetCounter, setResetCounter] = useState(0);

    useEffect(() => {
        const cache = JSON.parse(localStorage.getItem('cache') || '{}');
        const timerKeys = Object.keys(cache).filter(key => key.startsWith('timer-'));
        const newTimers = timerKeys.map(key => {
            const { timer } = cache[key];
            return { id: parseInt(timer) };
        });
        setTimers(newTimers.length > 0 ? newTimers : [{ id: 1 }]); // Default to one timer if none found
    }, []);

    const addTimer = () => {
        const nextId = timers.length > 0 ? Math.max(...timers.map(t => t.id)) + 1 : 1;
        setTimers([...timers, { id: nextId }]);
    };

    function removeTimer(id: number) {
        setTimers(timers.filter(timer => timer.id !== id));
        clearCache(`timer-${id}`);
    }

    function resetTimers() {
        // Go through each timer and reset its cache (except the title)
        timers.forEach(timer => {
            const cacheKey = `timer-${timer.id}`;
            const cache = JSON.parse(localStorage.getItem('cache') || '{}');
            if (cache[cacheKey]) {
                cache[cacheKey].hours = "00";
                cache[cacheKey].minutes = "00";
                cache[cacheKey].seconds = "00";
                localStorage.setItem('cache', JSON.stringify(cache));
            }
        });
        // Increment resetKey to force re-mounting CountDown components
        setResetCounter(prev => prev + 1);
    }

    return (
        <div className='min-h-screen flex flex-col items-center p-12'>
            {!isRunning && (
                <Title title="Online Timers" subTitle='Exam Timers, Study Timers, Countdown Timers, Stopwatch Timers'/>
            )}

            <div className='flex flex-col items-center justify-center gap-4'>
                {timers.map((timer) => (
                    <CountDown
                        key={timer.id}
                        timer={timer.id}
                        theme='one'
                        isRunning={isRunning}
                        reset={resetCounter}
                        removeTimer={removeTimer}
                    />
                ))}
            </div>

            <div className='fixed bottom-5 right-5 flex flex-row gap-5'>
                {!isRunning && (
                    <button
                        className="cursor-pointer hover:-translate-y-[2px] px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-2xl text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out"
                        onClick={resetTimers}
                        disabled={isRunning}
                    >
                        Reset
                    </button>
                )}
                {!isRunning && (
                    <button
                        className="cursor-pointer hover:-translate-y-[2px] px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-2xl text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out"
                        onClick={addTimer}
                        disabled={isRunning}
                    >
                        Add Timer
                    </button>
                )}
                <button
                    className="cursor-pointer hover:-translate-y-[2px] px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-2xl text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
            </div>
        </div>
    )
}

export default Page
