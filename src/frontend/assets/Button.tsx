import * as stylex from "@stylexjs/stylex"
import { stdStyles } from "../tokens.stylex"
type ButtonProps = {
  onClickFn: () => void
  type?: "submit" | "reset" | "button"
  text: string
}
export const Button = ({ onClickFn, type, text }: ButtonProps) => {
  return (
    <button
      {...stylex.props(stdStyles.button)}
      type={type ? type : "button"}
      onClick={onClickFn}
    >
      {text}
    </button>
  )
}
