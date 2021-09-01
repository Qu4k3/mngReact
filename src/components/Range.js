import React, { useEffect, useRef, useState } from "react"

export default function Range({ min, max, prices }) {

  let slider = useRef()
  let minValuePercent = useRef()
  let maxValuePercent = useRef()

  const minValueBetween = 15 // minimum space/price between min and max bullets, prevent overlap

  const [minValue, setMinValue] = useState()
  const [maxValue, setMaxValue] = useState()

  const [cursor, setCursor] = useState('grab')

  const [currentMinValue, setCurrentMinValue] = useState(min || Math.min(...prices))
  const [currentMaxValue, setCurrentMaxValue] = useState(max || Math.max(...prices))

  const [sliderWidth, setSliderWidth] = useState(0);
  const [offsetSliderWidth, setOffsetSliderWidth] = useState(0);

  useEffect(() => {
    if (min && max) {
      setMinValue(min)
      setMaxValue(max)
    }
    if (prices) {
      setMinValue(Math.min(...prices))
      setMaxValue(Math.max(...prices))
    }
    setSliderWidth(slider.current.offsetWidth)
    setOffsetSliderWidth(slider.current.offsetLeft)
  }, [])

  console.log('sliderWidth: ', sliderWidth, '\noffsetSliderWidth: ', offsetSliderWidth)

  console.log('min: ', currentMinValue, '\nmax: ', currentMaxValue)

  function handleOnMouseDownMin(e) {
    e.preventDefault()
    setCursor('grabbing')
    document.addEventListener('mousemove', handleOnMouseMoveMin)
    document.addEventListener('mouseup', handleOnMouseUpMin)
  }

  function handleOnMouseUpMin() {
    setCursor('grab')
    document.removeEventListener('mousemove', handleOnMouseMoveMin)
    document.removeEventListener('mouseup', handleOnMouseUpMin)
  }

  function handleOnMouseDownMax(e) {
    e.preventDefault()
    setCursor('grabbing')
    document.addEventListener('mousemove', handleOnMouseMoveMax)
    document.addEventListener('mouseup', handleOnMouseUpMax)
  }

  function handleOnMouseUpMax() {
    setCursor('grab')
    document.removeEventListener('mousemove', handleOnMouseMoveMax)
    document.removeEventListener('mouseup', handleOnMouseUpMax)
  }

  function handleOnMouseMoveMin(e) {
    const dragedWidth = e.clientX - offsetSliderWidth;
    const dragedWidthInPercent = (dragedWidth * 100) / sliderWidth;
    const currentMinValue = Math.abs(parseInt((maxValue * dragedWidthInPercent) / 100));

    if ((currentMinValue >= minValue) && (currentMinValue <= (currentMaxValue - minValueBetween))) {
      minValuePercent.current.style.left = dragedWidthInPercent + "%";
      setCurrentMinValue(currentMinValue)
    }
  }

  function handleOnMouseMoveMax(e) {
    const dragedWidth = e.clientX - offsetSliderWidth;
    const dragedWidthInPercent = (dragedWidth * 100) / sliderWidth;
    const currentMaxValue = Math.abs(parseInt((maxValue * dragedWidthInPercent) / 100));

    console.log('currentMaxValue', currentMaxValue, 'other ', (currentMinValue + minValueBetween))

    if ((currentMaxValue >= (currentMinValue + minValueBetween)) && (currentMaxValue <= maxValue)) {
      maxValuePercent.current.style.left = dragedWidthInPercent + "%";
      setCurrentMaxValue(currentMaxValue)
    }
  }

  function handleOnBlurPriceChangeMin(e) {
    setCurrentMinValue(parseInt(e.currentTarget.textContent))
  }

  function handleOnBlurPriceChangeMax(e) {
    setCurrentMinValue(parseInt(e.currentTarget.textContent))
  }

  return (
    <div aria-disabled="false" className="input-range" ref={slider}>

      <span className="input-range__label input-range__label--min">
        <span className="input-range__label-container">{currentMinValue}</span>
      </span>

      <div className="input-range__track input-range__track--background" >

        <div className="input-range__track input-range__track--active" style={{ left: '0%', width: '100%' }}></div>

        <span className="input-range__slider-container" style={{ position: 'absolute', left: '0%' }} ref={minValuePercent}>
          <span className="input-range__label input-range__label--value">
            <span
              className="input-range__label-container"
              contentEditable="true"
              onBlur={handleOnBlurPriceChangeMin}
              dangerouslySetInnerHTML={{ __html: currentMinValue }}
            ></span>€
          </span>
          <div
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            aria-valuenow={currentMinValue}
            aria-label="Precio mínimo"
            className="input-range__slider"
            style={{ cursor: cursor }}
            draggable="true"
            role="slider"
            tabIndex="0"
            onMouseDown={handleOnMouseDownMin}
          ></div>
        </span>

        <span className="input-range__slider-container" style={{ position: 'absolute', left: '100%' }} ref={maxValuePercent}>
          <span className="input-range__label input-range__label--value">
            <span
              className="input-range__label-container"
              contentEditable="true"
              onBlur={handleOnBlurPriceChangeMax}
              dangerouslySetInnerHTML={{ __html: currentMaxValue }}
            ></span>€
          </span>
          <div
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            aria-valuenow={currentMaxValue}
            className="input-range__slider"
            style={{ cursor: cursor }}
            draggable="true"
            role="slider"
            tabIndex="0"
            aria-label="Precio máximo"
            onMouseDown={handleOnMouseDownMax}
          ></div>
        </span>

      </div>

      <span className="input-range__label input-range__label--max">
        <span className="input-range__label-container">{currentMaxValue}</span>
      </span>

    </div>
  )

}
