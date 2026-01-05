import { Page, TeamColor } from "constants";
import MatchStreamPage from "pages/match-stream-page";
import TeamSelectPage from "pages/team-select-page";
import { useCallback, useMemo, useState } from "react";
import "./App.css";

const App = () => {
	const initialTeamNames = useMemo(() => ({ [TeamColor.RED]: "", [TeamColor.BLUE]: "" }), []);

	const [page, setPage] = useState(Page.TEAM_SELECT);
	const [teamNames, setTeamNames] = useState(initialTeamNames);

	const resetTeamNames = useCallback(() => setTeamNames(initialTeamNames), [initialTeamNames]);

	const updateTeamName = (teamColor, newTeamName) =>
		setTeamNames((prevTeamNames) => ({ ...prevTeamNames, [teamColor]: newTeamName }));

	return (
		<div className="app__container">
			{page === Page.TEAM_SELECT && (
				<TeamSelectPage
					teamNames={teamNames}
					resetTeamNames={resetTeamNames}
					updateTeamName={updateTeamName}
					goToMatchStream={() => setPage(Page.MATCH_STREAM)}
				/>
			)}
			{page === Page.MATCH_STREAM && (
				<MatchStreamPage teamNames={teamNames} goToTeamSelect={() => setPage(Page.TEAM_SELECT)} />
			)}
		</div>
	);
};

export default App;
