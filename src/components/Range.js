import React from "react"

export default function Range({ min, max }) {

  return (
    <div aria-disabled="false" className="input-range">
      <span className="input-range__label input-range__label--min">
        <span className="input-range__label-container"> {min}</span>
      </span>
      <div className="input-range__track input-range__track--background">
        <div className="input-range__track input-range__track--active" style={{ left: '0%', width: '100%' }}></div>
        <span className="input-range__slider-container" style={{ position: 'absolute', left: '0%' }}>
          <span className="input-range__label input-range__label--value">
            <span className="input-range__label-container">{min}</span>
          </span>
          <div aria-valuemax="200" aria-valuemin="3" aria-valuenow="3" className="input-range__slider" draggable="false" role="slider" tabIndex="0" aria-label="Precio mínimo"></div>
        </span><span className="input-range__slider-container" style={{ position: 'absolute', left: '100%' }}>
          <span className="input-range__label input-range__label--value">
            <span className="input-range__label-container">{max}</span>
          </span>
          <div aria-valuemax="200" aria-valuemin="3" aria-valuenow="200" className="input-range__slider" draggable="false" role="slider" tabIndex="0" aria-label="Precio máximo"></div>
        </span>
      </div>
      <span className="input-range__label input-range__label--max">
        <span className="input-range__label-container">{max}</span>
      </span>
    </div>
  )

}
