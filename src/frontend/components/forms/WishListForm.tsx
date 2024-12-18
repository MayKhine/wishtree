import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { AddImgButton } from "../../assets/AddImgButton"
import { Button } from "../../assets/Button"
import { InputError } from "../../assets/InputError"
import { RemoveButton } from "../../assets/RemoveButton"
import { stdStyles, tokens } from "../../tokens.stylex"
import { trpc } from "../../trpc"

type WishListFormType = {
  closeWishListForm: () => void
}

export const WishListForm = ({ closeWishListForm }: WishListFormType) => {
  const { isSuccess, mutate: upsertWishList } =
    trpc.upsertWishList.useMutation()

  useEffect(() => {
    if (!isSuccess) {
      return
    }
    closeWishListForm()
  }, [isSuccess, closeWishListForm])

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
    if (wishList.title.length === 0) {
      setError(true)
      return
    }

    upsertWishList({
      id: wishList.id,
      title: wishList.title,
      description: wishList.description,
      eventDate: wishList.eventDate,
    })
  }

  const [coverImg, setCoverImg] = useState<string | null>()
  const [coverImgButtonText, setCoverImgButtonText] =
    useState("+ Add Cover Image")

  const imgPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImg(URL.createObjectURL(event.target.files[0]))
    setCoverImgButtonText("Change Cover Image")
  }
  const imgButtonHandler = () => {
    const input = document.getElementById("coverimg") as HTMLInputElement
    input.click()
  }
  const removeimgButtonHandler = () => {
    setCoverImg("")
    setCoverImgButtonText("+ Add Cover Image")
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <h3> Create A Wish List</h3>
      </div>
      <div {...stylex.props(styles.formDiv)}>
        <div {...stylex.props(styles.leftDiv)}>
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
        </div>
        <div {...stylex.props(styles.rightDiv)}>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="coverImg">Cover Image</label>
            <div {...stylex.props(styles.imgPreviewDiv)}>
              <input
                {...stylex.props(styles.imgInput)}
                onChange={imgPreview}
                id="coverimg"
                type="file"
                accept="image/*"
              />
              {coverImg && coverImg.length > 0 && (
                <div {...stylex.props(styles.imgPreviewDiv2)}>
                  <img
                    {...stylex.props(styles.imgPreview)}
                    id="coverImg"
                    src={coverImg}
                  />
                  <RemoveButton onClickFn={removeimgButtonHandler} />
                </div>
              )}
              {/* <Button onClickFn={imgButtonHandler} text={coverImgButtonText} /> */}
              <AddImgButton
                onClickFn={imgButtonHandler}
                text={coverImgButtonText}
              />
            </div>
          </div>
          <div {...stylex.props(styles.buttonsContainer)}>
            <Button
              text="Cancel"
              onClickFn={() => {
                closeWishListForm()
              }}
            />
            <Button text="Create Wishlist" onClickFn={createWishListHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhite,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "1rem",
    minWidth: "55rem",
    flexWrap: "wrap",
    padding: "3rem",
    borderRadius: "1rem",
  },

  header: {
    marginBottom: "1rem",
  },

  formDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
  },
  leftDiv: { width: "100%", backgroundColor: "white" },
  rightDiv: { width: "100%", backgroundColor: "white" },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    // justifyContent: "space-between",
  },

  imgInput: {
    display: "none",
  },

  imgPreview: {
    border: "0px solid black",
    width: "calc(100% - 2rem)",
    height: "18rem",
    objectFit: "contain",
    borderRadius: ".3rem",
  },
  imgPreviewDiv: {
    border: "2px solid #82A3A1",
    height: "22rem",
    objectFit: "contain",
    // backgroundColor: "lightgray",
    borderRadius: ".3rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    width: "27rem",
  },
  imgPreviewDiv2: {
    // marginLeft: "1.5rem",
    marginLeft: "1.5rem",
  },
})
