import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"

type DropDownWishItemMenuProps = {
  onDeleteFn: () => void
  onShareFn: () => void
  onReceivedFn?: () => void
  onEditFn: () => void
}
export const DropDownWishItemMenu = ({
  onDeleteFn,
  onShareFn,
  onReceivedFn,
  onEditFn,
}: DropDownWishItemMenuProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      {onReceivedFn && (
        <div {...stylex.props(styles.menuButton)} onClick={onReceivedFn}>
          Received as a gift
        </div>
      )}
      <div {...stylex.props(styles.menuButton)} onClick={onShareFn}>
        Share
      </div>
      <div {...stylex.props(styles.menuButton)} onClick={onDeleteFn}>
        Delete
      </div>
      <div {...stylex.props(styles.menuButton)} onClick={onEditFn}>
        Edit
      </div>
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
