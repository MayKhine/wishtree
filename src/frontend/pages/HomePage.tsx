import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { CreateWishListButton } from "../components/formButtons/CreateWishListButton"
import { WishListForm } from "../components/forms/WishListForm"
import { WishList } from "../components/wishList/WishList"
import { trpc } from "../trpc"

export const HomePage = () => {
  const { data } = trpc.getMyWishLists.useQuery()
  const [openWishListForm, setOpenWishListForm] = useState(false)
  console.log("Home page: data: ", data)
  const closeWishListForm = () => {
    setOpenWishListForm(false)
  }
  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        <div {...stylex.props(styles.header)}> My Wishlists</div>
        <div {...stylex.props(styles.wishesContainer)}>
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
          {data?.map((wishList) => {
            return (
              <WishList
                key={wishList.id}
                title={wishList.title}
                wishlistID={wishList.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: "gray",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  header: {
    marginTop: "2rem",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  wishesContainer: {
    display: "flex",
    gap: "1.5rem",
  },
})
