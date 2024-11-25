import { ReactEventHandler, ReactHTMLElement, useState } from "react"
import * as stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"
import { tokens } from "../tokens.stylex"

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
      <div {...stylex.props(styles.radioButtonsContainer)}>
         
        <div {...stylex.props(styles.radioButtonDiv)}>
          <input
            {...stylex.props(styles.radioButton)}
            onChange={inputChangeHandler}
            type="radio"
            id="listPrivacy"
            name="listPrivacy"
            value="public"
            onChangeCapture={inputChangeHandler}
          />
          <label {...stylex.props(styles.label)} htmlFor="listPrivacy">
            Public
          </label>
        </div>
         
        <div {...stylex.props(styles.radioButtonDiv)}>
          <input
            {...stylex.props(styles.radioButton)}
            onChange={inputChangeHandler}
            type="radio"
            id="listPrivacy"
            name="listPrivacy"
            value="private"
          />
          <label {...stylex.props(styles.label)} htmlFor="listPrivacy">
            Private
          </label>
        </div>
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
    // backgroundColor: "pink",
  },

  buttonsContainer: {
    // backgroundColor: "pink",
    // margin: "1rem",
  },

  radioButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "flex-end",
  },

  radioButtonDiv: {
    // backgroundColor: "pink",
    height: "2rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: ".1rem",
    alignContent: "center",
    gap: ".5rem",
  },

  radioButton: {
    height: "2rem",
    width: "2rem",
    // backgroundColor: tokens.darkBlue,
    appearance: "none", // Remove default browser styles
    // position: "relative",
    // display: "inline-block",
    border: "1px solid black",
    borderRadius: "50%",
    transition: "background-color 0.1s ease",
    cursor: "pointer",

    // Define default state
    ":checked": {
      backgroundColor: "white", // Blue when checked
      // borderColor: "white",
      border: ".8rem solid black",
    },

    ":hover": {
      borderColor: "blue",
    },
  },
  label: {
    // color: { default: "red", ":hover": "#FFFEFB" },
  },
})
