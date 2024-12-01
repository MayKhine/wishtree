import * as stylex from "@stylexjs/stylex"

export const tokens = stylex.defineVars({
  offWhite: "#FFFFFA",
  offWhiteGreen: "#eef4ed",
  darkestBlue: "#0b2545",
  // darkBlue: "#134074",
  blue: "#8da9c4",
  lightGreen: 'C0DFA1',
  green: '9FC490',
  tealGreen: '82A3A1',
  grayTeal: '465362',
  darkBlue: '465362'
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
