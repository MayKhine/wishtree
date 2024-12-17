// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { CgMoreO } from "react-icons/cg"
import { FaStar } from "react-icons/fa"
import { WishItem as wishItemType } from "../../../backend/domain/models/WishList"
// import { useNavigate } from "react-router-dom"
// import { Button } from "../../assets/Button"
import { ClearPopUp } from "../../assets/ClearPopUp"
import { DropDownWishItemMenu } from "../../assets/DropDownWishItemMenu"
import { PopUp } from "../../assets/PopUp"
import { ReserveButton } from "../../assets/ReserveButton"
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

  const wishItemMoreClickHandler = () =>
    // event: React.MouseEvent<SVGElement>
    {
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
      <div {...stylex.props(styles.productImg)} onClick={wishItemClickHandler}>
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
      <div {...stylex.props(styles.rightDiv)}>
        <div {...stylex.props(styles.rightDivWishItem)}>
          <h3 {...stylex.props(styles.text)} onClick={wishItemClickHandler}>
            {wishItem.name}
          </h3>
          {wishItem.price > 0 && (
            <h4 {...stylex.props(styles.textNoWrap)}> ${wishItem.price}</h4>
          )}
          <h4 {...stylex.props(styles.textNoWrap)}>
            Quantity: {wishItem.quantity}
          </h4>
          {wishItem.link && (
            <h4 {...stylex.props(styles.textNoWrap)}>
              <a href={wishItem.link} target="_blank">
                Product Link
              </a>
            </h4>
          )}
        </div>
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

        <div {...stylex.props(styles.ReserveButtonDiv)}>
          <ReserveButton
            text="Reserve"
            onClickFn={() => {
              console.log("TODO: Reserve button")
            }}
          />
          {/* <Button text="Resv"  /> */}
        </div>
      </div>

      {toggleWishItemDetail && (
        <div {...stylex.props(styles.wishItemDetailContainer)}>
          <PopUp
            onCancleFn={() => {
              setToggleWishItemDetail(false)
            }}
          ></PopUp>
          <WishItemDetail
            wishItemData={wishItem}
            wishListCreater={wishListCreater}
            onDeleteFn={deleteItemHandler}
            onShareFn={shareItemHandler}
            onEditFn={editItemHandler}
            onReceivedFn={receivedItemHandler}
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
    flexDirection: "row",
    width: "35rem",
    height: "13rem",
    flexShrink: 0,
    // position: "relative",
    // zIndex: 0,
  },
  productImg: {
    borderRadius: ".5rem",
    height: "100%",
    display: "flex",
    cursor: "pointer",
  },

  imgPreview: {
    border: "0px solid black",
    objectFit: "contain",
    borderRadius: ".5rem",
    width: "12rem",
    backgroundColor: "pink",
    // padding: "1rem",
    margin: "1rem",
  },
  rightDiv: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: "1rem",
    overflow: "hidden",
    // backgroundColor: "lightgray",
  },

  ReserveButtonDiv: {
    position: "fixed",
    // backgroundColor: "pink",
    zIndex: 1,
    display: "flex",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    justifyItems: "flex-end",
    // width: "100%",
    marginLeft: "14rem", //margin to place reserve button on the div
    height: "2rem",
  },

  rightDivWishItem: {
    display: "flex",
    flexDirection: "column",
    // cursor: "pointer",
    // width: "19rem",
    // backgroundColor: "lightgray",
    // marginLeft: "1rem",
    marginRight: ".5rem",
    width: "100%",
    minWidth: 0,

    gap: ".5rem",
    // alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
  },
  text: {
    cursor: "pointer",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    // backgroundColor: tokens.offWhiteGreen,
    // minHeight: "1.5rem",
  },

  textNoWrap: {
    // display: "-webkit-box",
    // WebkitLineClamp: "3",
    // WebkitBoxOrient: "vertical",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    // backgroundColor: tokens.offWhiteGreen,
    width: "80%",
    // minHeight: "1.5rem",
  },
  iconsContainer: {
    width: "1.5rem",
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "column",
    gap: ".3rem",
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

  wishItemDetailContainer: {
    width: "100%",
    height: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
  },
})
