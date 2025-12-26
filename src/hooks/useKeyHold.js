import { useEffect, useRef } from "react";

const useKeyHold = (key, callback, ms = 2000, enabled = true) => {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef(null);

	const isKey = (event, key) => event.key.toLowerCase() === key.toLowerCase();

	const isTextInputFocused = () =>
		["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) || document.activeElement.isContentEditable;

	const clearTimeoutRef = (ref) => {
		if (ref.current) {
			clearTimeout(ref.current);
			ref.current = null;
		}
	};

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const onKeyDown = (e) => {
			if (!isKey(e, key) || e.repeat || isTextInputFocused()) {
				return;
			}

			timeoutRef.current = setTimeout(() => callbackRef.current?.(), ms);
		};

		const onKeyUp = (e) => {
			if (!isKey(e, key)) {
				return;
			}

			clearTimeoutRef(timeoutRef);
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);

			clearTimeoutRef(timeoutRef);
		};
	}, [key, ms, enabled]);
};

export { useKeyHold };
