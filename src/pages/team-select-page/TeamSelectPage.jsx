import { TeamColor } from "constants";
import { useEffect } from "react";
import "./TeamSelectPage.css";

const TeamSelectPage = ({ teamNames, setTeamNames, resetTeamNames, goToMatchStream }) => {
	useEffect(() => resetTeamNames(), [resetTeamNames]);

	const onTeamNameChange = (teamColor) => (e) =>
		setTeamNames((prevTeamNames) => ({ ...prevTeamNames, [teamColor]: e.target.value }));

	return (
		<div className="team-select-page__container">
			<h1>Team Select Page</h1>
			<p>Select both teams to proceed to the match stream.</p>
			<input
				type="text"
				placeholder="Red Team Name"
				value={teamNames[TeamColor.RED]}
				onChange={onTeamNameChange(TeamColor.RED)}
			/>
			<br />
			<input
				type="text"
				placeholder="Blue Team Name"
				value={teamNames[TeamColor.BLUE]}
				onChange={onTeamNameChange(TeamColor.BLUE)}
			/>
			<br />
			<button onClick={goToMatchStream} disabled={!teamNames[TeamColor.RED] || !teamNames[TeamColor.BLUE]}>
				Go to Match Stream
			</button>
		</div>
	);
};

export default TeamSelectPage;
