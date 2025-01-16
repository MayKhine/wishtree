import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import * as z from "zod"
import { Button } from "../../assets/Button"
import { tokens } from "../../tokens.stylex"

type UserAccountFormType = {
  onSignIn?: () => void
}

export const UserAccountForm = ({ onSignIn }: UserAccountFormType) => {
  const navigate = useNavigate()

  const [userAccInfo, setUserAccInfo] = useState({
    id: uuidV4(),
    name: "",
    email: "",
    password: "",
  })

  const [nameErr, setNameErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [pswErr, setPswErr] = useState("")
  const [accCreateSuccess, setAccCreateSuccess] = useState(false)
  const createUserAccount = () => {
    const emailParser = z.string().email()
    const isValidEmail = emailParser.safeParse(userAccInfo.email).success

    if (
      userAccInfo.name.length > 0 &&
      userAccInfo.email.length > 0 &&
      isValidEmail &&
      userAccInfo.password.length > 5 &&
      userAccInfo.password.length <= 20
    ) {
      console.log("SUccess: create account")
      console.log("TOdo : create account ")
      // clear the form and show success
      setAccCreateSuccess(true)

      // setUserAccInfo((prevState) => ({
      //   ...prevState,
      //   name: "",
      //   email: "",
      //   password: "",
      // }))

      return
    }

    if (userAccInfo.name.length === 0) {
      // setNameErr("Name is required. Please enter your name.")
      setNameErr("Name is required. Please enter your name.")
    }

    //email check
    if (userAccInfo.email.length === 0) {
      setEmailErr("Email is required. Please enter your email. ")
    }
    if (userAccInfo.email.length > 0) {
      if (!isValidEmail) {
        setEmailErr("Please type in a valid email address.")
      }
    }

    //psw length check
    if (userAccInfo.password.length <= 5) {
      setPswErr("Password is too short. It must be at least 5 characters long.")
    }

    if (userAccInfo.password.length > 20) {
      setPswErr("Password is too long. It must not exceed 20 characters.")
    }

    console.log("FAILED")
  }

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.id === "name" && nameErr.length > 0) {
      setNameErr("")
    }

    if (event.target.id === "email" && emailErr.length > 0) {
      setEmailErr("")
    }

    if (event.target.id === "password" && pswErr.length > 0) {
      setPswErr("")
    }

    setUserAccInfo((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }
  return (
    <div {...stylex.props(styles.base)}>
      {!accCreateSuccess && (
        <div {...stylex.props(styles.createAccSec)}>
          <div {...stylex.props(styles.headerSec)}>
            <h3> Create Account</h3>
            <div {...stylex.props(styles.headerSubTextSec)}>
              Already have an account?
              <div
                {...stylex.props(styles.signin)}
                onClick={() => {
                  if (onSignIn) {
                    onSignIn()
                  }
                  navigate("/signin")
                }}
              >
                SIGN IN
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
                required
                onChange={inputChangeHandler}
              />
              <div {...stylex.props(styles.err)}> {nameErr}</div>
            </div>
            <div {...stylex.props(styles.inputsContainer)}>
              <label aria-label="email">Email</label>
              <input
                {...stylex.props(styles.input)}
                type="email"
                id="email"
                required
                onChange={inputChangeHandler}
              />
              <div {...stylex.props(styles.err)}> {emailErr}</div>
            </div>
            <div {...stylex.props(styles.inputsContainer)}>
              <label aria-label="password">Password</label>
              <input
                {...stylex.props(styles.input)}
                type="password"
                id="password"
                required
                onChange={inputChangeHandler}
              />
              <div {...stylex.props(styles.err)}> {pswErr}</div>
            </div>

            <div {...stylex.props(styles.buttonDiv)}>
              <Button onClickFn={createUserAccount} text="Register" />
            </div>
          </div>
        </div>
      )}

      {accCreateSuccess && (
        <div {...stylex.props(styles.success)}>
          <div {...stylex.props(styles.roundDiv)}>
            <IoMdCheckmarkCircleOutline
              color={tokens.darkBlue}
              size={"5rem"}
              strokeWidth={"1rem"}
            />
          </div>
          <h2> SUCCESS</h2>
          <div {...stylex.props(styles.textSec)}>
            {userAccInfo.name.length == 0 && (
              <div {...stylex.props(styles.welcome)}>Welcome to Wish Tree!</div>
            )}
            {userAccInfo.name.length > 0 && (
              <div {...stylex.props(styles.welcome)}>
                Welcome to Wish Tree, {userAccInfo.name}!
              </div>
            )}

            <div>Your account has been successfully created.</div>
            <div>Let's start your wish tree!</div>
            <div {...stylex.props(styles.buttonDiv)}>
              <Button
                text="Continue"
                onClickFn={() => {
                  navigate("/signin")
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.offWhiteGreen,
    border: `2px solid ${tokens.darkBlue}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // fontWeight: "600",
    // fontSize: "1rem",
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
  createAccSec: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  signin: {
    color: {
      default: tokens.tealGreen,
      ":hover": tokens.darkBlue,
    },
    cursor: "pointer",
  },
  signUpSec: {
    margin: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },

  input: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: "19rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    backgroundColor: tokens.offWhite,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "6.5rem",
    // width: "22rem",
    // backgroundColor: "orange",
  },
  err: {
    color: "red",
    fontSize: ".8rem",
    fontWeight: "200",
  },
  buttonDiv: {
    marginTop: "1rem",
    width: "21rem",
  },
  success: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem",
  },
  roundDiv: {
    backgroundColor: "lightgreen",
    width: "8rem",
    height: "8rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  textSec: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    // backgroundColor: "pink",
  },
  welcome: {
    fontSize: "1.2rem",
    fontWeight: "200",
  },
})
