import * as stylex from "@stylexjs/stylex"
import { IoSearch } from "react-icons/io5"
import { tokens } from "../tokens.stylex"

type searchButtonProps = {
  search: () => void
}
export const SearchButton = ({ search }: searchButtonProps) => {
  return (
    <div {...stylex.props(styles.base)} onClick={search}>
      <IoSearch size={"1.5rem"} fill={tokens.darkBlue} />
    </div>
  )
}

const styles = stylex.create({
  base: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
    padding: ".5rem",
  },
})
