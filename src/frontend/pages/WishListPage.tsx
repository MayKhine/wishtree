import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { AddWishItemButton } from "../components/formButtons/AddWishItemButton"
import { WishItemForm } from "../components/forms/WishItemForm"
import { WishItem } from "../components/wishList/WishItem"
import { trpc } from "../trpc"

export const WishListPage = () => {
  const { wishlistid } = useParams<{ wishlistid: string }>()
  const [togglePopUp, setTogglePopUp] = useState(false)

  const addANewWish = () => {
    setTogglePopUp(!togglePopUp)
  }

  const { data } = trpc.getWishlist.useQuery(
    {
      wishListId: wishlistid!,
    },
    {
      enabled: Boolean(wishlistid),
    },
  )

  const { data: wishItems } = trpc.getWishItems.useQuery(
    {
      wishListId: wishlistid!,
    },
    {
      enabled: Boolean(wishlistid),
    },
  )

  console.log("WishList Page data:", wishlistid, data)
  console.log("WishList Page data:", wishItems)

  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        <div {...stylex.props(styles.header)}> {data?.title}</div>
        <div {...stylex.props(styles.AddWishItemButtonDiv)}>
          <AddWishItemButton onClickFn={addANewWish} />
        </div>
        <div {...stylex.props(styles.wishItemContainer)}>
          {togglePopUp && wishlistid && (
            <div {...stylex.props(styles.wishItemFormContainer)}>
              <PopUp
                onCancleFn={() => {
                  setTogglePopUp(false)
                }}
              ></PopUp>
              <WishItemForm
                wishListID={wishlistid}
                togglePopUp={() => {
                  setTogglePopUp(!togglePopUp)
                }}
              />
            </div>
          )}

          {wishItems?.map((item) => {
            return (
              <WishItem key={item.id} wishItem={item} wishListCreater={true} />
            )
          })}
        </div>
      </div>
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
    flexWrap: "wrap",
  },
  wishItemFormContainer: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    // backgroundColor: "red",
    left: 0,
    top: 0,
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
  },
  AddWishItemButtonDiv: {
    marginBottom: "2rem",
  },
})
