import { TimerPhase } from "constants";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import "./Timer.css";

const Timer = ({ duration, preCountEnabled = true, preCountDuration = 10 }) => {
	const [timerPhase, setTimerPhase] = useState(preCountEnabled ? TimerPhase.PRE : TimerPhase.MAIN);

	const calculateExpiryTimestamp = (seconds) => new Date(Date.now() + seconds * 1000);

	const onTimerExpire = () => {
		if (timerPhase !== TimerPhase.PRE) {
			return;
		}

		setTimerPhase(TimerPhase.MAIN);
	};

	const { seconds, minutes, restart } = useTimer({
		expiryTimestamp: calculateExpiryTimestamp(preCountEnabled ? preCountDuration : duration),
		autoStart: true,
		onExpire: onTimerExpire,
	});

	useEffect(() => {
		if (timerPhase !== TimerPhase.MAIN) {
			return;
		}

		restart(calculateExpiryTimestamp(duration), true);
	}, [duration, timerPhase, restart]);

	const isTimerRed =
		timerPhase === TimerPhase.PRE || (timerPhase === TimerPhase.MAIN && minutes === 0 && seconds <= 10);

	return (
		<div className={`timer ${isTimerRed ? "timer--red" : ""}`}>
			<span className="timer__minutes">{minutes}</span>
			<span className="timer__colon">:</span>
			<span className="timer__seconds">{String(seconds).padStart(2, "0")}</span>
		</div>
	);
};

export default Timer;
