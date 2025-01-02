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
  const closeWishListForm = () => {
    setOpenWishListForm(false)
  }

  // const {mutate , data:loginUserData} = trpc.loginUser.useMutation()
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
          {openWishListForm && (
            <div {...stylex.props(styles.wishListFormContainer)}>
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
    flexWrap: "wrap",
  },
  wishListFormContainer: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
  },

  // wishListFormContainer: {
  //   width: {
  //     default: "100vw",
  //     "@media (min-width: 1025px)": "100%",
  //     "@media (min-width: 600px)": "100%",
  //   },
  //   height: "100vh",
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   zIndex: 1,
  //   display: "flex",
  //   justifyContent: "center",
  // },
})
