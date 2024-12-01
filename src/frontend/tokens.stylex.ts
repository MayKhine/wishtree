import * as stylex from "@stylexjs/stylex"

export const tokens = stylex.defineVars({
  offWhite: "#FFFEFB",
  offWhiteGreen: "#eef4ed",
  darkestBlue: "#0b2545",
  darkBlue: "#134074",
  blue: "#8da9c4",
})

export const stdStyles = stylex.create({
  input: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: "25rem",
    border: "0px solid black",
    fontFamily: '"Funnel Sans", sans-serif',
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
  },
})
