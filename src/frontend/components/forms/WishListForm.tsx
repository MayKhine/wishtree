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
  formData?: formDataType
}

type formDataType = {
  id: string
  title: string
  description: string
  eventDate: string
}

export const WishListForm = ({
  closeWishListForm,
  formData,
}: WishListFormType) => {
  const utils = trpc.useUtils()

  const { isSuccess, mutate: upsertWishList } = trpc.upsertWishList.useMutation(
    {
      onSuccess: () => {
        utils.getMyWishLists.invalidate()
      },
    },
  )

  useEffect(() => {
    if (!isSuccess) {
      return
    }
    closeWishListForm()
  }, [isSuccess, closeWishListForm])

  const [error, setError] = useState(false)

  const [wishList, setWishList] = useState({
    id: formData?.id ? formData.id : uuidV4(),
    title: formData?.title ? formData.title : "",
    description: formData?.description ? formData.description : "",
    eventDate: formData?.eventDate ? formData.eventDate : "",
  })

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log("Input change handler : ", event.target.value)
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
  const buttonText = formData?.id ? "Save Wishlist" : "Create Wishlist"
  const formTitle = formData?.id ? "Edit Wishlist" : "Create A Wish List"

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
        <h3> {formTitle}</h3>
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
              value={wishList.title}
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
              value={wishList.eventDate}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="description">Description</label>
            <textarea
              {...stylex.props(stdStyles.inputTextArea)}
              onChange={inputChangeHandler}
              id="description"
              value={wishList.description}
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
            <Button text={buttonText} onClickFn={createWishListHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhiteGreen,
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
    marginTop: {
      default: 0,
      "@media (max-width: 1024px) ": "5rem",
    },
    alignSelf: {
      default: "flex-start",
      "@media (min-width: 1025px) ": "center",
    },
    width: {
      "@media (min-width: 1025px)": "63rem",
      "@media (max-width: 1024px)": "100%",
    },

    height: {
      "@media (max-width: 1024px)": "auto",
    },
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
    // width: "25rem",
    width: {
      default: "25rem",
      "@media (max-width: 767px)": "20rem",
    },
  },

  deleteButton: {
    position: "absolute",
    zIndex: "11",
    cursor: "pointer",
    // marginLeft: "23rem",
    marginLeft: {
      default: "23rem",
      "@media (max-width: 767px)": "18rem",
    },
    marginTop: ".2rem",
    // backgroundColor: tokens.offWhite,
    // background
  },
})
