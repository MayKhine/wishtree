import { WishType } from "src/types"
import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"
export const Wish = ({
  listId,
  listName,
  listPrivacy,
  listNotes,
  listDate,
}: WishType) => {
  return (
    <div {...stylex.props(styles.base)}>
      <p {...stylex.props(styles.text2)}> {listName}</p>
    </div>
  )
}

const styles = stylex.create({
  // base: {
  //   backgroundColor: tokens.offWhite,
  //   height: "10rem",
  //   width: "10rem",
  //   border: "1px solid black",
  //   borderRadius: "1rem",
  //   cursor: "pointer",
  //   // padding: "1rem",
  // },
  base: {
    backgroundColor: "#eef4ed",
    borderRadius: ".5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "10rem",
    height: "10rem",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  text2: {
    fontSize: "1rem",
    fontWeight: "600",
  },
})
