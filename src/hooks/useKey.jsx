import { useEffect } from "react";

export function useKey(key, action, element = document, enabled = true) {
    // now i need use effect as im interacting with outside
    useEffect(() => {
        if (!enabled) return;

        function callback(e) {
            // checks whether the key pressed is the key provided
            if (
                e.code.toLowerCase() === key.toLowerCase() &&
                !["INPUT", "TEXTAREA"].includes(e.target.tagName)
            ) {
                action();
            }
        }

        const target = element === document ? document : element?.current;

        if (!target) return;

        // create an eventlistner for each keydown
        target.addEventListener("keydown", callback);

        return () => {
            target.removeEventListener("keydown", callback);
        };
    }, [key, action, element, enabled]);
}
