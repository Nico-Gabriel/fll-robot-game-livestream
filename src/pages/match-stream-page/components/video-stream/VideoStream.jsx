import { VIDEO_STREAM_SOURCES } from "constants";
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import { capitalizeFirstLetter } from "utils";
import "./VideoStream.css";

const VideoStream = ({ teamColor }) => {
	const [isVideoStreamLoaded, setIsVideoStreamLoaded] = useState(false);

	return (
		<div className={`${teamColor}-team-video-stream-wrapper children-center`}>
			<img
				src={VIDEO_STREAM_SOURCES[teamColor]}
				alt={`${capitalizeFirstLetter(teamColor)} Team Video`}
				className={`video-stream ${isVideoStreamLoaded ? "" : "hidden"}`}
				onLoad={() => setIsVideoStreamLoaded(true)}
				onError={() => setIsVideoStreamLoaded(false)}
			/>
			{!isVideoStreamLoaded && <BounceLoader size={100} color={teamColor} />}
		</div>
	);
};

export default VideoStream;
