import * as stylex from "@stylexjs/stylex"
// import { tokens } from "../tokens.stylex"
type PopUpProps = {
  children?: React.ReactNode
  onCancleFn?: () => void
}
export const PopUp = ({ children, onCancleFn }: PopUpProps) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onCancleFn}>
      {children}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "rgba(130, 163, 161, 0.4)",
    // color: tokens.tealGreen,
    // height: "100vh",
    zIndex: 10,
    left: 0,
    top: 0,
    position: "fixed",
    width: "100%",
    height: "100%",
    // width: "100vw",
    // height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
