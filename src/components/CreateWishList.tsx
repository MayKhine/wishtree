import { ReactEventHandler, ReactHTMLElement, useState } from "react"
import * as stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"

type CreateWishListType = {
  onCancelFn: () => void
  onCreateFn: () => void
}
export const CreateWishList = ({
  onCancelFn,
  onCreateFn,
}: CreateWishListType) => {
  const [wishList, setWishList] = useState({
    listId: "1",
    listName: "",
    listPrivacy: "public",
    listNotes: "",
    listDate: new Date(),
    listItems: [],
  })
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("event: ", event.target.value, event.target.id)
    //update the state}
    setWishList((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
    // console.log("what is in wishlist", wishList)
  }

  return (
    <div {...stylex.props(styles.base)}>
      <h3> Create A Wish List</h3>
      <div {...stylex.props(styles.inputsContainer)}>
        <label aria-label="listName">Wishlist Name</label>
        <input
          {...stylex.props(styles.input)}
          placeholder="My birthday wishlist"
          onChange={inputChangeHandler}
          type="text"
          id="listName"
        />
      </div>
      <div {...stylex.props(styles.inputsContainer)}>
        <label aria-label="listNotes">Wishlist Notes</label>
        <input
          {...stylex.props(styles.input)}
          onChange={inputChangeHandler}
          type="text"
          id="listNotes"
        />
      </div>
      <div {...stylex.props(styles.inputsContainer)}>
        <input
          {...stylex.props(styles.input)}
          onChange={inputChangeHandler}
          type="radio"
          id="listPrivacy"
          name="listPrivacy"
          value="public"
          onChangeCapture={inputChangeHandler}
        />
         <label htmlFor="listPrivacy">Public</label>
        <input
          {...stylex.props(styles.input)}
          onChange={inputChangeHandler}
          type="radio"
          id="listPrivacy"
          name="listPrivacy"
          value="private"
        />
         <label htmlFor="listPrivacy">private</label>
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
