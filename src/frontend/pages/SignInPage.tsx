import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { Button } from "../assets/Button"
import { UserAccountForm } from "../components/forms/UserAccountForm"
import { tokens } from "../tokens.stylex"
import { trpc } from "../trpc"
// import { setUsere } from "../userStore"
import { useUserContext } from "../userContext/UserContext"
export const SignInPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [psw, setPsw] = useState("")
  const [pswErr, setPswErr] = useState("")
  const [userAccCreation, setUserAccCreation] = useState(false)
  const { setUser } = useUserContext()
  const { mutateAsync: login } = trpc.loginUser.useMutation()

  const signIn = async () => {
    const emailParser = z.string().email()
    const isValidEmail = emailParser.safeParse(email).success

    if (email.length == 0) {
      setEmailErr("Email is required. Please enter your email. ")
    }

    if (email.length > 0) {
      if (!isValidEmail) {
        setEmailErr("Please type in a valid email address.")
      }
    }

    // if (isValidEmail && psw.length > 5 && psw.length <= 20) {
    if (isValidEmail) {
      const loginResult = await login({ email, password: psw })
      if (loginResult.success) {
        //save the user name, email and password in local storage
        setUser(loginResult.user)
        navigate("/profile")
      }

      if (!loginResult.success) {
        setPswErr(loginResult.reason)
        return
      }
    }
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
      {!userAccCreation && (
        <div {...stylex.props(styles.loginContainer)}>
          <div {...stylex.props(styles.loginSec)}>
            <div {...stylex.props(styles.welcome)}>
              <h2>Welcome!</h2>
              <div>Sign In</div>
            </div>
            <div>
              <div {...stylex.props(styles.inputsContainer)}>
                <label aria-label="email">Email</label>
                <input
                  {...stylex.props(styles.input)}
                  type="text"
                  id="email"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (emailErr.length > 0) {
                      setEmailErr("")
                    }
                    setEmail(event.target.value)
                  }}
                />
                <div {...stylex.props(styles.err)}> {emailErr}</div>
              </div>
              <div>
                <label aria-label="password">Password</label>
                <input
                  {...stylex.props(styles.input)}
                  type="password"
                  id="password"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (pswErr.length > 0) {
                      setPswErr("")
                    }
                    setPsw(event.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      signIn()
                    }
                  }}
                />
                <div {...stylex.props(styles.err)}> {pswErr}</div>
              </div>
              <div {...stylex.props(styles.forgotPsw)}> Forgot Password?</div>
              <Button text="Sign In" onClickFn={signIn} />
            </div>
            <div {...stylex.props(styles.signUpDiv)}>
              <div>Need an account?</div>
              <div
                {...stylex.props(styles.signup)}
                onClick={() => {
                  setUserAccCreation(true)
                }}
              >
                SIGN UP
              </div>
            </div>
          </div>
        </div>
      )}

      {userAccCreation && (
        <div {...stylex.props(styles.loginContainer)}>
          <UserAccountForm
            onSignIn={() => {
              setUserAccCreation(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.tealGreen,
    width: "100%",
    // height: "100%",
    minHeight: "100vh",
  },
  logo: {
    fontWeight: "800",
    fontSize: "2rem",
    paddingLeft: "1rem",
    cursor: "pointer",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "2rem",
    background: tokens.offWhite,
  },
  loginContainer: {
    // width: "100%",
    // backgroundColor: "pink",
    display: "flex",
    // alignContent: "center",
    justifyContent: "center",
  },

  loginSec: {
    border: `2px solid ${tokens.darkBlue}`,
    backgroundColor: tokens.offWhiteGreen,
    width: "21.2rem",
    alignSelf: "center",
    justifySelf: "center",
    padding: "3rem",
    borderRadius: "2rem",
  },
  welcome: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  welcomeText: { margin: 0 },

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
    // backgroundColor: "orange",
  },
  forgotPsw: {
    color: tokens.grayTeal,
    fontWeight: "600",
    fontSize: ".8rem",
    marginTop: ".5rem",
    marginBottom: "1.5rem",
    cursor: "pointer",
  },
  err: {
    color: "red",
    fontSize: ".8rem",
    fontWeight: "200",
  },

  signup: {
    color: {
      default: tokens.tealGreen,
      ":hover": tokens.darkBlue,
    },
    cursor: "pointer",
  },
  signUpDiv: {
    gap: ".2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    marginTop: ".5rem",
  },
  userAccFormContainer: {
    // width: "100%",
    // height: "100%",
    // position: "absolute",
    // position: "relative",
    // left: 0,
    // top: 0,
    // zIndex: 15,
    display: "flex",
    justifyContent: "center",
  },
})
