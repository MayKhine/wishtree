import * as stylex from "@stylexjs/stylex"
import { useNavigate } from "react-router-dom"
import { tokens } from "../tokens.stylex"
export const MenuBar = () => {
  const navigate = useNavigate()

  const testUser = {
    name: "May Blah blah",
    userName: "Mbler",
    birthday: "12/12/1995",
    bio: "test bio for test user",
    facebook: "facebook.com/test",
    numOfLists: "2",
    numOfFollowers: "0",
    numOfFollowings: "0",
  }
  return (
    <div {...stylex.props(styles.base)}>
      <div
        {...stylex.props(styles.logo)}
        onClick={() => {
          navigate("/")
        }}
      >
        WishTree
      </div>
      <div {...stylex.props(styles.menuButtonsContainer)}>
        <div
          {...stylex.props(styles.roundDiv)}
          onClick={() => {
            navigate("/profile")
          }}
        >
          {testUser.name[0]}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    // backgroundColor: tokens.tealGreen,
  },
  logo: {
    fontWeight: "800",
    fontSize: "2rem",
    paddingLeft: "1rem",
    cursor: "pointer",
    color: tokens.darkBlue,
  },
  menuButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "flex-end",
    paddingRight: "1rem",
  },

  roundDiv: {
    borderRadius: "50%",
    height: "3rem",
    width: "3rem",
    backgroundColor: tokens.darkBlue,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "800",
    color: tokens.offWhite,
    cursor: "pointer",
  },
})
