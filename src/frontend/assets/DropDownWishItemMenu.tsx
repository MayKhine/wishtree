import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"

export const DropDownWishItemMenu = () => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.menuButton)}> 1</div>
      <div {...stylex.props(styles.menuButton)}> 2</div>
    </div>
  )
}

const styles = stylex.create({
  base: { cursor: "pointer", position: "relative", zIndex: 100 },
  menuButton: {
    color: {
      default: "black",
      ":Hover": tokens.tealGreen,
    },
  },
})
