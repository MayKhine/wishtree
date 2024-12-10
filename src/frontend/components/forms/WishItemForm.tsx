import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { v4 as uuidV4 } from "uuid"
import { Button } from "../../assets/Button"
import { InputError } from "../../assets/InputError"
import { RemoveButton } from "../../assets/RemoveButton"
import { stdStyles, tokens } from "../../tokens.stylex"

type WishItemFormType = {
  togglePopUp: () => void
  wishListID: string
}
export const WishItemForm = ({ togglePopUp, wishListID }: WishItemFormType) => {
  const addNewWishItemToList = () => {
    console.log("work on adding this wish to this list id: ", wishListID)
    console.log("Wish Item: ", wishItem)
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
    useState("Add Cover Image")

  const imgPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductImg(URL.createObjectURL(event.target.files[0]))
    setProductImgButtonText("Change Product Image")
  }
  const imgButtonHandler = () => {
    const input = document.getElementById("productImg") as HTMLInputElement
    input.click()
  }
  const removeimgButtonHandler = () => {
    setProductImg("")
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <h3> Create Wish</h3>
      </div>
      <div {...stylex.props(styles.formDiv)}>
        <div {...stylex.props(styles.leftDiv)}>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="wishListTitle">Wishlist</label>
            <input
              {...stylex.props(stdStyles.input)}
              placeholder="By deafult > current wishlist"
              onChange={inputChangeHandler}
              type="text"
              id="wishListTitle"
            />
            {error && <InputError errorMsg="Please enter a wishlist title" />}
          </div>
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
            {/* <FaRegStar {...stylex.props(styles.star)} size={"2rem"} /> */}
            {/* <FaStar {...stylex.props(styles.star)} size={"2rem"} /> */}
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
              <div>
                <label aria-label="price">Price</label>
                <input
                  {...stylex.props(styles.priceInput)}
                  type="number"
                  id="price"
                  onChange={inputChangeHandler}
                  min={0}
                />
              </div>
              <div>
                <label aria-label="quantity">Quantity</label>
                <input
                  {...stylex.props(styles.quantityInput)}
                  type="number"
                  id="quantity"
                  onChange={inputChangeHandler}
                  value={wishItem.quantity}
                  min={1}
                />
              </div>
            </div>
          </div>

          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="notes">Notes</label>
            <textarea
              {...stylex.props(stdStyles.inputTextArea)}
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
                <div {...stylex.props(styles.imgPreviewDiv2)}>
                  <img
                    {...stylex.props(styles.imgPreview)}
                    id="productImg"
                    src={productImg}
                  />
                  <RemoveButton onClickFn={removeimgButtonHandler} />
                </div>
              )}
              <Button
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
    backgroundColor: tokens.offWhite,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "1rem",
    width: "55rem",
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
  leftDiv: { width: "100%" },
  rightDiv: { minWidth: "25rem" },

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
    width: "calc(100% - 1.5rem)",
    height: "18rem",
    objectFit: "contain",
    borderRadius: ".3rem",
  },
  imgPreviewDiv: {
    border: "2px solid #82A3A1",
    // width: "100%",
    // width: "95%",
    height: "21rem",
    objectFit: "contain",
    backgroundColor: "lightgray",
    borderRadius: ".3rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  imgPreviewDiv2: {
    // marginLeft: "1.5rem",
    marginLeft: "1.5rem",
  },

  starContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "2.5rem",
    alignContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  pirceQuantityContainer: {
    display: "flex",
  },
  priceInput: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
  },
  quantityInput: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
  },
})
