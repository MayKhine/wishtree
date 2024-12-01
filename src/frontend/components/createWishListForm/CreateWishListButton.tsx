import * as stylex from "@stylexjs/stylex"

type CreateWishListButtonType = {
  onClickFn: () => void
}
export const CreateWishListButton = ({
  onClickFn,
}: CreateWishListButtonType) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onClickFn}>
      <p {...stylex.props(styles.text)}>+</p>
      <p {...stylex.props(styles.text2)}>Create wish list</p>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#eef4ed",
    borderRadius: ".5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "10rem",
    height: "10rem",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  text2: {
    fontSize: "1rem",
    fontWeight: "600",
  },
})
