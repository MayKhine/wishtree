import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { tokens } from "../tokens.stylex"
import { useUserContext } from "../userContext/UserContext"
import { Button } from "./Button"
import { ClearPopUp } from "./ClearPopUp"
import { DropDrownProfileMenu } from "./DropDownProfileMenu"
import { SearchButton } from "./SearchButton"
export const MenuBar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUserContext()
  // const { isSuccess, mutate: getUsers } = trpc.getUsers.useMutation()
  // const testUser = {
  //   name: "Blah blah",
  //   userName: "Mbler",
  //   birthday: "12/12/1995",
  //   bio: "test bio for test user",
  //   facebook: "facebook.com/test",
  //   numOfLists: "2",
  //   numOfFollowers: "0",
  //   numOfFollowings: "0",
  // }

  const [toggleDropDownMenu, setToggleDropDownMenu] = useState<boolean>(false)
  const [searchText, setSearchText] = useState("")
  // const [search, setSearch] = useState(false)

  // const { data } = trpc.getUsers.useQuery(
  //   { input: searchText },
  //   { enabled: search },
  // )
  // console.log("Searched user data: ", data)

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
        {!user && (
          <div>
            <Button
              text="Sign In"
              onClickFn={() => {
                navigate("/signin")
              }}
            />
          </div>
        )}
        {user && (
          <>
            <div {...stylex.props(styles.searchBarContainer)}>
              <input
                {...stylex.props(styles.searchInput)}
                type="text"
                placeholder="show after sign in.."
                name="search"
                onKeyDown={(event: React.KeyboardEvent<Element>) => {
                  if (event.key === "Enter") {
                    // setSearch(true)
                    navigate(`/search/${searchText}`)
                  }
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
              <SearchButton
                search={() => {
                  // setSearch(true)
                  navigate(`/search/${searchText}`)
                }}
              />
            </div>
            <div
              {...stylex.props(styles.roundDiv)}
              onClick={() => {
                navigate("/profile")
              }}
            >
              {user.name[0]}
            </div>
            <div>
              <div
                {...stylex.props(styles.down)}
                onClick={() => {
                  console.log("todo : push down a drop down")
                  setToggleDropDownMenu(!toggleDropDownMenu)
                }}
              >
                <FaChevronDown strokeWidth={"2rem"} color={tokens.darkBlue} />
              </div>
              {toggleDropDownMenu && (
                <div>
                  <div {...stylex.props(styles.triangle)}></div>
                  <div {...stylex.props(styles.dropDownMenuDiv)}>
                    <ClearPopUp
                      onCancelFn={() => {
                        setToggleDropDownMenu(false)
                        console.log("clciked on  clear pop up")
                      }}
                    />

                    <DropDrownProfileMenu
                      onLogOutFn={() => {
                        console.log("Todo : log out from the account")
                        setUser(null)
                        navigate("/")
                      }}
                      // onShareFn={shareItemHandler}
                      // onEditFn={editItemHandler}
                      // onReceivedFn={receivedItemHandler}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    // backgroundColor: tokens.offWhite,
    backgroundColor: "rgba(255, 255, 250, 0.7)",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "sticky",
    top: "0",
    zIndex: "14",
  },
  logo: {
    fontWeight: "800",
    fontSize: "2rem",
    paddingLeft: "1rem",
    cursor: "pointer",
    // color: tokens.darkBlue,
  },
  menuButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    // gap: "1rem",
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
    color: {
      default: tokens.offWhite,
      ":hover": tokens.tealGreen,
    },
    cursor: "pointer",
    marginLeft: "1rem",
    marginRight: ".5rem",
    alignSelf: "center",
  },
  down: {
    display: "flex",
    height: "100%",
    cursor: "pointer",
    alignItems: "center",
  },
  triangle: {
    width: "0",
    height: "0",
    borderLeft: ".3rem solid transparent",
    borderRight: ".3rem solid transparent",
    borderBottom: `.5rem solid ${tokens.offWhite}`,
    marginLeft: ".3rem",
    marginTop: ".0rem",
  },
  dropDownMenuDiv: {
    position: "absolute",
    backgroundColor: tokens.offWhite,
    borderRadius: ".5rem",
    boxShadow: "1rem 1rem 2rem rgba(0, 0, 0, 0.2)",
    padding: "8px",
    zIndex: 11,
    width: "10rem",
    marginLeft: "-9.5rem",
  },

  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "pink",
    marginLeft: "1rem",
    border: "2px solid #82A3A1",
    borderRadius: ".3rem",
    boxSizing: "border-box",
    width: {
      default: "15rem",
      "@media (max-width: 767px)": "10rem",
    },
    backgroundColor: tokens.offWhite,
    justifyContent: "space-between",
  },
  searchInput: {
    fontSize: "1rem",
    paddingLeft: "1rem",
    borderRadius: ".3rem",
    border: "0px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    backgroundColor: tokens.offWhite,
    outline: "none",
    width: "100%",
  },
})
