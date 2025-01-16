import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { CreateWishListButton } from "../components/formButtons/CreateWishListButton"
import { WishListForm } from "../components/forms/WishListForm"
import { WishList } from "../components/wishList/WishList"
import { trpc } from "../trpc"

export const WishListsPage = () => {
  const { data } = trpc.getMyWishLists.useQuery()
  const [openWishListForm, setOpenWishListForm] = useState(false)
  const closeWishListForm = () => {
    setOpenWishListForm(false)
  }

  const testUser = {
    name: "May Blah blah",
    userName: "Mbler",
    birthday: "12/12/1995",
    bio: "test bio for test user",
    facebook: "facebook.com/test",
    numOfLists: "2",
    numOfFollowers: "0",
    numOfFollowings: "0",
  }
  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        <div {...stylex.props(styles.header)}> {testUser.name}'s Wishlists</div>
        <div {...stylex.props(styles.wishesContainer)}>
          <CreateWishListButton
            onClickFn={() => {
              setOpenWishListForm(true)
            }}
          />

          {/* {openWishListForm && (
            <div {...stylex.props(styles.display767px)}>
              <WishListForm closeWishListForm={closeWishListForm} />
            </div>
          )} */}

          {openWishListForm && (
            <div
              {...stylex.props(
                // styles.displayOver767px,
                styles.wishListFormContainer,
              )}
            >
              <PopUp
                onCancleFn={() => {
                  closeWishListForm()
                }}
              ></PopUp>
              <WishListForm closeWishListForm={closeWishListForm} />
            </div>
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
    // background: "pink",
    margin: {
      default: "3rem",
      "@media (max-width: 767px)": "1rem",
      // "@media (min-width: 768px) and  (max-width: 1024px)": "25rem",
    },
    justifyItems: {
      default: "none",
      "@media (max-width: 767px)": "center",
      // "@media (min-width: 768px) and  (max-width: 1024px)": "25rem",
    },
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
    flexWrap: "wrap",
    // backgroundColor: "gray",
    justifyContent: {
      default: "none",
      "@media (max-width: 767px)": "center",
      // "@media (min-width: 768px) and  (max-width: 1024px)": "25rem",
    },
  },
  wishListFormContainer: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
  },
})
