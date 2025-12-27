import useResizeObserver from "@react-hook/resize-observer";
import { TeamColor } from "constants";
import { useRef } from "react";
import Timer from "../timer";
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
			<div className="team-name__wrapper team-name__wrapper--red children-center">
				<div ref={redTeamNameRef} className="team-name team-name--red bold">
					Red Team
				</div>
			</div>
			<div className="countdown-timer__wrapper children-center">
				<div className="countdown-timer seven-segment-display">
					<Timer />
				</div>
			</div>
			<div className="team-name__wrapper team-name__wrapper--blue children-center">
				<div ref={blueTeamNameRef} className="team-name team-name--blue bold">
					Blue Team
				</div>
			</div>
		</div>
	);
};

export default Topbar;
