import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
import { FaDeleteLeft } from "react-icons/fa6"
import { v4 as uuidV4 } from "uuid"
import { AddImgButton } from "../../assets/AddImgButton"
import { Button } from "../../assets/Button"
import { InputError } from "../../assets/InputError"
import { RemoveButton } from "../../assets/RemoveButton"

import { stdStyles, tokens } from "../../tokens.stylex"
import { trpc } from "../../trpc"
type WishItemFormType = {
  togglePopUp: () => void
  wishListID: string
}
export const WishItemForm = ({ togglePopUp, wishListID }: WishItemFormType) => {
  const utils = trpc.useUtils()
  const { mutateAsync } = trpc.upsertWishItem.useMutation({
    onSuccess: () => {
      utils.getWishItems.invalidate()
    },
  })

  const addNewWishItemToList = async () => {
    console.log("work on adding this wish to this list id: ", wishListID)
    console.log("Wish Item: ", wishItem)
    await mutateAsync(wishItem)
    togglePopUp()
  }

  const [wishItem, setWishItem] = useState({
    id: uuidV4(),
    name: "",
    notes: "",
    price: 0,
    link: "",
    imageUrl: "",
    mostWanted: false,
    quantity: 1,
    wishListId: wishListID,
  })

  const [error, setError] = useState(false)

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.id === "name") {
      setError(false)
    }

    setWishItem((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  const toggleStar = () => {
    const curStar = wishItem.mostWanted
    setWishItem((prevState) => ({
      ...prevState,
      mostWanted: !curStar,
    }))
  }

  const [productImg, setProductImg] = useState<string | null>()
  const [productImgButtonText, setProductImgButtonText] =
    useState("+ Upload Image")

  const imgPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const first = event.target.files?.[0]
    if (!first) return
    setProductImg(URL.createObjectURL(first))
    setProductImgButtonText("Change Product Image")
  }
  const imgButtonHandler = () => {
    const input = document.getElementById("productImg") as HTMLInputElement
    input.click()
  }
  const removeimgButtonHandler = () => {
    setProductImg("")
    setProductImgButtonText("+ Upload Image")
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <h3> Create A Wish</h3>
      </div>
      <div {...stylex.props(styles.formDiv)}>
        <div {...stylex.props(styles.leftDiv)}>
          {/* <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="wishListTitle">Wishlist</label>
            <input
              {...stylex.props(stdStyles.input)}
              placeholder="By deafult > current wishlist"
              onChange={inputChangeHandler}
              type="text"
              id="wishListTitle"
            />
            {error && <InputError errorMsg="Please enter a wishlist title" />}
          </div> */}
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="name">Wishitem</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="name"
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(styles.starContainer)}>
            <label aria-label="name">Tag as Most Wanted</label>

            {!wishItem.mostWanted && (
              <FaStar
                size={"2rem"}
                onClick={toggleStar}
                strokeWidth={"2.5rem"}
                stroke={tokens.tealGreen}
                fill={tokens.offWhite}
              />
            )}
            {wishItem.mostWanted && (
              <FaStar
                size={"2rem"}
                onClick={toggleStar}
                strokeWidth={"2.5rem"}
                stroke={tokens.tealGreen}
                fill="gold"
              />
            )}
          </div>

          <div>
            <div {...stylex.props(styles.pirceQuantityContainer)}>
              <div {...stylex.props(styles.numberContainer)}>
                <label aria-label="price">Price</label>
                <input
                  {...stylex.props(styles.priceInput)}
                  type="number"
                  id="price"
                  onChange={(e) => {
                    setWishItem({
                      ...wishItem,
                      price: Number.parseFloat(e.target.value),
                    })
                  }}
                  min={0}
                />
              </div>
              <div {...stylex.props(styles.numberContainer)}>
                <label aria-label="quantity">Quantity</label>
                <input
                  {...stylex.props(styles.quantityInput)}
                  type="number"
                  onChange={(e) => {
                    setWishItem({
                      ...wishItem,
                      quantity: Number.parseInt(e.target.value),
                    })
                  }}
                  value={wishItem.quantity}
                  min={1}
                />
              </div>
            </div>
          </div>

          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="notes">Notes</label>
            <textarea
              {...stylex.props(styles.inputTextArea)}
              onChange={inputChangeHandler}
              id="notes"
            />
          </div>
        </div>
        <div {...stylex.props(styles.rightDiv)}>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="link">Product Link</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="link"
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="productImg">Product Image</label>
            <div {...stylex.props(styles.imgPreviewDiv)}>
              <input
                {...stylex.props(styles.imgInput)}
                onChange={imgPreview}
                id="productImg"
                type="file"
                accept="image/*"
              />
              {productImg && productImg.length > 0 && (
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
                    id="productImg"
                    src={productImg}
                  />
                  {/* <RemoveButton onClickFn={removeimgButtonHandler} /> */}
                </div>
              )}

              <AddImgButton
                onClickFn={imgButtonHandler}
                text={productImgButtonText}
              />
            </div>
          </div>
          <div {...stylex.props(styles.buttonsContainer)}>
            <Button
              text="Cancel"
              onClickFn={() => {
                togglePopUp()
              }}
            />
            <Button text="Create Wishlist" onClickFn={addNewWishItemToList} />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: tokens.offWhite,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    // fontWeight: "600",
    // fontSize: "1rem",
    // minWidth: "55rem",
    // flexWrap: "wrap",
    // padding: "3rem",
    // borderRadius: "1rem",
    // position: "fixed",
    // zIndex: 10,
    // alignSelf: "center",
    // justifySelf: "center",

    backgroundColor: tokens.offWhite,
    // margin: "1rem",
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
  },

  header: {
    marginBottom: "1rem",
  },

  formDiv: {
    display: "flex",
    // flexDirection: "row",
    // gap: "3rem",
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
    width: "100%",
    // width: "calc(100% - 2rem)",
    height: "18rem",
    objectFit: "contain",
    borderRadius: ".3rem",
  },
  imgPreviewDiv: {
    border: "2px solid #82A3A1",
    height: "22rem",
    objectFit: "contain",
    backgroundColor: tokens.offWhite,
    borderRadius: ".3rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    width: "25rem",
  },

  starContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  pirceQuantityContainer: {
    display: "flex",
    flexDirection: "row",
    // gap: "1rem",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  numberContainer: { display: "flex", flexDirection: "column" },

  priceInput: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    width: "9rem",
    // width: "100%",
  },
  quantityInput: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    // width: "100%",
    width: "9rem",
  },
  inputTextArea: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: "23rem",
    height: "15rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    resize: "none",
    backgroundColor: tokens.offWhite,
  },
  deleteButton: {
    position: "absolute",
    zIndex: "11",
    cursor: "pointer",
    marginLeft: "23rem",
    marginTop: ".2rem",
  },
})
