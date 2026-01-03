import { Page } from "constants";
import MatchStreamPage from "pages/match-stream-page";
import TeamSelectPage from "pages/team-select-page";
import { useState } from "react";
import "./App.css";

const App = () => {
	const [page, setPage] = useState(Page.TEAM_SELECT);

	return (
		<div className="app__container">
			{page === Page.TEAM_SELECT && <TeamSelectPage goToMatchStream={() => setPage(Page.MATCH_STREAM)} />}
			{page === Page.MATCH_STREAM && <MatchStreamPage goToTeamSelect={() => setPage(Page.TEAM_SELECT)} />}
		</div>
	);
};

export default App;
