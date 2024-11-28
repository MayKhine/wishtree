import { WishListType } from "src/types"
import { WishItem } from "./WishItem"
import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"
type WishListProps = {
  data: WishListType
}
export const WishList = ({ data }: WishListProps) => {
  // console.log("what is in my wish list: ", data)
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.itemList)}>
        {data.items?.map((item, index) => {
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
    width: "60rem",
    backgroundColor: tokens.blue,
    // padding: "1rem",
  },
})
