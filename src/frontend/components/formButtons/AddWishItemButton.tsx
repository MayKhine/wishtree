import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"
type AddWishItemButtonType = {
  onClickFn: () => void
}
export const AddWishItemButton = ({ onClickFn }: AddWishItemButtonType) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      <p {...stylex.props(styles.text2)}>+ Add A New Wish</p>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: {
      default: tokens.offWhite,
      ":hover": tokens.tealGreen,
    },
    border: "2px solid #465362",
    borderRadius: "5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    height: "3rem",
    marginBottom: "2rem",
    // width: "35rem",

    width: {
      default: "35rem",
      "@media (max-width: 767px)": "22rem",
      "@media (min-width: 768px) and  (max-width: 1024px)": "25rem",
    },
  },
  text: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  text2: {
    fontSize: "1rem",
    fontWeight: "600",
    color: {
      default: tokens.darkBlue,
      // ":hover": tokens.tealGreen,
    },
  },
})
