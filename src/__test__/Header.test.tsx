import {render, screen} from "@testing-library/react"
import Header from "@/components/Header"



describe("The header works ok", () => {
  test("that there is only one H1 on the page", () => {
    render(<Header />)
    const titleLevel = screen.getByRole("heading", {level: 1})
    expect(titleLevel).toBeInTheDocument()
  })

  test("that the header renders with correct text", () => {
    render(<Header />)
    const titleContent = screen.getByText(/are you ready to travel the world?/i)
    expect(titleContent).toBeInTheDocument()
  })

  test("includes the Subtitle component", () => {
    render(<Header />)
    const pageSubTitle = screen.getByTestId("subtitle")
    expect(pageSubTitle).toBeInTheDocument()
  })
})