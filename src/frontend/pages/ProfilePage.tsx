import * as stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { WishList } from "../components/wishList/WishList"
import { tokens } from "../tokens.stylex"
import { trpc } from "../trpc"
export const ProfilePage = () => {
  const { data } = trpc.getMyWishLists.useQuery()
  console.log("Profile Page: ", data)

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
            <h2>{testUser.name}</h2>
            <div> @{testUser.userName}</div>
            <h4>
              {testUser.numOfLists} Lists | {testUser.numOfFollowers} Followers
              | {testUser.numOfFollowings} Following
            </h4>
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
        <div {...stylex.props(styles.aboutAndWishlistContainer)}>
          <div {...stylex.props(styles.userAboutMeContainer)}>
            <h2 {...stylex.props(styles.h2)}> About The USER</h2>
            <div {...stylex.props(styles.userAboutDataDiv)}>
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
          </div>
          <div {...stylex.props(styles.wishlistsDiv)}>
            <h2> {testUser.name}'s Wishlists</h2>
            {data && (
              <div {...stylex.props(styles.wishlistsContainer)}>
                {data.map((list) => {
                  // return <div key={list.id}> {list.title}</div>
                  return (
                    <WishList
                      title={list.title}
                      wishlistID={list.id}
                      key={list.id}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: tokens.tealGreen,
    height: {
      default: "5rem",
      "@media (max-width: 1024px)": "3.5rem",
    },
    display: "flex",
    justifyContent: "center",
    paddingTop: "3rem",
    marginBottom: "5rem",
    borderTopLeftRadius: "0rem",
    borderTopRightRadius: "0rem",
    borderBottomRightRadius: "6rem",
    borderBottomLeftRadius: "6rem",
    width: "90%",
  },
  roundDiv: {
    borderRadius: "50%",
    // height: "9rem",
    // width: "9rem",

    width: {
      default: "9rem",
      "@media (max-width: 1024px)": "7rem",
    },
    height: {
      default: "9rem",
      "@media (max-width: 1024px)": "7rem",
    },
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
    marginBottom: "1rem",
  },

  h2: {
    display: "flex",
    justifyContent: "center",
    // marginBottom: "3rem",
  },
  h4: { margin: "0" },

  aboutAndWishlistContainer: {
    display: "flex",
    // backgroundColor: "pink",
    flexDirection: {
      default: "row",
      "@media (max-width: 1024px)": "column", // 787px 1024px
    },
    gap: "2rem",
    // width: "100%",
    // marginTop: "5rem",
    // margin: "3rem",
    padding: "2rem",
  },

  userAboutMeContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.offWhite,
    minWidth: "20rem",
    padding: "2rem",
    borderRadius: ".5rem",
    height: "auto",
  },

  userAboutDataDiv: {
    marginTop: "1rem",
  },

  wishlistsDiv: {
    backgroundColor: tokens.offWhiteGreen,
    display: "flex",
    flexDirection: "column",
    // width: "100%",
    // marginRight: "5rem",
    padding: "2rem",
    // height: "auto",
    borderRadius: ".5rem",
    alignItems: {
      default: "none",
      "@media (max-width: 787px)": "center", // 787px 1024px
    },
    maxWidth: "66rem",
  },
  wishlistsContainer: {
    // backgroundColor: tokens.offWhite,
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    marginTop: "1rem",
    justifyContent: {
      default: "none",
      "@media (max-width: 787px)": "center", // 787px 1024px
    },
  },
})
