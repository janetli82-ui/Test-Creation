import { render, screen, fireEvent } from '@testing-library/react'
import Selector from '../components/Selector'

describe('Selector', () => {
  test("renders dropdown select element", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  test("shows default option text", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🌃What city would you like?')).toBeInTheDocument()
  })

  test("has data-testid attribute", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByTestId('city')).toBeInTheDocument()
  })

  test("displays all 5 city options from travelList", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    const options = screen.getAllByRole('option')
    expect(options.length).toBe(6)
  })

  test("shows Shanghai as an option", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🏙️Shanghai')).toBeInTheDocument()
  })

  test("shows Paris as an option", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🗼Paris')).toBeInTheDocument()
  })

  test("shows Milan as an option", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🛍️Milan')).toBeInTheDocument()
  })

  test("shows Koh Samui as an option", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🏝️Koh Samui')).toBeInTheDocument()
  })

  test("shows Gran Canaria as an option", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByText('🏖️Gran Canaria')).toBeInTheDocument()
  })

  test("calls updateCity when city selection changes", () => {
    let selectedCity = ''
    const updateCity = (city: string) => {
      selectedCity = city
    }

    render(<Selector city="" updateCity={updateCity} />)
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Paris' }
    })

    expect(selectedCity).toBe('Paris')
  })

  test("shows selected city value in dropdown", () => {
    const updateCity = () => { }
    render(<Selector city="Shanghai" updateCity={updateCity} />)
    expect(screen.getByRole('combobox')).toHaveValue('Shanghai')
  })

  test("renders world image", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.getByAltText('world')).toBeInTheDocument()
  })

  test("has multiple select options", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    const allOptions = screen.getAllByRole('option')
    expect(allOptions.length).toBeGreaterThanOrEqual(2)
  })

  test("queryBy finds select element", () => {
    const updateCity = () => { }
    render(<Selector city="" updateCity={updateCity} />)
    expect(screen.queryByRole('combobox')).toBeInTheDocument()
  })
})