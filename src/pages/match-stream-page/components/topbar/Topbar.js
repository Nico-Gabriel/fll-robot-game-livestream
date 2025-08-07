import useResizeObserver from "@react-hook/resize-observer";
import { useRef } from "react";
import "./Topbar.css";

const Topbar = () => {
	const topbarRef = useRef(null);

	const updateTeamNameBackgroundCutoutWidth = () => {
		if (!topbarRef.current) {
			return;
		}

		document.documentElement.style.setProperty(
			"--team-name-background-cutout-width",
			`${topbarRef.current.clientHeight}px`
		);
	};

	useResizeObserver(topbarRef, updateTeamNameBackgroundCutoutWidth);

	return (
		<div ref={topbarRef} className="topbar">
			<div className="red-team-name-wrapper children-center">
				<div className="red-team-name bold">Red Team</div>
			</div>
			<div className="countdown-timer-wrapper children-center">
				<div className="countdown-timer">2:30</div>
			</div>
			<div className="blue-team-name-wrapper children-center">
				<div className="blue-team-name bold">Blue Team</div>
			</div>
		</div>
	);
};

export default Topbar;
