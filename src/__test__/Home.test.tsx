import {render, screen, fireEvent, Matcher} from "@testing-library/react"
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

    mockCity.allPackLists.forEach((list: Matcher) => {
      const item = screen.getByText(list)
      expect(item).toBeInTheDocument()
    })

    const listItems = screen.getAllByTestId("list-item") 
    expect(listItems).toHaveLength(mockCity.allPackLists.length)
  })

  test("scoring", () => {
    render(<Home />)

    const selectedCity = screen.getByTestId("city") as HTMLSelectElement
    fireEvent.change(selectedCity, {target: {value: "Paris"}})

    const checkboxes = screen.getAllByRole("checkbox")

    fireEvent.click(checkboxes[0])
    fireEvent.click(checkboxes[1])
    fireEvent.click(checkboxes[2])
    fireEvent.click(checkboxes[3])
    fireEvent.click(checkboxes[4])

    const updatedCheckboxes = screen.getAllByRole("checkbox") as HTMLInputElement[]
    const checkedCount = updatedCheckboxes.filter(cb => cb.checked).length 
    
    expect(checkedCount).toBe(5)
  })

})