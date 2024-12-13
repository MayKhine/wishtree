// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { CgMoreO } from "react-icons/cg"
import { FaStar } from "react-icons/fa"
import { WishItem as wishItemType } from "../../../backend/domain/models/WishList"
// import { ReserveButton } from "../../assets/ReserveButton"
import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { ClearPopUp } from "../../assets/ClearPopUp"
import { DropDownWishItemMenu } from "../../assets/DropDownWishItemMenu"
import { PopUp } from "../../assets/PopUp"
import { tokens } from "../../tokens.stylex"
import { trpc } from "../../trpc"
import { WishItemDetail } from "./WishItemDetail"
type WishItemProp = {
  wishItem: wishItemType
  wishListCreater: boolean
}
export const WishItem = ({ wishItem, wishListCreater }: WishItemProp) => {
  // const navigate = useNavigate()
  const utils = trpc.useUtils()

  const { mutateAsync } = trpc.deleteWishItem.useMutation({
    onSuccess: () => {
      utils.getWishItems.invalidate()
    },
  })
  const [toggleWishItemDetail, setToggleWishItemDetail] =
    useState<boolean>(false)
  const [toggleDropDownMenu, setToggleDropDownMenu] = useState<boolean>(false)

  const wishItemClickHandler = () => {
    console.log(
      "Hi you clicked on wish item, go to that individual page",
      wishItem.name,
    )
    setToggleDropDownMenu(false)
    // navigate(`/wishlist/${wishItem.wishListId}/${wishItem.id}`)
    setToggleWishItemDetail(true)
  }

  const wishItemMoreClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    // event.stopPropagation() // Prevent the event from propagating to the whole div
    console.log("Hi you cicked on the more options", wishItem.name)
    setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const deleteItemHandler = async () => {
    await mutateAsync({ wishItemId: wishItem.id })
  }

  const editItemHandler = () => {
    console.log("WishItem > TODO: edit item")
  }

  const shareItemHandler = () => {
    console.log("WishItem > todo: Share ")
  }

  const receivedItemHandler = () => {
    console.log("WishItem > Todo: received this item")
  }
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.productImg)}>
        <div {...stylex.props(styles.iconsContainer)}>
          <div>
            {wishListCreater && (
              <div {...stylex.props(styles.roundDiv)}>
                <CgMoreO
                  onClick={wishItemMoreClickHandler}
                  size={"1.5rem"}
                  // strokeWidth={"1"}
                  stroke={tokens.tealGreen}
                  // fill={"pink"}
                />
              </div>
            )}
            {toggleDropDownMenu && (
              <div {...stylex.props(styles.dropDownMenuDiv)}>
                <ClearPopUp
                  onCancelFn={() => {
                    setToggleDropDownMenu(false)
                    console.log("clciked on  clear pop up")
                  }}
                />
                <DropDownWishItemMenu
                  onDeleteFn={deleteItemHandler}
                  onShareFn={shareItemHandler}
                  onEditFn={editItemHandler}
                  onReceivedFn={receivedItemHandler}
                />
              </div>
            )}
          </div>
          {wishItem.mostWanted && wishListCreater && (
            <FaStar
              {...stylex.props(styles.star)}
              size={"1.5rem"}
              strokeWidth={"2.5rem"}
              // stroke={tokens.tealGreen}
              fill={"gold"}
              cursor={"pointer"}
            />
          )}

          {wishItem.mostWanted && !wishListCreater && (
            <FaStar
              {...stylex.props(styles.star)}
              size={"1.5rem"}
              strokeWidth={"2.5rem"}
              // stroke={tokens.tealGreen}
              fill={"gold"}
              cursor={"pointer"}
            />
          )}
        </div>
        {/* {wishItem.imageUrl?.length > 0 && ( */}
        <img
          {...stylex.props(styles.imgPreview)}
          // src={wishItem.imageUrl}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeDdy5MFKXZ9QkPb8UXd8nxC_4wrH0RTLZQ&s"
          }
          alt={wishItem.name}
        />
        {/* )} */}
      </div>
      <div {...stylex.props(styles.line)} />
      <div {...stylex.props(styles.name)} onClick={wishItemClickHandler}>
        {wishItem.name}
      </div>

      {toggleWishItemDetail && (
        <div>
          <PopUp
            onCancleFn={() => {
              setToggleWishItemDetail(false)
            }}
          >
            {/* <WishItemDetail wishItemData={wishItem} /> */}
          </PopUp>
          <WishItemDetail
            wishItemData={wishItem}
            wishListCreater={wishListCreater}
          />
        </div>
      )}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhite,
    border: "2px solid #465362",
    borderRadius: ".5rem",
    display: "flex",
    flexDirection: "column",
    // cursor: "pointer",
    width: "15rem",
    height: "13rem",
    flexShrink: 0,
    // position: "relative",
    // zIndex: 0,
  },
  productImg: {
    height: "9rem",
    // backgroundColor: "pink",
    borderRadius: ".5rem",
  },

  imgPreview: {
    border: "0px solid black",
    width: "100%",
    height: "9rem",
    objectFit: "contain",
    borderRadius: ".5rem",
  },
  line: {
    height: "2px",
    backgroundColor: "black",
  },

  name: {
    cursor: "pointer",

    height: "4rem",
    fontWeight: "600",
    alignContent: "center",
    marginLeft: ".5rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginRight: ".5rem",
  },
  iconsContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: ".3rem",
    // zIndex: 1,
    marginLeft: "13rem",
  },
  star: { cursor: "default" },

  dropDownMenuDiv: {
    position: "absolute",
    backgroundColor: tokens.offWhite,
    border: `2px solid ${tokens.tealGreen}`,
    borderRadius: ".5rem",
    boxShadow: "1rem 1rem 2rem rgba(0, 0, 0, 0.2)",
    padding: "8px",
    zIndex: 11,
    width: "10rem",
    marginTop: ".2rem",
  },
  roundDiv: {
    borderRadius: "50%",
    backgroundColor: tokens.offWhite,
    height: "1.5rem",
    cursor: "pointer",
  },
})
