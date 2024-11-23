// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { tokens } from "src/tokens.stylex"
import { WishListItemType } from "src/types"

type WishItemProp = {
  itemData: WishListItemType
}
export const WishItem = ({ itemData }: WishItemProp) => {
  return (
    <div {...stylex.props(styles.base)}>
      <h3>{itemData.name}</h3>
      <p>{itemData.price}</p>
      <p>{itemData.status}</p>
      <p>{itemData.quantity}</p>
    </div>
  )
}

const styles = stylex.create({
  base: {
    margin: "1rem",
    backgroundColor: "#eef4ed",
    borderRadius: ".5rem",
    padding: "1rem",
    maxWidth: "50rem",
    minWidth: "25rem",
  },
})
