/**
 * @jest-environment jsdom
 */

import React from 'React'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Range from './Range'

test('render normal range values', () => {
  const normalRange = { min: 1, max: 100 }

  const component = render(<Range min={normalRange.min} max={normalRange.max} />)

  expect(component.container).toHaveTextContent(normalRange.min)
  expect(component.container).toHaveTextContent(normalRange.max)
})

test('render fixed range values', () => {
  const fixedRange = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  const component = render(<Range prices={fixedRange} />)

  expect(component.container).toHaveTextContent(fixedRange[0])
})