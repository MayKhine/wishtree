import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"

type DropDrownProfileMenuType = {
  onLogOutFn?: () => void
  onProfileFn?: () => void
}

export const DropDrownProfileMenu = ({
  onProfileFn,
  onLogOutFn,
}: DropDrownProfileMenuType) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.menuButton)} onClick={onProfileFn}>
        Profile
      </div>
      <div {...stylex.props(styles.menuButton)} onClick={onLogOutFn}>
        Log Out
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    cursor: "pointer",
    position: "relative",
    zIndex: 100,
  },
  menuButton: {
    color: {
      default: tokens.darkBlue,
      ":Hover": tokens.grayTeal,
    },
    // backgroundColor: "pink",
    backgroundColor: {
      ":hover": tokens.offWhiteGreen,
    },
    margin: ".2rem",
    padding: ".3rem",
    borderRadius: ".5rem",
  },
})
