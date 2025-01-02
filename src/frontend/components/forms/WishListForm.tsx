import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from "react"
import { FaDeleteLeft } from "react-icons/fa6"
import { v4 as uuidV4 } from "uuid"
import { AddImgButton } from "../../assets/AddImgButton"
import { Button } from "../../assets/Button"
import { InputError } from "../../assets/InputError"
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
    const first = event.target.files?.[0]
    if (!first) return
    setCoverImg(URL.createObjectURL(first))
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
                <div>
                  <FaDeleteLeft
                    {...stylex.props(styles.deleteButton)}
                    onClick={removeimgButtonHandler}
                    size={"1.5rem"}
                    fill={tokens.darkBlue}
                    // stroke={tokens.tealGreen}
                  />
                  <img
                    {...stylex.props(styles.imgPreview)}
                    id="coverImg"
                    src={coverImg}
                  />
                  {/* <RemoveButton onClickFn={removeimgButtonHandler} /> */}
                </div>
              )}
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
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "1rem",
    borderRadius: "1rem",
    zIndex: "10",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    alignSelf: {
      default: "flex-start",
      // "@media (min-width: 1025px) and (min-height: 500px)": "center",
      // "@media (min-width: 1025px) , (min-height: 950px)": "center", //950px => height of the form
      "@media (min-width: 1025px) ": "center",
    },
    width: {
      "@media (min-width: 1025px)": "63rem",
      "@media (max-width: 1024px)": "100%",
    },

    height: {
      // default: "100%",
      "@media (min-width: 1025px) and @media (min-height: 768px) ": "35rem",
      // "@media (max-width: 1024px)": "100%",
      "@media (max-width: 1024px)": "auto",
    },
    // boxSizing: "border-box",
  },

  header: {
    marginBottom: "1rem",
  },

  formDiv: {
    display: "flex",
    flexDirection: {
      default: "row",
      "@media (max-width: 1024px)": "column",
    },

    // gap: "3rem",
    gap: {
      default: "3rem",
      "@media (max-width: 1024px)": "1rem",
    },
  },

  leftDiv: {
    width: "100%",
    // backgroundColor: "white",
  },
  rightDiv: {
    width: "100%",
    // backgroundColor: "white",
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },

  imgInput: {
    display: "none",
  },

  imgPreview: {
    border: "0px solid black",
    // width: "calc(100% - 2rem)",
    width: "100%",
    height: "18rem",
    objectFit: "contain",
    borderRadius: ".3rem",
  },
  imgPreviewDiv: {
    border: "2px solid #82A3A1",
    height: "22rem",
    objectFit: "contain",
    // backgroundColor: "lightgray",
    backgroundColor: tokens.offWhite,
    borderRadius: ".3rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    width: "25rem",
  },

  deleteButton: {
    position: "absolute",
    zIndex: "11",
    cursor: "pointer",
    marginLeft: "23rem",
    marginTop: ".2rem",
  },
})
