import * as stylex from "@stylexjs/stylex"
import { tokens } from "../tokens.stylex"
import { MenuButton } from "./MenuButton"
import { useNavigate } from "react-router-dom"
export const MenuBar = () => {
  const navigate = useNavigate()
  return (
    <div {...stylex.props(styles.base)}>
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
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#134074",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "flex-end",
    // padding: "1rem",
    paddingRight: "1rem",
  },
})
