import { WishList } from "../components/WishList"
import * as stylex from "@stylexjs/stylex"
export const HomePage = () => {
  return (
    <div {...stylex.props(styles.base)}>
      This is home page
      <WishList />
    </div>
  )
}

const styles = stylex.create({ base: { backgroundColor: "pink" } })
