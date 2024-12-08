import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import { Button } from "../assets/Button"
import { InputError } from "../assets/InputError"
import { MenuBar } from "../assets/MenuBar"
import { stdStyles, tokens } from "../tokens.stylex"
import { trpc } from "../trpc"

export const CreateWishListPage = () => {
  const navigate = useNavigate()

  const { isSuccess, mutate: upsertWishList } =
    trpc.upsertWishList.useMutation()

  useEffect(() => {
    if (!isSuccess) {
      return
    }
    navigate("/")
  }, [isSuccess, navigate])

  const [error, setError] = useState(false)
  const [wishList, setWishList] = useState({
    id: uuidV4(),
    title: "",
    description: "",
    eventDate: "",
  })

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.id === "title") {
      setError(false)
    }

    setWishList((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  const createWishListHandler = () => {
    //check if wishlist title is empty
    if (wishList.title.length === 0) {
      setError(true)
      return
    }

    upsertWishList({
      id: wishList.id,
      title: wishList.title,
      description: wishList.description,
      // eventDate: wishList.eventDate?.toISODate() ?? undefined,
      eventDate: wishList.eventDate,
    })
  }

  return (
    <div {...stylex.props(styles.base)}>
      <MenuBar />

      <div {...stylex.props(styles.formContainer)}>
        <h3> Create A Wish List</h3>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label aria-label="title">Wishlist</label>
          <input
            {...stylex.props(stdStyles.input)}
            placeholder="My birthday wishlist"
            onChange={inputChangeHandler}
            type="text"
            id="title"
          />
          {error && <InputError errorMsg="Please enter a wishlist title" />}
        </div>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label aria-label="eventDate">Date</label>
          <input
            {...stylex.props(stdStyles.input)}
            type="date"
            id="eventDate"
            onChange={inputChangeHandler}
          />
        </div>
        <div {...stylex.props(stdStyles.inputsContainer)}>
          <label aria-label="description">Description</label>
          <textarea
            {...stylex.props(stdStyles.inputTextArea)}
            onChange={inputChangeHandler}
            id="description"
          />
        </div>
        {/* <div {...stylex.props(styles.radioButtonsContainer)}>
         
        <div {...stylex.props(styles.radioButtonDiv)}>
          <input
            {...stylex.props(styles.radioButton)}
            onChange={inputChangeHandler}
            type="radio"
            id="listPrivacy"
            name="listPrivacy"
            defaultChecked={true}
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
      </div> */}
        <div {...stylex.props(styles.buttonsContainer)}>
          <Button
            text="Cancel"
            onClickFn={() => {
              navigate("/")
            }}
          />
          <Button text="Create Wishlist" onClickFn={createWishListHandler} />
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "#eef4ed",
    display: "flex",
    flexDirection: "column",
    // gap: "1rem",
  },
  formContainer: {
    backgroundColor: tokens.lightGreen,
    width: "27rem",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: ".2rem",
  },

  radioButton: {
    height: "2rem",
    width: "2rem",
    appearance: "none", // Remove default browser styles
    border: "1px solid black",
    borderRadius: "50%",
    transition: "background-color 0.1s ease",
    cursor: "pointer",

    // Define default state
    ":checked": {
      // backgroundColor: "black", // Blue when checked
      // borderColor: "white",
      // border: ".8rem solid black",
      border: ".8rem solid black",
    },

    ":hover": {
      borderColor: "blue",
    },
  },
})
