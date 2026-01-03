import { SOUND_EFFECT_SOURCES, TIMER_SOUND_EFFECTS, TimerPhase } from "constants";
import { useKeyHold, useSounds } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import "./Timer.css";

const Timer = ({ duration, preCountEnabled = true, preCountDuration = 10 }) => {
	const [initialTimerPhase, initialDuration] = preCountEnabled
		? [TimerPhase.PRE, preCountDuration]
		: [TimerPhase.MAIN, duration];

	const [hasTimerStarted, setHasTimerStarted] = useState(false);
	const [timerPhase, setTimerPhase] = useState(initialTimerPhase);

	const calculateExpiryTimestamp = (seconds) => new Date(Date.now() + seconds * 1000);

	const onTimerExpire = useCallback(() => {
		if (timerPhase !== TimerPhase.PRE) {
			return;
		}

		setTimerPhase(TimerPhase.TRANSITION);
	}, [timerPhase]);

	const {
		totalSeconds,
		seconds,
		minutes,
		start: startTimer,
		restart: restartTimer,
	} = useTimer({
		expiryTimestamp: calculateExpiryTimestamp(initialDuration),
		autoStart: false,
		onExpire: onTimerExpire,
	});

	const onTimerStart = () => {
		startTimer();
		setHasTimerStarted(true);
	};

	const onTimerReset = () => {
		restartTimer(calculateExpiryTimestamp(initialDuration), false);
		setHasTimerStarted(false);
		setTimerPhase(initialTimerPhase);
	};

	useKeyHold("S", onTimerStart);
	useKeyHold("R", onTimerReset);

	useEffect(() => {
		if (timerPhase !== TimerPhase.TRANSITION) {
			return;
		}

		restartTimer(calculateExpiryTimestamp(duration), true);
		setTimerPhase(TimerPhase.MAIN);
	}, [duration, timerPhase, restartTimer]);

	const { play: playSound } = useSounds(SOUND_EFFECT_SOURCES);

	useEffect(() => {
		TIMER_SOUND_EFFECTS[timerPhase]?.forEach(
			({ condition, sound }) => condition(totalSeconds, duration) && playSound(sound)
		);
	}, [duration, timerPhase, totalSeconds, playSound]);

	const isTimerRed =
		hasTimerStarted &&
		(timerPhase === TimerPhase.PRE || (timerPhase === TimerPhase.MAIN && minutes === 0 && seconds <= 10));

	const renderDigit = (digit, forceVisible = false) => {
		const isInvisible = !forceVisible && timerPhase === TimerPhase.PRE && digit === 0;

		return <span className={`timer__digit ${isInvisible ? "timer__digit--invisible" : ""}`}>{digit}</span>;
	};

	const [displayMinutes, displaySeconds] = hasTimerStarted
		? [minutes, seconds]
		: [Math.floor(duration / 60), duration % 60];

	return (
		<div className={`timer ${isTimerRed ? "timer--red" : ""}`}>
			<span className="timer__minutes">{renderDigit(displayMinutes)}</span>
			<span className="timer__colon">:</span>
			<span className="timer__seconds">
				{renderDigit(Math.floor(displaySeconds / 10), displayMinutes > 0)}
				{renderDigit(displaySeconds % 10, true)}
			</span>
		</div>
	);
};

export default Timer;
