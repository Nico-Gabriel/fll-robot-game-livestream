import { useMemo } from "react";

const useSounds = (soundMap) => {
	const audios = useMemo(
		() => Object.fromEntries(Object.entries(soundMap).map(([key, src]) => [key, new Audio(src)])),
		[soundMap]
	);

	const play = (key) => {
		const audio = audios[key];

		if (!audio) {
			return;
		}

		audio.currentTime = 0;
		audio.play();
	};

	const stop = (key) => {
		const audio = audios[key];

		if (!audio) {
			return;
		}

		audio.pause();
		audio.currentTime = 0;
	};

	return { play, stop };
};

export { useSounds };
