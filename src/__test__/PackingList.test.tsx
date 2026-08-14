import {render, screen, fireEvent} from "@testing-library/react"
import PackingList from "../components/PackingList"
import { travelList } from "@/data/city"


describe("the packingList renders correctly", () => {
  const mockCity = travelList[3]
  const mockSelectedLists=["Stylish summer tops (2 for weekend / 5 for week)","Shorts/skirt (1 for weekend / 2 for week)", "Linen trousers (1 for weekend / 2 for week)","Evening outfit (1 for weekend / 2 for week)", "Underwear (3 for weekend / 7 for week)"]
  const mockFunction = jest.fn()
  const mockClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders correct city name", () => {
    render(<PackingList name={mockCity.name} img={mockCity.img} selectedId={mockCity.id} selectedLists={mockSelectedLists} updateFunction={mockFunction} updateClick={mockClick}/>)
    const citiesName = screen.getByText(mockCity.name)
    expect(citiesName).toBeInTheDocument()
  })

  test("renders image with correct src and alt", () => {
    render(<PackingList name={mockCity.name} img={mockCity.img} selectedId={mockCity.id} selectedLists={mockSelectedLists} updateFunction={mockFunction} updateClick={mockClick}/>)
    const cityImg = screen.getByRole("img")
    expect(cityImg.getAttribute("src")).toBe(mockCity.img)
    expect(cityImg.getAttribute("alt")).toBe(mockCity.name)
  })

  test("renders all packing list items from allPackLists", () => {
    render(<PackingList name={mockCity.name} img={mockCity.img} selectedId={mockCity.id} selectedLists={mockSelectedLists} updateFunction={mockFunction} updateClick={mockClick}/>)
    mockCity.allPackLists.forEach(list => {
      const packs = screen.getByLabelText(list)
      expect(packs).toBeInTheDocument()
    })
  })
   
  test("checkbox interaction in parent", () => {
    render(<PackingList name={mockCity.name} img={mockCity.img} selectedId={mockCity.id} selectedLists={mockSelectedLists} updateFunction={mockFunction} updateClick={mockClick}/>)
    const checkbox = screen.getAllByRole("checkbox")
    fireEvent.click(checkbox[0])

    expect(mockFunction).toHaveBeenCalled()
  })

  test("calls updateClick when submit button is clicked", () => {
    render(<PackingList name={mockCity.name} img={mockCity.img} selectedId={mockCity.id} selectedLists={mockSelectedLists} updateFunction={mockFunction} updateClick={mockClick}/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockClick).toHaveBeenCalled()
  })
})