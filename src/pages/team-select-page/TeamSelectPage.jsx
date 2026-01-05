import { TeamColor } from "constants";
import { useEffect } from "react";
import Select from "react-select";
import { capitalizeFirstLetter } from "utils";
import "./TeamSelectPage.css";

const TeamSelectPage = ({ teamNames, resetTeamNames, updateTeamName, goToMatchStream }) => {
	const teamNameList = ["Team Alpha", "Team Beta", "Team Gamma", "Team Delta", "Team Epsilon", "Team Zeta"];

	const { [TeamColor.RED]: redTeamName, [TeamColor.BLUE]: blueTeamName } = teamNames;

	useEffect(resetTeamNames, [resetTeamNames]);

	const createTeamNameSelectOptions = (disabledTeamName) =>
		teamNameList.map((teamName) => ({
			value: teamName,
			label: teamName,
			isDisabled: teamName === disabledTeamName,
		}));

	const onTeamNameSelectChange = (teamColor) => (selectedOption) =>
		updateTeamName(teamColor, selectedOption ? selectedOption.value : "");

	const renderTeamNameSelect = (teamColor, disabledTeamName) => (
		<Select
			className="team-name-select"
			placeholder={`${capitalizeFirstLetter(teamColor)} Team`}
			options={createTeamNameSelectOptions(disabledTeamName)}
			onChange={onTeamNameSelectChange(teamColor)}
			isSearchable
			isClearable
		/>
	);

	return (
		<div className="team-select-page__container">
			<h1>Team Select Page</h1>
			<p>Select both teams to proceed to the match stream.</p>
			{renderTeamNameSelect(TeamColor.RED, blueTeamName)}
			{renderTeamNameSelect(TeamColor.BLUE, redTeamName)}
			<button onClick={goToMatchStream} disabled={!redTeamName || !blueTeamName}>
				Go to Match Stream
			</button>
		</div>
	);
};

export default TeamSelectPage;
