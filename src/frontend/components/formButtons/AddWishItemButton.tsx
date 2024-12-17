import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"
type AddWishItemButtonType = {
  onClickFn: () => void
}
export const AddWishItemButton = ({ onClickFn }: AddWishItemButtonType) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      <p {...stylex.props(styles.text)}>+</p>
      <p {...stylex.props(styles.text2)}>Add Wish Item</p>
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
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    width: "35rem",
    height: "5rem",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  text2: {
    fontSize: "1rem",
    fontWeight: "600",
  },
})
