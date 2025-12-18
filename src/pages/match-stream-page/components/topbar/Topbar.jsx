import useResizeObserver from "@react-hook/resize-observer";
import { TeamColor } from "constants";
import { useRef } from "react";
import "./Topbar.css";

const Topbar = () => {
	const topbarRef = useRef(null);
	const redTeamNameRef = useRef(null);
	const blueTeamNameRef = useRef(null);

	const setCSSVariable = (name, value) => document.documentElement.style.setProperty(name, value);

	const updateTopbarHeight = () => {
		const topbar = topbarRef.current;

		if (!topbar) {
			return;
		}

		setCSSVariable("--team-name-background-cutout-width", `${topbar.clientHeight}px`);
	};

	const updateTeamNameWidth = (teamNameRef, teamColor) => {
		const teamName = teamNameRef.current;

		if (!teamName) {
			return;
		}

		setCSSVariable(`--${teamColor}-team-name-width`, `${teamName.clientWidth}px`);
		setCSSVariable("--team-name-background-width", `${teamName.parentElement.clientWidth}px`);

		teamName.classList.remove("marquee");

		if (teamName.scrollWidth > teamName.clientWidth) {
			teamName.classList.add("marquee");
		}
	};

	useResizeObserver(topbarRef, updateTopbarHeight);
	useResizeObserver(redTeamNameRef, () => updateTeamNameWidth(redTeamNameRef, TeamColor.RED));
	useResizeObserver(blueTeamNameRef, () => updateTeamNameWidth(blueTeamNameRef, TeamColor.BLUE));

	return (
		<div ref={topbarRef} className="topbar">
			<div className="red-team-name-wrapper children-center">
				<div ref={redTeamNameRef} className="red-team-name bold">
					Red Team
				</div>
			</div>
			<div className="countdown-timer-wrapper children-center">
				<div className="countdown-timer">2:30</div>
			</div>
			<div className="blue-team-name-wrapper children-center">
				<div ref={blueTeamNameRef} className="blue-team-name bold">
					Blue Team
				</div>
			</div>
		</div>
	);
};

export default Topbar;
