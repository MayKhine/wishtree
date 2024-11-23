import { CreateWishList } from "../components/CreateWishList"
import { WishList } from "../components/WishList"
import * as stylex from "@stylexjs/stylex"

export const HomePage = () => {
  const testDate = new Date("11/01/2024")
  const testData = {
    listId: 123,
    listName: "My 30th birthday",
    items: [
      {
        name: "shoe",
        addedDate: testDate,
        link: "www.shoelink.com",
        price: 22.3,
        // color: "red",
        status: "open",
        notes: "Item desc",
        quantity: 1,
        image: "donot know yet",
        mostWanted: true,
      },
      {
        name: "cube box",
        addedDate: testDate,
        link: "",
        price: 22,
        // color: "red",
        status: "booked",
        notes: "any cube box is fine",
        quantity: 4,
        image: "donot know yet",
        mostWanted: false,
      },
    ],
  }

  return (
    <div {...stylex.props(styles.base)}>
      This is home page
      <CreateWishList />
      <WishList data={testData} />
    </div>
  )
}

const styles = stylex.create({ base: { backgroundColor: "#DDDDDD" } })
