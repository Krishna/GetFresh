import { useSignal } from "@preact/signals";
import { NotEmittedStatement } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
import { useEffect } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

export default function Countdown(props: { target: string }) {
    const target = new Date(props.target);
    const now = useSignal(new Date());

    // Set up an interval to update the `now` date every second with the current 
    // date as long as the component is mounted.
    useEffect(() => {
        const timer = setInterval(() => {
            if (now.value > target) {
                clearInterval(timer);
            }
            now.value = new Date();
        }, 1000);
       return () => clearInterval(timer); 
    }, [props.target]);

    const secondsLeft = Math.floor(
        (target.getTime() - now.value.getTime()) / 1000,
    );

      // If the target date has passed, we stop counting down.
    if (secondsLeft <= 0) {
        return <span>🎉</span>;
    }

    // Otherwise, we format the remaining time using `Intl.RelativeTimeFormat` and
    // render it.
    return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
}