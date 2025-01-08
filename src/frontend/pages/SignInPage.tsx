import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../assets/Button"
import { tokens } from "../tokens.stylex"
export const SignInPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [psw, setPsw] = useState("")
  const [pswErr, setPswErr] = useState("")

  const signIn = () => {
    if (email.length == 0) {
      setEmailErr("Email err")
    }
    if (psw.length == 0) {
      setPswErr("Psw err")
    }
    console.log("Todo: Call be sign in func", email, psw)
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
                setEmail(event.target.value)
              }}
            />
            {/* <div {...stylex.props(styles.err)}> {nameErr}</div> */}
          </div>
          <div>
            <label aria-label="password">Password</label>
            <input
              {...stylex.props(styles.input)}
              type="password"
              id="password"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPsw(event.target.value)
              }}
            />
            {/* <div {...stylex.props(styles.err)}> {nameErr}</div> */}
          </div>
          <div {...stylex.props(styles.forgotPsw)}> Forgot Password?</div>
          <Button text="Sing In" onClickFn={signIn} />
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.tealGreen,

    height: "100vh",
    // height: "auto",
  },
  logo: {
    fontWeight: "800",
    fontSize: "2rem",
    paddingLeft: "1rem",
    cursor: "pointer",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "4rem",
    background: tokens.offWhite,
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
})
