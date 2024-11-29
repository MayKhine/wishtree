import * as stylex from "@stylexjs/stylex"
import { tokens, stdStyles } from "../../tokens.stylex"
import { Button } from "../../assets/Button"

type NewWishItemFormType = {
  togglePopUp: () => void
  listId: number
}
export const NewWishItemForm = ({
  togglePopUp,
  listId,
}: NewWishItemFormType) => {
  const addNewWishItemToList = () => {
    console.log("work on adding this wish to this list :D")
  }
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.form)}>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Item Link </label>
          <input {...stylex.props(stdStyles.input)}></input>
        </div>

        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Wishlist</label>
          <input
            {...stylex.props(stdStyles.input)}
            placeholder="dropdown input"
          ></input>
        </div>

        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Name</label>
          <input
            {...stylex.props(stdStyles.input)}
            placeholder="Enter item name"
          ></input>
        </div>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Description</label>
          <input
            {...stylex.props(stdStyles.input)}
            placeholder="Enter a description - do you want a specific brand? color? size?"
          ></input>
        </div>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Price</label>
          <input {...stylex.props(stdStyles.input)}></input>
        </div>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label>Quantity</label>
          <input {...stylex.props(stdStyles.input)}></input>
        </div>
        <div>
          <Button text="Cancel" onClickFn={togglePopUp} />
          <Button text="Add" onClickFn={addNewWishItemToList} />
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.blue,
    minWidth: "30rem",
    // height: "30%",
    borderRadius: "1rem",
    padding: "1rem",
  },
  form: {
    backgroundColor: tokens.offWhiteGreen,
  },
})
