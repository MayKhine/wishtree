import * as stylex from "@stylexjs/stylex"
import { DateTime } from "luxon"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { CreateWishListButton } from "../components/formButtons/CreateWishListButton"
import { UserForm } from "../components/forms/UserForm"
import { WishListForm } from "../components/forms/WishListForm"
import { WishList } from "../components/wishList/WishList"
import { noSpaceLowerCase } from "../helperFunctions/stringFunctions"
import { tokens } from "../tokens.stylex"
import { trpc } from "../trpc"
import { useUserContext } from "../userContext/UserContext"
export const ProfilePage = () => {
  // const { user: profilename } = useParams<{ user: string }>()

  const { data } = trpc.getMyWishLists.useQuery()
  const { user } = useUserContext()

  // if (noSpaceLowerCase(profilename) == noSpaceLowerCase(user?.name)) {
  //   console.log("user names are same")
  // }

  const userBirthday =
    user?.birthday && typeof user.birthday === "string"
      ? DateTime.fromISO(user.birthday).toFormat("MMMM d, yyyy")
      : "-"

  const [openWishListForm, setOpenWishListForm] = useState(false)
  const closeWishListForm = () => {
    setOpenWishListForm(false)
  }

  const [openUserBioForm, setOpenUserBioForm] = useState(false)

  return (
    <div>
      <MenuBar />
      {user && (
        <div {...stylex.props(styles.base)}>
          <div {...stylex.props(styles.header)}>
            <div {...stylex.props(styles.roundDiv)}>{user.name[0]}</div>
          </div>
          <div>
            <div {...stylex.props(styles.userInfoContainer)}>
              <h2>{user.name}</h2>
              <div> @{user.id}</div>
              {/* <h4>
                {testUser.numOfLists} Lists | {testUser.numOfFollowers}{" "}
                Followers | {testUser.numOfFollowings} Following
              </h4> */}
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
                  setOpenUserBioForm(true)
                }}
              />
              {openUserBioForm && (
                <div
                  {...stylex.props(
                    // styles.displayOver767px,
                    styles.wishListFormContainer,
                  )}
                >
                  <PopUp
                    onCancleFn={() => {
                      setOpenUserBioForm(false)
                    }}
                  ></PopUp>
                  <UserForm
                    closeUserBioFrom={() => {
                      setOpenUserBioForm(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div {...stylex.props(styles.aboutAndWishlistContainer)}>
            <div {...stylex.props(styles.userAboutMeContainer)}>
              <h2 {...stylex.props(styles.h2)}> About The USER</h2>
              {user && (
                <div {...stylex.props(styles.userAboutDataDiv)}>
                  <div>
                    <h4>Birthday</h4>
                    {/* {user?.birthday?.toLocaleString() ?? "-"} */}
                    {userBirthday}
                  </div>
                  <div>
                    <h4>About </h4>
                    {user?.about ?? "-"}
                  </div>
                  <div>
                    <h4>Facebook </h4>
                    {user?.facebook ?? "-"}
                  </div>
                </div>
              )}

              {!user && <div> No user bio data </div>}
            </div>
            <div {...stylex.props(styles.wishlistsDiv)}>
              <h2> {user.name}'s Wishlists</h2>
              {data && (
                <div {...stylex.props(styles.wishlistsContainer)}>
                  <CreateWishListButton
                    onClickFn={() => {
                      // console.log("wish list open ")
                      setOpenWishListForm(true)
                    }}
                  />

                  {openWishListForm && (
                    <div
                      {...stylex.props(
                        // styles.displayOver767px,
                        styles.wishListFormContainer,
                      )}
                    >
                      <PopUp
                        onCancleFn={() => {
                          closeWishListForm()
                        }}
                      ></PopUp>
                      <WishListForm closeWishListForm={closeWishListForm} />
                    </div>
                  )}

                  {data.map((list) => {
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
      )}

      {!user && <div> User doens't exist </div>}
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
    gap: ".5rem",
    display: "flex",
    flexDirection: "column",
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
  wishListFormContainer: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
  },
})
