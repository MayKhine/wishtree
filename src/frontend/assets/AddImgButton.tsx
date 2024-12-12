import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"
// import { tokens } from "../tokens.stylex"
type AddImgButtonProps = {
  onClickFn: () => void
  text: string
}
export const AddImgButton = ({ onClickFn, text }: AddImgButtonProps) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      {text}
    </div>
  )
}

const styles = stylex.create({
  base: {
    border: "0px",
    borderRadius: ".3rem",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "1rem",
    // backgroundColor: "pink",
    color: { default: "black", ":hover": tokens.tealGreen },
    cursor: "pointer",
    // minWidth: "5.5rem",
    // width: "100%",
    display: "flex",
    justifyContent: "center",
  },
})
