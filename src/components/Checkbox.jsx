import React, { useRef, useCallback } from 'react'
import './Checkbox.css'

const Checkbox = ({ checked, onChange, ariaLabel }) => {
  const inputRef = useRef(null)

  const toggle = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div
      className="checkbox-container"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        tabIndex={-1}
      />
      <span className="checkbox-custom">
        {checked && (
          <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
      <span className="checkbox-label">{ariaLabel}</span>
    </div>
  )
}

export default Checkbox