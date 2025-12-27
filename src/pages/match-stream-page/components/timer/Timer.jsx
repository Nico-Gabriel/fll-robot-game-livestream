import { useTimer } from "react-timer-hook";
import "./Timer.css";

const Timer = ({ duration, preCountEnabled = true, preCountDuration = 10 }) => {
	const calculateExpiryTimestamp = (seconds) => new Date(Date.now() + seconds * 1000);

	const { seconds, minutes } = useTimer({
		expiryTimestamp: calculateExpiryTimestamp(preCountEnabled ? preCountDuration : duration),
		autoStart: false,
	});

	return (
		<div className="timer">
			<span className="timer__minutes">{minutes}</span>
			<span className="timer__colon">:</span>
			<span className="timer__seconds">{String(seconds).padStart(2, "0")}</span>
		</div>
	);
};

export default Timer;
