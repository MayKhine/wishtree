import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"
import { WishListType } from "../../types"
import { WishItem } from "./WishItem"

type WishListProps = {
  data: WishListType
}
export const WishList = ({ data }: WishListProps) => {
  // console.log("what is in my wish list: ", data)
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.itemList)}>
        {data.listItems?.map((item, index) => {
          return <WishItem key={index} itemData={item} />
        })}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: "pink",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "60rem",
    backgroundColor: tokens.blue,
    // padding: "1rem",
  },
})
