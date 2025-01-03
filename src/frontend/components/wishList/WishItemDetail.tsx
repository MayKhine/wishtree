import * as stylex from "@stylexjs/stylex"
import { AiFillEdit } from "react-icons/ai"
import { FaStar } from "react-icons/fa"
import { FiShare2 } from "react-icons/fi"
import { RiDeleteBin5Line } from "react-icons/ri"
import { WishItem } from "src/backend/domain/models/WishList"
import { Button } from "../../assets/Button"
import { tokens } from "../../tokens.stylex"

type WishItemDetailProps = {
  wishItemData: WishItem
  wishListCreater: boolean
  onDeleteFn: () => void
  onShareFn: () => void
  onReceivedFn: () => void
  onEditFn: () => void
}
export const WishItemDetail = ({
  wishItemData,
  wishListCreater,
  onDeleteFn,
  onShareFn,
  onReceivedFn,
  onEditFn,
}: WishItemDetailProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.leftDiv)}>
        <img
          {...stylex.props(styles.imgPreview)}
          // src={wishItem.imageUrl}
          src={
            "https://cdn.dribbble.com/userupload/13839344/file/original-e3aa0d52d9a0fe85f2dd7647c2549502.gif"
          }
          alt={wishItemData.name}
        />
      </div>
      <div {...stylex.props(styles.rightDiv)}>
        <div>
          {wishListCreater && (
            <div {...stylex.props(styles.icons)}>
              {wishItemData.mostWanted && (
                <FaStar
                  size={"2rem"}
                  strokeWidth={"2.5rem"}
                  // stroke={tokens.tealGreen}
                  fill={"gold"}
                  cursor={"pointer"}
                />
              )}
              <FiShare2
                size={"2rem"}
                fill={"gray"}
                cursor={"pointer"}
                onClick={onShareFn}
              />
              <AiFillEdit size={"2rem"} cursor={"pointer"} onClick={onEditFn} />
              <RiDeleteBin5Line
                size={"2rem"}
                cursor={"pointer"}
                onClick={onDeleteFn}
              />
            </div>
          )}
          {!wishListCreater && (
            <div {...stylex.props(styles.icons)}>
              {wishItemData.mostWanted && (
                <FaStar
                  size={"2rem"}
                  strokeWidth={"2.5rem"}
                  // stroke={tokens.tealGreen}
                  fill={"gold"}
                />
              )}
              <FiShare2 size={"2rem"} fill={"gray"} cursor={"pointer"} />
            </div>
          )}
        </div>

        <div {...stylex.props(styles.itemDetailContainer)}>
          <h2>{wishItemData.name}</h2>
          <div>${wishItemData.price}</div>
          {wishItemData.link && (
            <a
              {...stylex.props(styles.productLink)}
              href={wishItemData.link}
              target="_blank"
            >
              Product Link
            </a>
          )}
          <div>Quantity: {wishItemData.quantity}</div>
          <div>{wishItemData.notes}</div>
        </div>
        <div {...stylex.props(styles.buttonsContainer)}>
          {wishListCreater && (
            <Button
              text="Received as a gift"
              onClickFn={() => {
                console.log("todo: received this item")
              }}
            />
          )}
          {!wishListCreater && (
            <Button text="Reserve this gift" onClickFn={onReceivedFn} />
          )}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhite,
    fontWeight: "600",
    fontSize: "1rem",
    borderRadius: "1rem",
    minWidth: "55rem",
    width: "70%",
    height: "70%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    position: "fixed",
    zIndex: "11",
  },
  leftDiv: {
    width: "35%",
    // backgroundColor: "lightgray",
    padding: "3rem",
    // borderRadius: "4rem",
    flexShrink: 0,
  },
  imgPreview: {
    border: "0px solid black",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: ".5rem",
    // backgroundColor: "gray",
  },
  rightDiv: {
    width: "100%",
    // backgroundColor: "pink",
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyItems: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "gray",
    width: "100%",
    gap: ".5rem",
    marginBottom: "1rem",
  },

  dropDownMenuDiv: {
    position: "absolute",
    backgroundColor: tokens.offWhite,
    border: `2px solid ${tokens.tealGreen}`,
    borderRadius: ".5rem",
    boxShadow: "1rem 1rem 2rem rgba(0, 0, 0, 0.2)",
    padding: "8px",
    zIndex: 11,
    width: "10rem",
    marginTop: ".2rem",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "50%",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  itemDetailContainer: {
    // backgroundColor: "pink",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  productLink: {
    color: {
      default: tokens.grayTeal,
      ":Hover": tokens.tealGreen,
    },
    textDecoration: "none",
  },
})
