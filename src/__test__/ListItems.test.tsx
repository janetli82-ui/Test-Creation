import { render, screen, fireEvent } from "@testing-library/react"
import ListItems from "../components/ListItems"

describe("ListItems", () => {
  test("renders checkboxes for pack list items", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const checkboxes = screen.getAllByRole("checkbox")
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  test("displays Shanghai items when selectedId is 0", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    expect(screen.getByText("Light cotton T-shirts (2 for weekend / 5 for week)")).toBeInTheDocument()
  })

  test("has data-testid on checkboxes", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const listItems = screen.getAllByTestId("list-item")
    expect(listItems.length).toBeGreaterThan(0)
  })

  test("calls updateChangeBox when checkbox is clicked", () => {
    let wasCalled = false
    const updateChangeBox = () => {
      wasCalled = true
    }

    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const firstCheckbox = screen.getAllByRole("checkbox")[0]
    fireEvent.click(firstCheckbox)

    expect(wasCalled).toBe(true)
  })

  test("adds item to list when checkbox is checked", () => {
    let updatedList: string[] = []
    const updateChangeBox = (lists: string[]) => {
      updatedList = lists
    }

    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const firstCheckbox = screen.getAllByRole("checkbox")[0]
    fireEvent.click(firstCheckbox)

    expect(updatedList.length).toBeGreaterThan(0)
  })

  test("shows checked state for items in selectedLists", () => {
    const updateChangeBox = () => { }
    render(
      <ListItems
        selectedId={0}
        selectedLists={["Sunscreen SPF 50+"]}
        updateChangeBox={updateChangeBox}
      />
    )
    const sunscreenCheckbox = screen.getByRole("checkbox", { name: "Sunscreen SPF 50+" })
    expect(sunscreenCheckbox).toBeChecked()
  })

  test("shows unchecked state for items not in selectedLists", () => {
    const updateChangeBox = () => { }
    render(
      <ListItems
        selectedId={0}
        selectedLists={["Portable fan"]}
        updateChangeBox={updateChangeBox}
      />
    )
    const sunscreenCheckbox = screen.getByRole("checkbox", { name: "Sunscreen SPF 50+" })
    expect(sunscreenCheckbox).not.toBeChecked()
  })

  test("queryBy finds checkbox by name", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const checkbox = screen.queryByRole("checkbox", { name: "Sneakers (1 pair)" })
    expect(checkbox).toBeInTheDocument()
  })

  test("getAllBy finds all checkboxes", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const allCheckboxes = screen.getAllByRole("checkbox")
    expect(allCheckboxes.length).toBeGreaterThanOrEqual(2)
  })

  test("updates state on multiple checkbox clicks", () => {
    let callCount = 0
    const updateChangeBox = () => {
      callCount++
    }

    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const checkboxes = screen.getAllByRole("checkbox")
    fireEvent.click(checkboxes[0])
    fireEvent.click(checkboxes[1])

    expect(callCount).toBe(2)
  })

  test("checkbox has correct id attribute", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const firstItem = screen.getAllByRole("checkbox")[0]
    expect(firstItem).toHaveAttribute("id", expect.any(String))
  })

  test("label has correct htmlFor attribute", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const firstItem = screen.getAllByRole("checkbox")[0]
    const label = firstItem.closest("label")
    expect(label).toHaveAttribute("for", expect.any(String))
  })

  test("renders all items from Shanghai travelList", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={0} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    const allCheckboxes = screen.getAllByRole("checkbox")
    expect(allCheckboxes.length).toBe(14)
  })

  test("renders Paris items when selectedId is 1", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={1} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    expect(screen.getByText("Breathable blouses (2 for weekend / 5 for week)")).toBeInTheDocument()
  })

  test("renders Milan items when selectedId is 2", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={2} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    expect(screen.getByText("Stylish summer tops (2 for weekend / 5 for week)")).toBeInTheDocument()
  })

  test("renders Koh Samui items when selectedId is 3", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={3} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    expect(screen.getByText("Swimsuits (2 for weekend / 4 for week)")).toBeInTheDocument()
  })

  test("renders Gran Canaria items when selectedId is 4", () => {
    const updateChangeBox = () => { }
    render(<ListItems selectedId={4} selectedLists={[]} updateChangeBox={updateChangeBox} />)
    expect(screen.getByText("Light hiking shorts (1 for weekend / 3 for week)")).toBeInTheDocument()
  })
})