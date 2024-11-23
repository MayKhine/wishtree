import { ReactEventHandler, ReactHTMLElement } from "react"
import * as stylex from "@stylexjs/stylex"
export const CreateWishList = () => {
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e:", event.target.value)
  }
  return (
    <div>
      <label title="Name" />
      <input
        {...stylex.props(styles.input)}
        placeholder="My wish list"
        onChange={inputChangeHandler}
      />
    </div>
  )
}

const styles = stylex.create({
  input: {
    padding: ".5rem",
    borderRadius: ".3rem",
    width: "25rem",
    border: "0px solid black",
  },
})
