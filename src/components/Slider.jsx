import React, { useMemo } from 'react'
import './Slider.css'

const Slider = ({ value, onChange, min, max, step, formatValue, options = [] }) => {
  const hasOptions = Array.isArray(options) && options.length > 0

  const optionValues = useMemo(() => (hasOptions ? options.map(o => o.value) : []), [hasOptions, options])

  const getNearestIndex = (val) => {
    if (!hasOptions) return 0
    let nearestIdx = 0
    let nearestDiff = Infinity
    for (let i = 0; i < optionValues.length; i++) {
      const diff = Math.abs(optionValues[i] - val)
      if (diff < nearestDiff) {
        nearestDiff = diff
        nearestIdx = i
      }
    }
    return nearestIdx
  }

  const index = hasOptions ? (optionValues.indexOf(value) !== -1 ? optionValues.indexOf(value) : getNearestIndex(value)) : 0
  const maxIndex = hasOptions ? options.length - 1 : 0
  const percentage = hasOptions
    ? (maxIndex === 0 ? 0 : (index / maxIndex) * 100)
    : ((value - min) / (max - min)) * 100

  const handleRangeChange = (e) => {
    if (hasOptions) {
      const idx = parseInt(e.target.value, 10)
      const nextVal = options[idx]?.value
      if (typeof nextVal !== 'undefined') onChange(nextVal)
    } else {
      onChange(parseInt(e.target.value, 10))
    }
  }

  return (
    <div className="slider-container">
      {hasOptions && (
        <div className="slider-steps">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`slider-step${value === opt.value ? ' active' : ''}`}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="slider-track">
        <input
          type="range"
          min={hasOptions ? 0 : min}
          max={hasOptions ? maxIndex : max}
          step={hasOptions ? 1 : step}
          value={hasOptions ? index : value}
          onChange={handleRangeChange}
          className="slider-input"
        />
        <div
          className="slider-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="slider-selected">{formatValue ? formatValue(value) : value}</div>
    </div>
  )
}

export default Slider 