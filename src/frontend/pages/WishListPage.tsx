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

  // const testDataArr = [
  //   {
  //     name: "shoe",
  //     id: "123a",
  //     status: "open",
  //     notes: "red shoe, size 8",
  //     mostWanted: false,
  //     quantity: 1,
  //     wishListId: "testListId",
  //     link: "",
  //     price: "",
  //     imageUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeDdy5MFKXZ9QkPb8UXd8nxC_4wrH0RTLZQ&s",
  //   },
  //   {
  //     name: "timer clock",
  //     id: "123a",
  //     status: "open",
  //     notes: "a duck timer clock",
  //     mostWanted: true,
  //     quantity: 1,
  //     wishListId: "testListId",
  //     link: "",
  //     price: "",
  //     imageUrl:
  //       "https://assets.adidas.com/images/w_940,f_auto,q_auto/ed35421359dd4f9989b6af310075e655_9366/HQ7033_HM1.jpg",
  //   },
  //   {
  //     name: "test long long long longlonglonglongnalonglonglonglonglonglongme",
  //     id: "123a",
  //     status: "open",
  //     notes: "a duck timer clock",
  //     mostWanted: true,
  //     quantity: 1,
  //     wishListId: "testListId",
  //     link: "",
  //     price: "",
  //     imageUrl: "",
  //   },
  // ]

  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        <div {...stylex.props(styles.header)}> {data?.title}</div>
        <div {...stylex.props(styles.wishItemContainer)}>
          <AddWishItemButton onClickFn={addANewWish} />

          {togglePopUp && wishlistid && (
            <PopUp>
              <WishItemForm
                wishListID={wishlistid}
                togglePopUp={() => {
                  setTogglePopUp(!togglePopUp)
                }}
              />
            </PopUp>
          )}

          {wishItems?.map((item) => {
            return (
              <WishItem key={item.id} wishItem={item} wishListCreater={true} />
            )
          })}
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
    flexWrap: "wrap",
  },
})
