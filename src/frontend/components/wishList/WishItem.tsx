// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { FaStar } from "react-icons/fa"
import { WishItem as wishItemType } from "../../../backend/domain/models/WishList"
import { ReserveButton } from "../../assets/ReserveButton"

import { tokens } from "../../tokens.stylex"
type WishItemProp = {
  wishItem: wishItemType
}
export const WishItem = ({ wishItem }: WishItemProp) => {
  console.log("wish item: ", wishItem)
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.productImg)}>
        {wishItem.mostWanted && (
          <FaStar
            {...stylex.props(styles.star)}
            size={"1.5rem"}
            strokeWidth={"2.5rem"}
            // stroke={tokens.tealGreen}
            fill={"gold"}
          />
        )}
        <img />
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
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",

    width: "15rem",
    height: "13rem",
  },
  productImg: {
    height: "9rem",
  },
  line: {
    height: "2px",
    backgroundColor: "black",
  },

  name: {
    height: "4rem",
    fontWeight: "600",
    alignContent: "center",
    marginLeft: ".5rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginRight: ".5rem",
  },
  star: {
    position: "absolute",
    zIndex: "1",
    marginLeft: "13rem",
    marginTop: ".5rem",
  },
})
