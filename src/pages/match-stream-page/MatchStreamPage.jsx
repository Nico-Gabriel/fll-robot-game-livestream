import { TeamColor } from "constants";
import Topbar from "./components/topbar";
import VideoStream from "./components/video-stream";
import "./MatchStreamPage.css";

const MatchStreamPage = () => {
	return (
		<div className="match-stream-page__container">
			<Topbar />
			<VideoStream teamColor={TeamColor.RED} />
			<VideoStream teamColor={TeamColor.BLUE} />
		</div>
	);
};

export default MatchStreamPage;
