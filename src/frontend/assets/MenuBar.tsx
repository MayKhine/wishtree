import * as stylex from "@stylexjs/stylex"
import { useNavigate } from "react-router-dom"
import { MenuButton } from "./MenuButton"
export const MenuBar = () => {
  const navigate = useNavigate()
  return (
    <div {...stylex.props(styles.base)}>
      <div
        {...stylex.props(styles.logo)}
        onClick={() => {
          navigate("/")
        }}
      >
        WishTree
      </div>
      <div {...stylex.props(styles.menuButtonsContainer)}>
        <MenuButton
          text="Home"
          onClickFn={() => {
            navigate("/")
          }}
        />
        <MenuButton
          text="WishList"
          onClickFn={() => {
            navigate("/wishlist/123")
          }}
        />
        <MenuButton
          text="Profile"
          onClickFn={() => {
            navigate("/profile")
          }}
        />
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  logo: {
    fontWeight: "800",
    fontSize: "2rem",
    paddingLeft: "1rem",
    cursor: "pointer",
  },
  menuButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "flex-end",
    paddingRight: "1rem",
  },
})
