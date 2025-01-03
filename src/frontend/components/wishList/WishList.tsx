import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { CgMoreO } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { ClearPopUp } from "../../assets/ClearPopUp"
import { DropDownWishItemMenu } from "../../assets/DropDownWishItemMenu"
import { tokens } from "../../tokens.stylex"

type WishListProps = {
  title: string
  wishlistID: string
}
export const WishList = ({ title, wishlistID }: WishListProps) => {
  const navigate = useNavigate()
  const wishListClick = () => {
    navigate(`/wishlist/${wishlistID}`)
  }

  const [toggleDropDownMenu, setToggleDropDownMenu] = useState<boolean>(false)

  const deleteListHandler = async () => {
    console.log("WishItem > TODO: edit list")
    setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const editListHandler = () => {
    console.log("WishItem > TODO: edit list")
    setToggleDropDownMenu(!toggleDropDownMenu)
  }

  const shareListHandler = () => {
    console.log("WishItem > todo: share list ")
    setToggleDropDownMenu(!toggleDropDownMenu)
  }
  return (
    <div
      {...stylex.props(styles.base)}
      // onClick={wishListClick}
    >
      <div {...stylex.props(styles.coverImg)}>
        <div {...stylex.props(styles.iconsContainer)}>
          <div
            {...stylex.props(styles.icon)}
            onClick={() => {
              console.log("HI work on the more options")
              setToggleDropDownMenu(true)
            }}
          >
            <CgMoreO size={"1.5rem"} />
          </div>
          {toggleDropDownMenu && (
            <div>
              <div {...stylex.props(styles.triangle)}></div>
              <div {...stylex.props(styles.dropDownMenuDiv)}>
                <ClearPopUp
                  onCancelFn={() => {
                    setToggleDropDownMenu(!toggleDropDownMenu)
                    console.log("clciked on  clear pop up")
                  }}
                />
                <DropDownWishItemMenu
                  onDeleteFn={deleteListHandler}
                  onShareFn={shareListHandler}
                  onEditFn={editListHandler}
                />
              </div>
            </div>
          )}
        </div>
        <img
          {...stylex.props(styles.imgPreview)}
          onClick={wishListClick}
          src="data:image/jpeg;base64,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"
        />
      </div>
      <div {...stylex.props(styles.line)} />
      <div {...stylex.props(styles.title)} onClick={wishListClick}>
        {title}
      </div>
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
    width: "15rem",
    height: "13rem",
    flexShrink: 0,
  },
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
    // marginTop: "1.8rem",
    marginLeft: "-6rem",
  },
  coverImg: {
    height: "9rem",
    backgroundColor: "gray",
  },

  imgPreview: {
    border: "0px solid black",
    objectFit: "contain",
    borderRadius: ".5rem",
    borderEndStartRadius: "0rem",
    borderEndEndRadius: "0rem",
    width: "15rem",
    backgroundColor: "pink",
    cursor: "pointer",
  },

  icon: {
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: {
      default: tokens.offWhite,
      ":hover": tokens.tealGreen,
    },
    cursor: "pointer",
  },

  iconsContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    marginLeft: "13rem",
    marginTop: ".5rem",
    // zIndex: "1",
    cursor: "pointer",
  },

  line: {
    height: "2px",
    backgroundColor: "black",
  },

  title: {
    height: "4rem",
    fontWeight: "600",
    alignContent: "center",
    marginLeft: ".5rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginRight: ".5rem",
    cursor: "pointer",
  },
})
