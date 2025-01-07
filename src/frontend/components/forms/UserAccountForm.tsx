import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import { Button } from "../../assets/Button"
import { tokens } from "../../tokens.stylex"

type UserAccountFormType = {
  closeUserAccontForm: () => void
}
export const UserAccountForm = ({
  closeUserAccontForm,
}: UserAccountFormType) => {
  const [error, setError] = useState(false)
  const [userAccInfo, setUserAccInfo] = useState({
    id: uuidV4(),
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const createUserAccount = () => {
    console.log("to do: create user account")
    console.log("User Info: ", userAccInfo)
  }

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.id === "title") {
      setError(false)
    }

    setUserAccInfo((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerSec)}>
        <h3> Create Account</h3>
        <div {...stylex.props(styles.headerSubTextSec)}>
          Already have an account?
          <div
            {...stylex.props(styles.login)}
            onClick={() => {
              navigate("/profile")
            }}
          >
            Log in here!
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.signUpSec)}>
        <div {...stylex.props(styles.inputsContainer)}>
          <label aria-label="name">Name</label>
          <input
            {...stylex.props(styles.input)}
            type="text"
            id="name"
            onChange={inputChangeHandler}
          />
        </div>
        <div {...stylex.props(styles.inputsContainer)}>
          <label aria-label="email">Email</label>
          <input
            {...stylex.props(styles.input)}
            type="email"
            id="email"
            onChange={inputChangeHandler}
          />
        </div>
        <div {...stylex.props(styles.inputsContainer)}>
          <label aria-label="password">Password</label>
          <input
            {...stylex.props(styles.input)}
            type="password"
            id="password"
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <Button onClickFn={createUserAccount} text="Register" />{" "}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhiteGreen,
    // margin: "1rem",
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
      "@media (min-width: 1025px)": "50rem",
      "@media (max-width: 1024px)": "100%",
    },

    height: {
      // default: "100%",
      // "@media (min-width: 1025px) and @media (min-height: 768px) ": "38rem",
      // "@media (max-width: 1024px)": "100%",
      "@media (max-width: 1024px)": "auto",
    },
  },
  headerSec: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerSubTextSec: {
    display: "flex",
    gap: ".5rem",
  },
  login: {
    color: {
      default: tokens.tealGreen,
      ":hover": tokens.darkBlue,
    },
    cursor: "pointer",
  },
  signUpSec: { margin: "2rem" },

  input: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: "18rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    backgroundColor: tokens.offWhite,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "6rem",
  },
})
