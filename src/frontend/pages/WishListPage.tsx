import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { AddWishItemButton } from "../components/formButtons/AddWishItemButton"
import { WishItemForm } from "../components/forms/WishItemForm"
import { trpc } from "../trpc"

export const WishListPage = () => {
  const { wishlistid } = useParams<{ wishlistid: string }>()
  console.log("what is wishlistID: ", wishlistid)
  const [togglePopUp, setTogglePopUp] = useState(false)

  const addANewWish = () => {
    setTogglePopUp(!togglePopUp)
  }

  // const { isFetched, data } = trpc.getWishlist.useQuery(wishlistid)

  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        {" "}
        <div {...stylex.props(styles.header)}> Todo: Wishlist title</div>
        <div {...stylex.props(styles.wishItemContainer)}>
          <AddWishItemButton onClickFn={addANewWish} />

          {togglePopUp && (
            <PopUp>
              <WishItemForm
                wishListID={wishlistid}
                togglePopUp={() => {
                  console.log("what is toggle popup ", togglePopUp)
                  setTogglePopUp(!togglePopUp)
                }}
              />
            </PopUp>
          )}
        </div>
      </div>

      {/* <WishList data={testData} /> */}
    </div>
  )
}

const styles = stylex.create({
  base: {
    //  backgroundColor: "gray",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  header: {
    marginTop: "2rem",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  wishItemContainer: {
    display: "flex",
    gap: "1.5rem",
  },
})
