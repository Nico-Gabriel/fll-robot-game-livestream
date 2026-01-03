import "./TeamSelectPage.css";

const TeamSelectPage = ({ goToMatchStream }) => {
	return (
		<div className="team-select-page__container">
			<h1>Team Select Page</h1>
			<p>Select both teams to proceed to the match stream.</p>
			<button onClick={goToMatchStream}>Go to Match Stream</button>
		</div>
	);
};

export default TeamSelectPage;
