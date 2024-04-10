import { useState, useRef } from 'react'

import ResultModal from './ResultModal'

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)

  const timer = useRef()
  const dialogue = useRef()

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true)
      dialogue.current.showModal()
    }, targetTime * 1000)

    setTimerStarted(true)
  }

  function handleStop() {
    clearTimeout(timer.current)
    setTimerStarted(false)
  }

  return (
    <>
      <ResultModal ref={dialogue} targetTime={targetTime} result='lost' />
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className=''>
          {timerStarted ? 'Time is Running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}
