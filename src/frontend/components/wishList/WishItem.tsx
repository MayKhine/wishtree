// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { CgMoreO } from "react-icons/cg"
import { FaStar } from "react-icons/fa"
import { WishItem as wishItemType } from "../../../backend/domain/models/WishList"
// import { ReserveButton } from "../../assets/ReserveButton"

import { useState } from "react"
import { DropDownWishItemMenu } from "../../assets/DropDownWishItemMenu"
import { tokens } from "../../tokens.stylex"
type WishItemProp = {
  wishItem: wishItemType
  wishListCreater: boolean
}
export const WishItem = ({ wishItem, wishListCreater }: WishItemProp) => {
  // console.log("wish item: ", wishItem)
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false)

  const wishItemClickHandler = () => {
    console.log("Hi you clicked on wish item, go to that individual page")
    setDropDownMenu(false)
  }

  const wishItemMoreClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation() // Prevent the event from propagating to the whole div
    console.log("Hi you cicked on the more options")
    setDropDownMenu(!dropDownMenu)
  }

  return (
    <div {...stylex.props(styles.base)} onClick={wishItemClickHandler}>
      <div {...stylex.props(styles.productImg)}>
        <div {...stylex.props(styles.iconsContainer)}>
          <div>
            {wishListCreater && (
              <CgMoreO
                onClick={wishItemMoreClickHandler}
                size={"1.5rem"}
                // strokeWidth={"1"}
                // stroke={tokens.tealGreen}
                fill={"white"}
              />
            )}
            {dropDownMenu && (
              <div {...stylex.props(styles.dropDownMenuDiv)}>
                <DropDownWishItemMenu />
              </div>
            )}
          </div>
          {wishItem.mostWanted && (
            <FaStar
              {...stylex.props(styles.star)}
              size={"1.5rem"}
              strokeWidth={"2.5rem"}
              // stroke={tokens.tealGreen}
              fill={"gold"}
            />
          )}
        </div>
        {wishItem.imageUrl?.length > 0 && (
          <img
            {...stylex.props(styles.imgPreview)}
            src={wishItem.imageUrl}
            alt={wishItem.name}
          />
        )}
      </div>
      <div {...stylex.props(styles.line)} />
      <div {...stylex.props(styles.name)}>{wishItem.name}</div>
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
    // gap: ".3rem",
    margin: ".3rem",
    zIndex: "1",
    marginLeft: "13rem",
  },
  star: { cursor: "default" },
  dropDownMenuDiv: {
    position: "absolute",
    // top: "100%",
    // left: "0",
    backgroundColor: tokens.offWhite,
    border: `2px solid ${tokens.tealGreen}`,
    borderRadius: ".5rem",
    boxShadow: "1rem 1rem 2rem rgba(0, 0, 0, 0.2)",
    padding: "8px",
    zIndex: 100,
    width: "10rem",
  },
})
