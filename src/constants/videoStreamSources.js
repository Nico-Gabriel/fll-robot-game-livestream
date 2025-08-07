import { TeamColor } from "constants";

export const VIDEO_STREAM_SOURCES = Object.freeze({
	[TeamColor.RED]: process.env.REACT_APP_RED_TEAM_VIDEO_STREAM_SRC,
	[TeamColor.BLUE]: process.env.REACT_APP_BLUE_TEAM_VIDEO_STREAM_SRC,
});
