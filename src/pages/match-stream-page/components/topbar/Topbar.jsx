import useResizeObserver from "@react-hook/resize-observer";
import { useEffect, useRef } from "react";
import "./Topbar.css";

const Topbar = () => {
	const topbarRef = useRef(null);
	const redTeamNameRef = useRef(null);
	const blueTeamNameRef = useRef(null);

	const updateTeamNameBackgroundCutoutWidth = () => {
		if (!topbarRef.current) {
			return;
		}

		document.documentElement.style.setProperty(
			"--team-name-background-cutout-width",
			`${topbarRef.current.clientHeight}px`
		);

		document.documentElement.style.setProperty("--red-team-name-width", `${redTeamNameRef.current.clientWidth}px`);

		document.documentElement.style.setProperty(
			"--blue-team-name-width",
			`${blueTeamNameRef.current.clientWidth}px`
		);

		document.documentElement.style.setProperty(
			"--team-name-background-width",
			`${redTeamNameRef.current.parentElement.clientWidth}px`
		);

		const redTeamName = redTeamNameRef.current;
		const blueTeamName = blueTeamNameRef.current;

		redTeamName.classList.remove("marquee-left");
		blueTeamName.classList.remove("marquee-right");

		if (redTeamName.scrollWidth > redTeamName.clientWidth) {
			redTeamName.classList.add("marquee-left");
		}

		if (blueTeamName.scrollWidth > blueTeamName.clientWidth) {
			blueTeamName.classList.add("marquee-right");
		}
	};

	useResizeObserver(topbarRef, updateTeamNameBackgroundCutoutWidth);
	// own resize observer for red and blue team names, with extra functions
	useResizeObserver(redTeamNameRef, () => {
		console.log("red team name resized");
	});

	useEffect(() => {
		updateTeamNameBackgroundCutoutWidth();
	}, [redTeamNameRef.current?.clientWidth, blueTeamNameRef.current?.clientWidth]);

	return (
		<div ref={topbarRef} className="topbar">
			<div className="red-team-name-wrapper children-center">
				<div ref={redTeamNameRef} className="red-team-name bold">
					Brick4Future ABCDEFGHIJKLMNOPwjfwjfh
				</div>
			</div>
			<div className="countdown-timer-wrapper children-center">
				<div className="countdown-timer">2:30</div>
			</div>
			<div className="blue-team-name-wrapper children-center">
				<div ref={blueTeamNameRef} className="blue-team-name bold">
					Mechatronics Hollabrunn
				</div>
			</div>
		</div>
	);
};

export default Topbar;
