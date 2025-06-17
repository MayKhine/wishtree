import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { Button } from "../../assets/Button"
import { stdStyles, tokens } from "../../tokens.stylex"
import { trpc } from "../../trpc"
import { useUserContext } from "../../userContext/UserContext"

type UserBioFormProps = {
  closeUserBioFrom: () => void
}

type UserBioType = {
  id: string
  name: string
  email: string
  birthday?: string
  about?: string
  facebook?: string
}

export const UserBioForm = ({ closeUserBioFrom }: UserBioFormProps) => {
  const { user } = useUserContext()
  const { data } = trpc.getLoginUserBio.useQuery(
    {
      loginUserId: user?.id ?? "testUserID",
    },
    { enabled: Boolean(user?.id) },
  )

  const [userBioData, setUserBioData] = useState<UserBioType>(
    data ?? {
      id: "",
      name: "",
      email: "",
      birthday: "",
      about: "",
      facebook: "",
    },
  )

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserBioData((prevState: UserBioType) => {
      return { ...prevState, [event.target.id]: event.target.value }
    })
  }

  const { mutate: upsertLoginUserBio } = trpc.upsertLoginUserBio.useMutation({
    onSuccess: () => {
      // utils.getUserBioData.invalidate()
    },
  })

  const editUserBio = () => {
    console.log("edit user biro ", userBioData)

    upsertLoginUserBio({
      loginUserId: userBioData.id,
    })
    closeUserBioFrom()
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
              value={userBioData?.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="birthday">Birthday</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="date"
              id="birthday"
              value={userBioData?.birthday}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="about">About Me</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="about"
              value={userBioData?.about}
              onChange={inputChangeHandler}
            />
          </div>
          <div {...stylex.props(stdStyles.inputsContainer)}>
            <label aria-label="facebook">Facebook</label>
            <input
              {...stylex.props(stdStyles.input)}
              type="text"
              id="facebook"
              value={userBioData?.facebook}
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
})
