import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"

type CreateWishListButtonType = {
  onClickFn: () => void
}
export const CreateWishListButton = ({
  onClickFn,
}: CreateWishListButtonType) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      <p {...stylex.props(styles.text)}>+</p>
      <p {...stylex.props(styles.text2)}>Create wish list</p>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: {
      default: tokens.offWhite,
      ":hover": tokens.tealGreen,
    },
    border: `2px solid ${tokens.grayTeal}`,
    borderRadius: ".5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    width: "15rem",
    height: "13rem",
    flexShrink: 0,
  },
  text: {
    fontSize: "2rem",
    fontWeight: "600",
    margin: "0%",
  },
  text2: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: "0%",
  },
})
