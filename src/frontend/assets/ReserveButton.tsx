import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"
// import { tokens } from "../../../tokens.stylex"
type ReserveButtonType = {
  text: string
  onClickFn?: () => void
}
export const ReserveButton = ({ text, onClickFn }: ReserveButtonType) => {
  const buttonText = text == "open" ? "Rex" : text == "booked" ? "Rezed" : text

  return (
    <div {...stylex.props(styles.base(text))} onClick={onClickFn}>
      {buttonText}
    </div>
  )
}

const styles = stylex.create({
  base: (text) => ({
    cursor: text == "open" ? "pointer" : "cursor",
    // cursor: "pointer",
    border: "2px solid black",
    borderRadius: "5rem",
    padding: ".5rem",
    backgroundColor: tokens.offWhite,
    // backgroundColor: "pink",
    minWidth: "3rem",
    display: "flex",
    justifyContent: "center",
  }),
})
