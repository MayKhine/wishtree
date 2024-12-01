import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"
type PopUpType = {
  children?: React.ReactNode
}
export const PopUp = ({ children }: PopUpType) => {
  return <div {...stylex.props(styles.base)}> {children} </div>
}

const styles = stylex.create({
  base: {
    backgroundColor: "rgba(221, 221, 221, 0.6)",
    color: tokens.darkestBlue,
    // height: "100vh",
    zIndex: "1",
    left: 0,
    top: 0,
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
