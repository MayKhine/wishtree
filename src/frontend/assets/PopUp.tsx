import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"
type PopUpProps = {
  children?: React.ReactNode
}
export const PopUp = ({ children }: PopUpProps) => {
  return <div {...stylex.props(styles.base)}> {children} </div>
}

const styles = stylex.create({
  base: {
    backgroundColor: "rgba(130, 163, 161, 0.4)",
    // color: tokens.tealGreen,
    // height: "100vh",
    zIndex: "10",
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
