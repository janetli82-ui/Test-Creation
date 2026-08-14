import {render, screen, fireEvent} from "@testing-library/react"
import Home from "@/app/page"
import { travelList } from "@/data/city"

describe("Home component", () => {
  test("user can select city, then select importList and see result", () => {
    const mockCity = travelList[4]
    render(<Home />)
    const selectedCity = screen.getByTestId("city")
    fireEvent.change((selectedCity as HTMLSelectElement), { target: { value: mockCity.name } })
   
    const checkbox = screen.getAllByRole("checkbox")
      checkbox.forEach(item => {
      fireEvent.click(item)
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    const result = screen.getByTestId("result")
    expect(result).toBeInTheDocument()
  })
  
  test("state change - displays correct packing list when city selected", () => {
    const mockCity = travelList[4]
    render(<Home />)
    const selectedCity = screen.getByTestId("city")  
    fireEvent.change(selectedCity as HTMLSelectElement, { target: { value: mockCity.name } })
    expect((selectedCity as HTMLSelectElement).value).toBe(mockCity.name)

    mockCity.allPackLists.forEach(list => {
      const item = screen.getByText(list)
      expect(item).toBeInTheDocument()
    })

    const listItems = screen.getAllByTestId("list-item") 
    expect(listItems).toHaveLength(mockCity.allPackLists.length)
  })

})