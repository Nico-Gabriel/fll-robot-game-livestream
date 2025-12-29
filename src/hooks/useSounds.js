import { useCallback, useEffect, useMemo } from "react";

const useSounds = (soundMap) => {
	const audios = useMemo(
		() => Object.fromEntries(Object.entries(soundMap).map(([key, src]) => [key, new Audio(src)])),
		[soundMap]
	);

	useEffect(
		() => () =>
			Object.values(audios).forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
			}),
		[audios]
	);

	const play = useCallback(
		(key) => {
			const audio = audios[key];

			if (!audio) {
				return;
			}

			audio.currentTime = 0;
			audio.play().catch((reason) => console.error("Failed to play audio:", reason));
		},
		[audios]
	);

	const stop = useCallback(
		(key) => {
			const audio = audios[key];

			if (!audio) {
				return;
			}

			audio.pause();
			audio.currentTime = 0;
		},
		[audios]
	);

	return { play, stop };
};

export { useSounds };
