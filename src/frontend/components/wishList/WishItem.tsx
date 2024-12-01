// import * as stylex from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"
import { WishListItemType } from "src/frontend/types"
import { Button } from "../../assets/Button"
import { ReserveButton } from "../../assets/ReserveButton"
import { tokens } from "../../tokens.stylex"

type WishItemProp = {
  itemData: WishListItemType
}
export const WishItem = ({ itemData }: WishItemProp) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.wishListContainer)}>
        <div {...stylex.props(styles.header)}>
          <h3>{itemData.name}</h3>

          <ReserveButton
            text={itemData.status}
            onClickFn={() => {
              console.log("Reserver this item for the user")
            }}
          />
        </div>
        <p>{itemData.notes}</p>
        <p>${itemData.price}</p>
        {/* <p>{itemData.status}</p> */}
        <p>Quantity: {itemData.quantity}</p>
      </div>
    </div>
  )
}

const styles = stylex.create({
  wishListContainer: {
    // margin: "1rem",
    backgroundColor: "#eef4ed",
    borderRadius: ".5rem",
    // margin: "1rem",
    padding: "1rem",
    // width: "100%",
    // maxWidth: "50rem",
    // minWidth: "25rem",
    // display: 'flex'
  },
  base: {
    width: "100%",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: tokens.offWhite,
    alignItems: "center",
  },
})
