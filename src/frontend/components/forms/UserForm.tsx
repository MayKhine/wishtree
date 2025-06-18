import * as stylex from "@stylexjs/stylex"
import { DateTime } from "luxon"
import { useState } from "react"
import { Button } from "../../assets/Button"
import { stdStyles, tokens } from "../../tokens.stylex"
import { trpc } from "../../trpc"
import { useUserContext } from "../../userContext/UserContext"

type UserBioFormProps = {
  closeUserBioFrom: () => void
}

type UserType = {
  id: string
  name: string
  email: string
  birthday?: string
  about?: string
  facebook?: string
  password: string
}

export const UserForm = ({ closeUserBioFrom }: UserBioFormProps) => {
  const { user, setUser } = useUserContext()

  // const today = new Date()
  // console.log(
  //   "today date",
  //   today.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   }),
  // )
  // console.log("USER: ", user)

  // date format yyyy - mm - dd
  const updatedUser = {
    id: user?.id ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
    // birthday: user?.birthday?.toFormat("yyyy-MM-dd"),
    birthday:
      typeof user?.birthday === "string"
        ? DateTime.fromISO(user.birthday).toFormat("yyyy-MM-dd")
        : undefined,
    about: user?.about,
    facebook: user?.facebook,
    password: "",
  }

  const [userData, setUserData] = useState<UserType>(updatedUser)
  const [error, setError] = useState("")
  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserData((prevState: UserType) => {
      return { ...prevState, [event.target.id]: event.target.value }
    })
  }

  const { mutate: upsertLoginUser } = trpc.upsertLoginUser.useMutation({
    onSuccess: (result) => {
      if (!result.success) {
        setError(result.reason)
      }

      if (result.success) {
        setUser(result.updatedUser)
        closeUserBioFrom()
      }
    },
    onError: () => {
      console.log("Error return")
    },
    onMutate: () => {
      console.log("on Mutate")
    },
  })

  const editUserBio = () => {
    console.log("edit user biro ", userData)

    const loginUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      birthday: userData.birthday,
      about: userData.about,
      facebook: userData.facebook,
    }

    upsertLoginUser(loginUser)
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <h3>Edit User Bio</h3>
      </div>
      <div {...stylex.props(styles.formDiv)}>
        <div {...stylex.props(styles.inputsDiv)}>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="name">Name</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="name"
              value={userData?.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="email">Email</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="email"
              value={userData?.email}
              onChange={inputChangeHandler}
              readOnly
            />
          </div>

          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="password">Password</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="password"
              id="password"
              value={userData?.password}
              onChange={inputChangeHandler}
            />
            {error.length > 0 && (
              <div {...stylex.props(styles.errorText)}> {error}</div>
            )}
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="birthday">Birthday</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="date"
              id="birthday"
              value={userData?.birthday}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="about">About Me</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="about"
              value={userData?.about}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="facebook">Facebook</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="facebook"
              value={userData?.facebook}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div {...stylex.props(styles.buttonsContainer)}>
          <Button onClickFn={closeUserBioFrom} text="Cancel" />
          <Button onClickFn={editUserBio} text="Save" />
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhiteGreen,
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "1rem",
    borderRadius: "1rem",
    zIndex: "10",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    marginTop: {
      default: 0,
      "@media (max-width: 1024px) ": "5rem",
    },
    alignSelf: {
      default: "flex-start",
      "@media (min-width: 1025px) ": "center",
    },
    width: {
      "@media (min-width: 1025px)": "63rem",
      "@media (max-width: 1024px)": "100%",
    },

    height: {
      "@media (max-width: 1024px)": "auto",
    },
  },

  header: {
    marginBottom: "1rem",
  },

  formDiv: {
    display: "flex",
    flexDirection: {
      default: "column",
      "@media (max-width: 1024px)": "column",
    },

    gap: {
      default: "3rem",
      "@media (max-width: 1024px)": "1rem",
    },
  },

  inputsDiv: {
    display: "flex",
    flexDirection: "column",
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },

  errorText: {
    color: "red",
    fontSize: ".8rem",
    fontWeight: "200",
  },
})
