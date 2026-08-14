import {render, screen} from "@testing-library/react"
import Result from "../components/Result"
import { travelList } from "@/data/city"

describe("test the 4 possible outcomes of the result component", () => {
  const mockCity = travelList[2]
  const mockSelectedItems = ["Stylish summer tops (2 for weekend / 5 for week)",
    "Linen trousers (1 for weekend / 2 for week)",
    "Evening outfit (1 for weekend / 2 for week)",
    "Comfortable heels/flats","Sun hat"]
  const extraItems = [...mockCity.importantList, "Stylish sunglasses", "Tote bag"]

  test("you select all correct items, displays the result", () => {
    render(<Result travel={mockCity} checkedItems={mockSelectedItems} />)
    mockSelectedItems.forEach(item => {
      if(mockCity.importantList.includes(item)){
        const showResult = screen.getByTestId("result")
        expect(showResult).toBeInTheDocument()
        expect(showResult).toHaveTextContent(/congratulation! You answered all of them correctly/i)
      }
    })
  })
  
  test("you select wrong, displays the result", () => {
    render(<Result travel={mockCity} checkedItems={mockSelectedItems} />)
    mockSelectedItems.forEach(item => {
      if(!mockCity.importantList.includes(item)){
        const showWarning = screen.getByTestId("result")
        expect(showWarning).toBeInTheDocument()
        expect(showWarning).toHaveTextContent(/challenge failed/i)
      }
    })

    const correctItems = mockSelectedItems.filter(item => 
      mockCity.importantList.includes(item)
    )
    const score = correctItems.length / mockCity.importantList.length 
    const result= screen.getByTestId("result")
    expect(result).toHaveTextContent(score.toString())
  })

  test("select all correct items but select extra, displays the result", () => {
     render(<Result travel={mockCity} checkedItems={extraItems} />)
     const result = screen.getByTestId("result")
     expect(result).toHaveTextContent(/warning.*correct answers.*extra.*challenge failed/i)
    
  })

  test("the user hasn't played yet", () => {
    render(<Result travel={mockCity} checkedItems={[]} />)
    const noResult = screen.queryByTestId("result")
    expect(noResult).not.toBeInTheDocument()
  })

})