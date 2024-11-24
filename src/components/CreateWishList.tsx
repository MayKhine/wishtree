import { ReactEventHandler, ReactHTMLElement } from "react"
import * as stylex from "@stylexjs/stylex"
import { Button } from "./Button"

type CreateWishListType = {
  onCancelFn: () => void
  onCreateFn: () => void
}
export const CreateWishList = ({
  onCancelFn,
  onCreateFn,
}: CreateWishListType) => {
  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("e:", event.target.value)
  }

  const notesInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("e:", event.target.value)
  }
  return (
    <div {...stylex.props(styles.base)}>
      <h3> Create A Wish List</h3>
      <div {...stylex.props(styles.inputsContainer)}>
        <label aria-label="listName">Wishlist Name</label>
        <input
          {...stylex.props(styles.input)}
          placeholder="My birthday wishlist"
          onChange={nameInputChangeHandler}
        />
      </div>
      <div {...stylex.props(styles.inputsContainer)}>
        <label aria-label="listNotes">Wishlist Notes</label>
        <input
          {...stylex.props(styles.input)}
          // placeholder="My wish list"
          onChange={notesInputChangeHandler}
        />
        {/* <textarea
          {...stylex.props(styles.input)}
          // placeholder="My wish list"
          onChange={notesInputChangeHandler}
        /> */}
      </div>
      <div {...stylex.props(styles.buttonsContainer)}>
        <Button text="Cancel" onClickFn={onCancelFn} />
        <Button text="Create" onClickFn={onCreateFn} />
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#eef4ed",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    // fontSize: ".8rem",
  },
  input: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: "25rem",
    border: "0px solid black",
    fontFamily: '"Funnel Sans", sans-serif',
  },

  buttonsContainer: {
    // backgroundColor: "pink",
    // margin: "1rem",
  },
})
