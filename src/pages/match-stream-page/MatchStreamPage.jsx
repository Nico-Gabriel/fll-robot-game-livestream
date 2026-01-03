import { TeamColor } from "constants";
import { useKeyHold } from "hooks";
import Topbar from "./components/topbar";
import VideoStream from "./components/video-stream";
import "./MatchStreamPage.css";

const MatchStreamPage = ({ goToTeamSelect }) => {
	useKeyHold("E", goToTeamSelect);

	return (
		<div className="match-stream-page__container">
			<Topbar />
			<VideoStream teamColor={TeamColor.RED} />
			<VideoStream teamColor={TeamColor.BLUE} />
		</div>
	);
};

export default MatchStreamPage;
