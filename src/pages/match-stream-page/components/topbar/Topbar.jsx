import useResizeObserver from "@react-hook/resize-observer";
import { MATCH_DURATION_SECONDS, TeamColor } from "constants";
import { useRef } from "react";
import { isHorizontallyOverflowing, setCSSProperty } from "utils";
import Timer from "../timer";
import "./Topbar.css";

const Topbar = ({ teamNames }) => {
	const { [TeamColor.RED]: redTeamName, [TeamColor.BLUE]: blueTeamName } = teamNames;

	const topbarRef = useRef(null);
	const redTeamNameRef = useRef(null);
	const blueTeamNameRef = useRef(null);

	const updateTopbarHeight = () => {
		const topbar = topbarRef.current;

		if (!topbar) {
			return;
		}

		setCSSProperty("--team-name-background-cutout-width", `${topbar.clientHeight}px`);
	};

	const updateTeamNameWidth = (teamNameRef, teamColor) => {
		const teamName = teamNameRef.current;

		if (!teamName) {
			return;
		}

		setCSSProperty(`--${teamColor}-team-name-width`, `${teamName.clientWidth}px`);
		setCSSProperty("--team-name-background-width", `${teamName.parentElement.clientWidth}px`);

		teamName.classList.remove("marquee");

		if (isHorizontallyOverflowing(teamName)) {
			teamName.classList.add("marquee");
		}
	};

	useResizeObserver(topbarRef, updateTopbarHeight);
	useResizeObserver(redTeamNameRef, () => updateTeamNameWidth(redTeamNameRef, TeamColor.RED));
	useResizeObserver(blueTeamNameRef, () => updateTeamNameWidth(blueTeamNameRef, TeamColor.BLUE));

	const renderTeamName = (teamNameRef, teamColor, teamName) => (
		<div className={`team-name__wrapper team-name__wrapper--${teamColor} children-center`}>
			<div ref={teamNameRef} className={`team-name team-name--${teamColor} bold`}>
				{teamName}
			</div>
		</div>
	);

	const renderCountdownTimer = () => (
		<div className="countdown-timer__wrapper children-center">
			<div className="countdown-timer__container seven-segment-display">
				<div className="countdown-timer__background">8:88</div>
				<div className="countdown-timer">
					<Timer duration={MATCH_DURATION_SECONDS} />
				</div>
			</div>
		</div>
	);

	return (
		<div ref={topbarRef} className="topbar">
			{renderTeamName(redTeamNameRef, TeamColor.RED, redTeamName)}
			{renderCountdownTimer()}
			{renderTeamName(blueTeamNameRef, TeamColor.BLUE, blueTeamName)}
		</div>
	);
};

export default Topbar;
