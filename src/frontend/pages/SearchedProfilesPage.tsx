import * as stylex from "@stylexjs/stylex"
import { useParams } from "react-router-dom"
import { MenuBar } from "../assets/MenuBar"
import { tokens } from "../tokens.stylex"
import { trpc } from "../trpc"
export const SearchedProfilesPage = () => {
  const { searchText } = useParams<{ searchText: string }>()
  console.log("search text: ", searchText)
  const { data } = trpc.getUsers.useQuery(
    { input: searchText },
    { enabled: Boolean(searchText) },
  )

  console.log("Searched user data: ", data)

  // const testSearchResult = [
  //   {
  //     name: "May Blah blah",
  //     userName: "Mbler",
  //     birthday: "12/12/1995",
  //     bio: "test bio for test user",
  //     facebook: "facebook.com/test",
  //     numOfLists: "2",
  //     numOfFollowers: "0",
  //     numOfFollowings: "0",
  //   },
  //   {
  //     name: "May Blah blah",
  //     userName: "Mbler",
  //     birthday: "12/12/1995",
  //     bio: "test bio for test user",
  //     facebook: "facebook.com/test",
  //     numOfLists: "2",
  //     numOfFollowers: "0",
  //     numOfFollowings: "0",
  //   },
  // ]

  return (
    <div>
      <MenuBar />
      {data && (
        <div {...stylex.props(styles.base)}>
          {data.map((eachUser, index) => {
            return (
              <div key={index} {...stylex.props(styles.profileContainer)}>
                <div> {eachUser.id} </div>
                <div> {eachUser.name} </div>
              </div>
            )
          })}
        </div>
      )}
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
