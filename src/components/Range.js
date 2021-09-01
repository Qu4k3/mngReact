import React, { useEffect, useRef, useState } from "react"

export default function Range({ min, max, prices }) {

  const slider = useRef()
  const minValuePercent = useRef()
  const maxValuePercent = useRef()

  const minValueBetween = 15 // minimum space/price between min and max bullets, prevent overlap

  const [minValue, setMinValue] = useState()
  const [maxValue, setMaxValue] = useState()

  const [rangeStep] = useState(prices && prices.length - 1)
  const [leftPosition, setLeftPosition] = useState(0)
  const [rightPosition, setRightPosition] = useState(rangeStep)

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

  useEffect(() => {
    minValuePercent.current.style.left = ((leftPosition / rangeStep) * 100) + "%";
    setCurrentMinValue(prices[leftPosition])
  }, [leftPosition])

  useEffect(() => {
    maxValuePercent.current.style.left = ((rightPosition / rangeStep) * 100) + "%";
    setCurrentMaxValue(prices[rightPosition])
  }, [rightPosition])

  console.log('sliderWidth: ', sliderWidth, '\noffsetSliderWidth: ', offsetSliderWidth)

  console.log('min: ', currentMinValue, '\nmax: ', currentMaxValue)

  console.log('left: ', leftPosition, '\nright: ', rightPosition)

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

  function handleOnMouseMoveMin(e) {
    const dragedWidth = e.clientX - offsetSliderWidth;
    const dragedWidthInPercent = (dragedWidth * 100) / sliderWidth;
    const currentMinValue = Math.abs(parseInt((maxValue * dragedWidthInPercent) / 100));

    if (prices) {
      const dragedPortion = sliderWidth / rangeStep

      if ((dragedWidth <= 0)) {
        minValuePercent.current.style.left = 0 + "%";
        setCurrentMinValue(minValue)
      } else if (dragedWidth > (dragedPortion * leftPosition) && leftPosition < rightPosition - 1) {
        setLeftPosition(leftPosition + 1)
      } else if (dragedWidth < (dragedPortion * leftPosition)) {
        setLeftPosition(leftPosition - 1)
      } else if ((currentMinValue >= minValue) && (currentMinValue <= (currentMaxValue - minValueBetween))) {
        minValuePercent.current.style.left = dragedWidthInPercent + "%";
        setCurrentMinValue(currentMinValue)
      }
    }
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

  function handleOnMouseMoveMax(e) {
    const dragedWidth = e.clientX - offsetSliderWidth;
    const dragedWidthInPercent = (dragedWidth * 100) / sliderWidth;
    const currentMaxValue = Math.abs(parseInt((maxValue * dragedWidthInPercent) / 100));

    if (prices) {
      const dragedPortion = sliderWidth / rangeStep

      console.log('dragedwidth: ', dragedWidth, 'dragedPortion ', dragedPortion * rightPosition, 'rightposition ', rightPosition)

      if ((dragedWidth <= minValueBetween)) {
        maxValuePercent.current.style.left = minValueBetween + "%";
        setCurrentMaxValue(minValueBetween)
      } else if (dragedWidth > sliderWidth) {
        maxValuePercent.current.style.left = maxValuePercent + "%";
        setCurrentMaxValue(maxValue)
      } else if (dragedWidth < (dragedPortion * rightPosition) && rightPosition > leftPosition + 1) {
        setRightPosition(rightPosition - 1)
      } else if (dragedWidth > (dragedPortion * rightPosition)) {
        setRightPosition(rightPosition + 1)
      } else if (!prices && ((currentMaxValue >= (currentMinValue + minValueBetween)) && (currentMaxValue <= maxValue))) {
        maxValuePercent.current.style.left = dragedWidthInPercent + "%";
        setCurrentMaxValue(currentMaxValue)
      }
    }
  }

  function handleOnBlurPriceChangeMin(e) {
    let jumpMin = (parseInt(e.currentTarget.textContent))
    let jumpToInPercent

    if (jumpMin >= (currentMaxValue - minValueBetween)) {
      jumpMin = (currentMaxValue - minValueBetween)
      jumpToInPercent = jumpMin
      setCurrentMinValue(jumpMin)
    } else if (jumpMin <= minValue) {
      jumpToInPercent = minValue
      setCurrentMinValue(minValue)
    } else {
      jumpToInPercent = ((jumpMin * 100) / maxValue)
      setCurrentMinValue(jumpMin)
    }

    minValuePercent.current.style.left = jumpToInPercent + "%";
  }

  function handleOnBlurPriceChangeMax(e) {
    let jumpMax = (parseInt(e.currentTarget.textContent))
    let jumpToInPercent

    if (jumpMax <= (currentMinValue + minValueBetween)) {
      jumpMax = (currentMinValue + minValueBetween)
      jumpToInPercent = jumpMax
      setCurrentMaxValue(jumpMax)
    } else if (jumpMax >= maxValue) {
      jumpToInPercent = maxValue
      setCurrentMaxValue(maxValue)
    } else {
      jumpToInPercent = ((jumpMax * 100) / maxValue)
      setCurrentMaxValue(jumpMax)
    }

    maxValuePercent.current.style.left = jumpToInPercent + "%";
  }

  return (
    <div aria-disabled="false" className="input-range" ref={slider}>

      <span className="input-range__label input-range__label--min">
        <span className="input-range__label-container">{currentMinValue}</span>
      </span>

      <div className="input-range__track input-range__track--background" style={prices && { cursor: 'default' }}>

        <div className="input-range__track input-range__track--active" style={{ left: '0%', width: '100%' }}></div>

        <span className="input-range__slider-container" style={{ position: 'absolute', left: '0%' }} ref={minValuePercent}>
          <span className="input-range__label input-range__label--value">
            <span
              className="input-range__label-container"
              contentEditable={prices ? false : true}
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
              contentEditable={prices ? false : true}
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
