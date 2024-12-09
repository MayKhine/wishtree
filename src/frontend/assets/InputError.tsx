import * as stylex from "@stylexjs/stylex"
type InputErrorType = {
  errorMsg: string
}
export const InputError = ({ errorMsg }: InputErrorType) => {
  return <div {...stylex.props(styles.base)}> {errorMsg}</div>
}

const styles = stylex.create({
  base: {
    color: "red",
    fontSize: ".9rem",
    height: "1.5rem",
    // backgroundColor: "pink",
    // width: "100%",
  },
})
