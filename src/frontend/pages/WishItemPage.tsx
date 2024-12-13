import { useParams } from "react-router-dom"
import { trpc } from "../trpc"

export const WishItemPage = () => {
  const { wishlistid, wishitemid } = useParams<{
    wishlistid: string
    wishitemid: string
  }>()

  //get only this wish item information

  console.log("Wishlist: ", wishlistid, ", and wish itme id: ", wishitemid)

  return <div> Wish Item Page</div>
}
