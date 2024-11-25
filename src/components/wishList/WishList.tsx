import { WishListType } from "src/types"
import { WishItem } from "./WishItem"

type WishListProps = {
  data: WishListType
}
export const WishList = ({ data }: WishListProps) => {
  // console.log("what is in my wish list: ", data)
  return (
    <div>
      <h2> {data.listName} </h2>

      <div>
        {data.items?.map((item, index) => {
          return <WishItem key={index} itemData={item} />
        })}
      </div>
    </div>
  )
}
