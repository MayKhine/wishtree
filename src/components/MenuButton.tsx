import * as stylex from "@stylexjs/stylex"

type MenuButtonType = {
  text: string
  onClickFn: () => void
}
export const MenuButton = ({ text, onClickFn }: MenuButtonType) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      {text}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#134074",
    color: { default: "#eef4ed", ":hover": "#8da9c4" },
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "1rem",

    // width: "max-content",
  },
})
