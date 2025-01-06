import * as stylex from "@stylexjs/stylex"

export const tokens = stylex.defineVars({
  offWhite: "#FFFFFA",
  offWhiteGreen: "#eef4ed",
  // blue: "#8da9c4",
  // lightGreen: "#C0DFA1",
  // green: "#9FC490",
  tealGreen: "#82A3A1",
  grayTeal: "#465362",
  darkBlue: "#011936",
})

export const stdStyles = stylex.create({
  input: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    width: {
      default: "23rem",
      "@media (max-width: 767px)": "18rem",
    },
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    backgroundColor: tokens.offWhite,
  },
  inputTextArea: {
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: ".3rem",
    // width: "23rem",
    width: {
      default: "23rem",
      "@media (max-width: 767px)": "18rem",
    },
    height: "11rem",
    border: "2px solid #82A3A1",
    fontFamily: '"Funnel Sans", sans-serif',
    resize: "none",
    backgroundColor: tokens.offWhite,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "6.5rem",
  },
})
