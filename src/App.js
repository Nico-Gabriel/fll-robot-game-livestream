import useResizeObserver from "@react-hook/resize-observer";
import React, { useRef, useState } from "react";
import { BounceLoader } from "react-spinners";
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

	const [isRedTeamVideoLoaded, setIsRedTeamVideoLoaded] = useState(false);
	const [isBlueTeamVideoLoaded, setIsBlueTeamVideoLoaded] = useState(false);

	const videoServerUrl = "http://localhost:8080";
	const redTeamVideoSrc = `${videoServerUrl}/red-team-video`;
	const blueTeamVideoSrc = `${videoServerUrl}/blue-team-video`;

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
			<div className="red-team-video-wrapper children-center">
				<img
					src={redTeamVideoSrc}
					alt="Red Team Video"
					className={`video ${isRedTeamVideoLoaded ? "" : "hidden"}`}
					onLoad={() => setIsRedTeamVideoLoaded(true)}
					onError={() => setIsRedTeamVideoLoaded(false)}
				/>
				{!isRedTeamVideoLoaded && <BounceLoader size={100} color="red" />}
			</div>
			<div className="blue-team-video-wrapper children-center">
				<img
					src={blueTeamVideoSrc}
					alt="Blue Team Video"
					className={`video ${isBlueTeamVideoLoaded ? "" : "hidden"}`}
					onLoad={() => setIsBlueTeamVideoLoaded(true)}
					onError={() => setIsBlueTeamVideoLoaded(false)}
				/>
				{!isBlueTeamVideoLoaded && <BounceLoader size={100} color="blue" />}
			</div>
		</div>
	);
};

export default App;
