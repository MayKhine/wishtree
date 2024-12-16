import * as stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { tokens } from "../tokens.stylex"
export const ProfilePage = () => {
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
    <div>
      <MenuBar />
      <div {...stylex.props(styles.base)}>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.roundDiv)}>{testUser.name[0]}</div>
        </div>
        <div>
          <div {...stylex.props(styles.userInfoContainer)}>
            {/* <div> {testUser.name}</div> */}
            <h2>{testUser.name}</h2>
            <div> @{testUser.userName}</div>
            <h4>
              {testUser.numOfLists} Lists | {testUser.numOfFollowers} Followers
              | {testUser.numOfFollowings} Following
            </h4>
          </div>

          <div {...stylex.props(styles.userAboutMeContainer)}>
            <h2 {...stylex.props(styles.h2)}> About Me</h2>
            <div>
              <h4>Birthday</h4>
              {testUser.birthday}
            </div>
            <div>
              <h4>Bio </h4>
              {testUser.bio}
            </div>
            <div>
              <h4>Socials </h4>
              {testUser.facebook}
            </div>
          </div>
          <div {...stylex.props(styles.buttonsContainer)}>
            <Button
              text="Share"
              onClickFn={() => {
                console.log("todo: Share this profile")
              }}
            />
            <Button
              text="Edit"
              onClickFn={() => {
                console.log("todo: 'edit the profile")
              }}
            />
          </div>
        </div>

        <div {...stylex.props(styles.wishlistsDiv)}>
          <h2> {testUser.name}'s Wishlists</h2>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // alignContent: "center",
    // justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    // marginTop: "1rem",
  },
  header: {
    backgroundColor: tokens.tealGreen,
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    paddingTop: "5rem",
    marginBottom: "5rem",
    borderRadius: ".5rem",
    width: "90%",
  },
  roundDiv: {
    borderRadius: "50%",
    height: "9rem",
    width: "9rem",
    backgroundColor: tokens.grayTeal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    fontWeight: "600",
    color: tokens.offWhite,
  },
  buttonsContainer: {
    display: "flex",
    gap: "1rem",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    backgroundColor: tokens.offWhiteGreen,
    marginBottom: "1rem",
  },
  userAboutMeContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyItems: "center",
    // alignItems: "center",
    backgroundColor: tokens.offWhite,
    marginBottom: "1rem",
  },
  h2: {
    display: "flex",
    justifyContent: "center",
  },
  h4: { margin: "0" },
  wishlistsDiv: {
    backgroundColor: tokens.offWhiteGreen,
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
  },
  wishlistsContainer: {
    backgroundColor: tokens.offWhite,
    // marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
  },
})
