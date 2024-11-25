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
      <p> {listName}</p>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhite,
    height: "10rem",
    width: "10rem",
    border: "1px solid black",
    borderRadius: "1rem",
    cursor: "pointer",
    // padding: "1rem",
  },
})
