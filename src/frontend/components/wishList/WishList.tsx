import * as stylex from "@stylexjs/stylex"
import { useNavigate } from "react-router-dom"
import { tokens } from "../../tokens.stylex"

type WishListProps = {
  title: string
  wishlistID: string
}
export const WishList = ({ title, wishlistID }: WishListProps) => {
  const navigate = useNavigate()
  const wishListClick = () => {
    navigate(`/wishlist/${wishlistID}`)
  }
  return (
    <div {...stylex.props(styles.base)} onClick={wishListClick}>
      <div {...stylex.props(styles.coverImg)}>
        <img />
      </div>
      <div {...stylex.props(styles.line)} />
      <div {...stylex.props(styles.title)}>{title}</div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhite,
    border: "2px solid #465362",
    borderRadius: ".5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",

    width: "15rem",
    height: "13rem",
  },
  coverImg: {
    height: "9rem",
    // backgroundColor: "white",
  },
  line: {
    height: "2px",
    backgroundColor: "black",
  },

  title: {
    height: "4rem",
    fontWeight: "600",
    alignContent: "center",
    marginLeft: ".5rem",
    // padding: "1rem",
    // marginTop: "1rem",
    // padding: "1rem",
    // backgroundColor: "pink",
    // border: "2px solid black",
    // borderRadius: ".5rem",
  },
})
