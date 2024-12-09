import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { CreateWishListButton } from "../components/formButtons/CreateWishListButton"
import { WishListForm } from "../components/forms/WishListForm"
import { tokens } from "../tokens.stylex"
import { trpc } from "../trpc"

export const HomePage = () => {
  const { data } = trpc.getMyWishLists.useQuery()
  const [openWishListForm, setOpenWishListForm] = useState(false)
  console.log("Data: ", data)
  const closeWishListForm = () => {
    setOpenWishListForm(false)
  }
  return (
    <div {...stylex.props(styles.base)}>
      <MenuBar />
      <div {...stylex.props(styles.wishes)}>
        <CreateWishListButton
          onClickFn={() => {
            setOpenWishListForm(true)
          }}
        />
        {openWishListForm && (
          <PopUp>
            <WishListForm closeWishListForm={closeWishListForm} />
          </PopUp>
        )}
      </div>

      {data?.map((wishList) => {
        return <div>{wishList.title} </div>
      })}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#DDDDDD",
  },
  wishes: {
    backgroundColor: tokens.blue,
    display: "flex",

    gap: "1rem",
  },
  wishesContainer: {
    width: "10rem",
  },
})
