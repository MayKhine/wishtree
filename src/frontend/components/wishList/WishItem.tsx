import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { CgMoreO } from "react-icons/cg"
import { FaStar } from "react-icons/fa"
import { number } from "zod"
import { WishItem as wishItemType } from "../../../backend/domain/models/WishList"
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
    setToggleDropDownMenu(false)
    // navigate(`/wishlist/${wishItem.wishListId}/${wishItem.id}`)
    setToggleWishItemDetail(!toggleWishItemDetail)
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
    // setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const editItemHandler = () => {
    console.log("WishItem > TODO: edit item")
    // setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const shareItemHandler = () => {
    console.log("WishItem > todo: Share ")
    // setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const receivedItemHandler = () => {
    console.log("WishItem > Todo: received this item")
    // setToggleDropDownMenu(!toggleDropDownMenu)
  }

  // if (Number(wishItem.price) > 0) {
  //   console.log(" greater than 0 : ", Number(wishItem.price))
  // }
  const priceNum = Number(wishItem.price) > 0 ? Number(wishItem.price) : ""
  const wishItemNoteLength = wishItem.notes.length
  return (
    <div {...stylex.props(styles.base)}>
      <div
        {...stylex.props(styles.productImg(wishItemNoteLength))}
        onClick={wishItemClickHandler}
      >
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
          <h3
            {...stylex.props(styles.text(wishItemNoteLength))}
            onClick={wishItemClickHandler}
          >
            {wishItem.name}
          </h3>
          {priceNum && priceNum > 0 && (
            <h4 {...stylex.props(styles.textNoWrap)}> ${priceNum}</h4>
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

          {toggleWishItemDetail && wishItem.notes.length > 0 && (
            <div {...stylex.props(styles.wishItemDetailContainerUnder767px)}>
              {wishItem.notes}
            </div>
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
              <div>
                <div {...stylex.props(styles.triangle)}></div>
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
                </div>{" "}
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

        {/* <div {...stylex.props(styles.ReserveButtonDiv)}>
          <ReserveButton
            text="Reserve"
            onClickFn={() => {
              console.log("TODO: Reserve button")
            }}
          />
        </div> */}
      </div>
      {toggleWishItemDetail && (
        <div {...stylex.props(styles.wishItemDetailContainerOver767px)}>
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
    flexShrink: 0,
    flexDirection: {
      default: "row",
      "@media (max-width: 767px)": "column",
    },
    width: {
      default: "35rem",
      "@media (max-width: 767px)": "22rem",
      "@media (min-width: 768px) and  (max-width: 1024px)": "25rem",
    },
    minHeight: "13rem",
    // height: "auto",
  },
  productImg: (wishItemNoteLength: number) => ({
    height: "15rem",
    display: "flex",
    // cursor: "pointer",
    alignSelf: "center",
    cursor: {
      default: "pointer",
      "@media (max-width: 767px)":
        wishItemNoteLength > 0 ? "pointer" : "cursor",
    },
  }),

  imgPreview: {
    objectFit: "contain",
    borderRadius: ".5rem",
    width: {
      default: "12rem",
      "@media (max-width: 767px)": "20rem",
    },
    backgroundColor: tokens.tealGreen,
    border: `2px solid ${tokens.grayTeal}`,
    margin: "1rem",
  },
  rightDiv: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "pink",
    width: {
      default: "100rem",
      "@media (max-width: 767px)": "20rem",
    },
    margin: "1rem",
    marginTop: {
      "@media (max-width: 767px)": "0rem",
    },
    marginLeft: {
      default: "0rem",
      "@media (max-width: 767px)": "1rem",
    },

    // height: "13rem",
    minHeight: "10rem",
    height: "auto",
    // overflow: "hidden",
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
    height: "2rem",
    // marginLeft: "14rem", //margin to place reserve button on the div
    marginLeft: {
      default: "14rem",
      // "@media (max-width: 767px)": "22rem",
      "@media (min-width: 768px) and  (max-width: 1024px)": "4rem",
    },
  },

  rightDivWishItem: {
    display: "flex",
    flexDirection: "column",
    marginRight: ".5rem",
    width: "100%",
    minWidth: 0,
    gap: ".5rem",
    justifyItems: "center",
    justifyContent: "center",
    // overflow: "hidden",
  },
  text: (wishItemNoteLength: number) => ({
    cursor: {
      default: "pointer",
      "@media (max-width: 767px)":
        wishItemNoteLength > 0 ? "pointer" : "cursor",
    },
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  }),

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
    display: "flex",
    flexDirection: "column",
    gap: ".3rem",
  },
  star: { cursor: "default" },

  triangle: {
    width: "0",
    height: "0",
    borderLeft: ".3rem solid transparent",
    borderRight: ".3rem solid transparent",
    borderBottom: `.5rem solid ${tokens.tealGreen}`,
    marginLeft: ".5rem",
    marginTop: ".2rem",
  },
  dropDownMenuDiv: {
    position: "absolute",
    backgroundColor: tokens.tealGreen,
    // border: `2px solid ${tokens.tealGreen}`,
    borderRadius: ".5rem",
    boxShadow: "1rem 1rem 2rem rgba(0, 0, 0, 0.2)",
    padding: "8px",
    zIndex: 11,
    width: "10rem",
    // marginTop: ".2rem",
    marginLeft: "-6rem",
  },
  roundDiv: {
    borderRadius: "50%",
    // backgroundColor: tokens.offWhite,
    backgroundColor: {
      default: tokens.offWhite,
      ":hover": tokens.tealGreen,
    },
    height: "1.5rem",
    cursor: "pointer",
  },

  wishItemDetailContainerOver767px: {
    width: "100%",
    height: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 2,
    justifyContent: "center",
    display: {
      default: "flex",
      "@media (max-width: 767px)": "none",
    },
  },
  wishItemDetailContainerUnder767px: {
    display: {
      default: "none",
      "@media (max-width: 767px)": "flex",
    },
    flexWrap: "wrap",
    // backgroundColor: "yellow",
    width: "100%",
  },
})
