import { SOUND_EFFECT_SOURCES, TIMER_SOUND_EFFECTS, TimerPhase } from "constants";
import { useSounds } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import "./Timer.css";

const Timer = ({ duration, preCountEnabled = true, preCountDuration = 10 }) => {
	const [timerPhase, setTimerPhase] = useState(preCountEnabled ? TimerPhase.PRE : TimerPhase.MAIN);

	const calculateExpiryTimestamp = useCallback((seconds) => new Date(Date.now() + seconds * 1000), []);

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
		restart: restartTimer,
	} = useTimer({
		expiryTimestamp: calculateExpiryTimestamp(preCountEnabled ? preCountDuration : duration),
		autoStart: true,
		onExpire: onTimerExpire,
	});

	useEffect(() => {
		if (timerPhase !== TimerPhase.TRANSITION) {
			return;
		}

		restartTimer(calculateExpiryTimestamp(duration), true);
		setTimerPhase(TimerPhase.MAIN);
	}, [duration, timerPhase, calculateExpiryTimestamp, restartTimer]);

	const { play: playSound } = useSounds(SOUND_EFFECT_SOURCES);

	useEffect(() => {
		TIMER_SOUND_EFFECTS[timerPhase]?.forEach(
			({ condition, sound }) => condition(totalSeconds, duration) && playSound(sound)
		);
	}, [duration, timerPhase, totalSeconds, playSound]);

	const isTimerRed =
		timerPhase === TimerPhase.PRE || (timerPhase === TimerPhase.MAIN && minutes === 0 && seconds <= 10);

	const renderDigit = (digit, forceVisible = false) => {
		const isInvisible = !forceVisible && timerPhase === TimerPhase.PRE && digit === 0;

		return <span className={`timer__digit ${isInvisible ? "timer__digit--invisible" : ""}`}>{digit}</span>;
	};

	return (
		<div className={`timer ${isTimerRed ? "timer--red" : ""}`}>
			<span className="timer__minutes">{renderDigit(minutes)}</span>
			<span className="timer__colon">:</span>
			<span className="timer__seconds">
				{renderDigit(Math.floor(seconds / 10), minutes > 0)}
				{renderDigit(seconds % 10, true)}
			</span>
		</div>
	);
};

export default Timer;
