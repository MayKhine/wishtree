import * as stylex from "@stylexjs/stylex"
import { MenuBar } from "../assets/MenuBar"
import { tokens } from "../tokens.stylex"
export const SearchedProfilesPage = () => {
  const testSearchResult = [
    { id: "2323", name: "Kyaw" },
    { id: "er3e", name: "m" },
  ]
  return (
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        {testSearchResult.map((eachUser) => {
          return (
            <div {...stylex.props(styles.profileContainer)}>
              {" "}
              {eachUser.id} {eachUser.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: "pink",
    margin: {
      default: "3rem",
      "@media (max-width: 767px)": "1rem",
    },
    justifyItems: {
      default: "none",
      "@media (max-width: 767px)": "center",
    },
    display: "flex",
    gap: "1.5rem",
  },
  profileContainer: {
    backgroundColor: tokens.offWhite,
    border: "2px solid #465362",
    borderRadius: ".5rem",
    display: "flex",
    flexDirection: "column",
    width: "15rem",
    height: "13rem",
    flexShrink: 0,
  },
})
