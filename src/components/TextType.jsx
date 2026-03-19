import { useEffect, useRef, useState } from "react";

const textTypeCSS = `
  .text-type {
    display: inline-block;
    white-space: pre-wrap;
  }
  .text-type__cursor {
    margin-left: 0.25rem;
    display: inline-block;
    opacity: 1;
  }
  .text-type__cursor--hidden {
    display: none;
  }
`;

export default function TextType({
  texts = [],
  text = [],
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  className = "",
  style = {},
}) {
  // Support both `texts` and `text` props
  const allTexts = texts.length > 0 ? texts : text;

  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const indexRef    = useRef(0);
  const charRef     = useRef(0);
  const deletingRef = useRef(false);
  const injected    = useRef(false);

  // Inject CSS once
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const style = document.createElement("style");
    style.textContent = textTypeCSS;
    document.head.appendChild(style);
  }, []);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, cursorBlinkDuration * 1000);
    return () => clearInterval(interval);
  }, [showCursor, cursorBlinkDuration]);

  // Typing / deleting loop
  useEffect(() => {
    if (!allTexts.length) return;

    const getSpeed = () => {
      if (variableSpeedEnabled) {
        return Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin;
      }
      return deletingRef.current ? deletingSpeed : typingSpeed;
    };

    let timeout;

    const tick = () => {
      const current = allTexts[indexRef.current];

      if (!deletingRef.current) {
        // Typing
        if (charRef.current < current.length) {
          charRef.current += 1;
          setDisplayed(current.slice(0, charRef.current));
          timeout = setTimeout(tick, getSpeed());
        } else {
          // Pause before deleting
          timeout = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (charRef.current > 0) {
          charRef.current -= 1;
          setDisplayed(current.slice(0, charRef.current));
          timeout = setTimeout(tick, getSpeed());
        } else {
          // Move to next text
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % allTexts.length;
          timeout = setTimeout(tick, typingSpeed);
        }
      }
    };

    timeout = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeout);
  }, [allTexts, typingSpeed, deletingSpeed, pauseDuration, variableSpeedEnabled, variableSpeedMin, variableSpeedMax]);

  return (
    <span className={`text-type ${className}`} style={style}>
      {displayed}
      {showCursor && (
        <span className={`text-type__cursor${cursorVisible ? "" : " text-type__cursor--hidden"}`}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
