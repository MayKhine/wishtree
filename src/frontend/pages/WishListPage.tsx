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
  console.log("what is wishlistID: ", wishlistid)
  const [togglePopUp, setTogglePopUp] = useState(false)

  const addANewWish = () => {
    setTogglePopUp(!togglePopUp)
  }

  const { isFetched, data } = trpc.getWishlist.useQuery(wishlistid)
  console.log("What is in data: ", data)

  //   {
  //     name: string;
  //     id: string;
  //     status: WishItemStatus;
  //     notes: string;
  //     mostWanted: boolean;
  //     quantity: number;
  //     wishListId: string;
  //     link?: (string | null) | undefined;
  //     price?: (number | null) | undefined;
  //     imageUrl?: (string | null) | undefined;
  // }
  const testDataArr = [
    {
      name: "shoe",
      id: "123a",
      status: "open",
      notes: "red shoe, size 8",
      mostWanted: false,
      quantity: 1,
      wishListId: "testListId",
      link: "",
      price: "",
      imageUrl: "",
    },
    {
      name: "timer clock",
      id: "123a",
      status: "open",
      notes: "a duck timer clock",
      mostWanted: true,
      quantity: 1,
      wishListId: "testListId",
      link: "",
      price: "",
      imageUrl: "",
    },
    {
      name: "test long long long longlonglonglongnalonglonglonglonglonglongme",
      id: "123a",
      status: "open",
      notes: "a duck timer clock",
      mostWanted: true,
      quantity: 1,
      wishListId: "testListId",
      link: "",
      price: "",
      imageUrl: "",
    },
  ]
  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
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

          {testDataArr.map((item) => {
            return <WishItem wishItem={item} />
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
  },
})
