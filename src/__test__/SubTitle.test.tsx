import { render, screen } from '@testing-library/react'
import SubTitle from '../components/SubTitle'

describe('subTitle', () => {
  test("<it shows the SubTitle component", () => {
    render(<SubTitle />)
    expect(screen.getByTestId('subtitle')).toBeInTheDocument()
  })
})