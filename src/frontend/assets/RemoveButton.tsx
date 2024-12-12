import * as stylex from "@stylexjs/stylex"
type RemoveButtonType = {
  onClickFn: () => void
}
export const RemoveButton = ({ onClickFn }: RemoveButtonType) => {
  return (
    <button {...stylex.props(styles.base)} onClick={onClickFn}>
      x
    </button>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: "red",
    border: "0px solid black",
    borderRadius: "8rem",
    height: "1.5rem",
    width: "1.5rem",
    zIndex: "1",
    cursor: "pointer",
    position: "absolute",
    marginRight: "2rem",
    marginTop: ".5rem",
  },
})
