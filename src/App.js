import useResizeObserver from "@react-hook/resize-observer";
import React, { useRef } from "react";
import "./App.css";

const App = () => {
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
		<div className="app-container">
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
			<div className="red-team-video-wrapper">
				<img src="http://localhost:8080/red-team-video" alt="Red Team Video" className="video" />
			</div>
			<div className="blue-team-video-wrapper">
				<img src="http://localhost:8080/blue-team-video" alt="Blue Team Video" className="video" />
			</div>
		</div>
	);
};

export default App;
