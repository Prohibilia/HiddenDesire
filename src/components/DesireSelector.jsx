import React from 'react';
import './DesireSelector.css';

export default function DesireSelector({ slogan, minLabel, maxLabel, value, onChange }) {
  // Parsing label and icon
  const [minIcon, ...minTextArr] = minLabel.split(' ');
  const minText = minTextArr.join(' ');
  const [maxText, maxIcon] = (() => {
    const arr = maxLabel.split(' ');
    return [arr.slice(0, -1).join(' '), arr[arr.length - 1]];
  })();

  // Calcola luminosità
  let leftLum = 0.5, rightLum = 0.5;
  if (value <= 40) { leftLum = 1; rightLum = 0.4; }
  else if (value >= 60) { leftLum = 0.4; rightLum = 1; }

  return (
    <div className="desire-selector">
      <div className="desire-selector-slogan">{slogan}</div>
      <div className="desire-selector-bar-row">
        <span
          className="desire-selector-icon"
          style={{ left: '-22px', opacity: leftLum, filter: `brightness(${leftLum})` }}
        >{minIcon}</span>
        <span
          className="desire-selector-icon"
          style={{ right: '-22px', opacity: rightLum, filter: `brightness(${rightLum})` }}
        >{maxIcon}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="desire-selector-slider"
        />
      </div>
      <div className="desire-selector-labels">
        <span style={{ opacity: leftLum, filter: `brightness(${leftLum})` }}>{minText}</span>
        <span style={{ opacity: rightLum, filter: `brightness(${rightLum})` }}>{maxText}</span>
      </div>
    </div>
  );
} 