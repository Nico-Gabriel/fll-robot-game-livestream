import MatchStreamPage from "pages/match-stream-page";
import TeamSelectPage from "pages/team-select-page";
import "./App.css";

const App = () => {
	return (
		<div className="app__container">
			<TeamSelectPage />
			<MatchStreamPage />
		</div>
	);
};

export default App;
