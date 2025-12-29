import useResizeObserver from "@react-hook/resize-observer";
import { MATCH_DURATION_SECONDS, TeamColor } from "constants";
import { useCallback, useRef } from "react";
import Timer from "../timer";
import "./Topbar.css";

const Topbar = () => {
	const topbarRef = useRef(null);
	const redTeamNameRef = useRef(null);
	const blueTeamNameRef = useRef(null);

	const setCSSVariable = (name, value) => document.documentElement.style.setProperty(name, value);

	const updateTopbarHeight = useCallback(() => {
		const topbar = topbarRef.current;

		if (!topbar) {
			return;
		}

		setCSSVariable("--team-name-background-cutout-width", `${topbar.clientHeight}px`);
	}, []);

	const updateTeamNameWidth = useCallback((teamNameRef, teamColor) => {
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
	}, []);

	const updateRedTeamNameWidth = useCallback(
		() => updateTeamNameWidth(redTeamNameRef, TeamColor.RED),
		[updateTeamNameWidth]
	);

	const updateBlueTeamNameWidth = useCallback(
		() => updateTeamNameWidth(blueTeamNameRef, TeamColor.BLUE),
		[updateTeamNameWidth]
	);

	useResizeObserver(topbarRef, updateTopbarHeight);
	useResizeObserver(redTeamNameRef, updateRedTeamNameWidth);
	useResizeObserver(blueTeamNameRef, updateBlueTeamNameWidth);

	return (
		<div ref={topbarRef} className="topbar">
			<div className="team-name__wrapper team-name__wrapper--red children-center">
				<div ref={redTeamNameRef} className="team-name team-name--red bold">
					Red Team
				</div>
			</div>
			<div className="countdown-timer__wrapper children-center">
				<div className="countdown-timer__container seven-segment-display">
					<div className="countdown-timer__background">8:88</div>
					<div className="countdown-timer">
						<Timer duration={MATCH_DURATION_SECONDS} />
					</div>
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
