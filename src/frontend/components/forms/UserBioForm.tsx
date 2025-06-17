import * as stylex from "@stylexjs/stylex"
import { tokens } from "src/frontend/tokens.stylex"

type UserBioFormProps = {
  closeUserBioFrom: () => void
}
export const UserBioForm = ({ closeUserBioFrom }: UserBioFormProps) => {
  return (
    <div onClick={closeUserBioFrom} {...stylex.props(styles.base)}>
      User Bio Form
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "pink",
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
  },
})
// const styles = stylex.create({
//   base: {
//     backgroundColor: tokens.offWhiteGreen,
//     border: "2px solid black",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     fontWeight: "600",
//     fontSize: "1rem",
//     borderRadius: "1rem",
//     zIndex: "10",
//     paddingTop: "2rem",
//     paddingBottom: "2rem",
//     marginTop: {
//       default: 0,
//       "@media (max-width: 1024px) ": "5rem",
//     },
//     alignSelf: {
//       default: "flex-start",
//       "@media (min-width: 1025px) ": "center",
//     },
//     width: {
//       "@media (min-width: 1025px)": "63rem",
//       "@media (max-width: 1024px)": "100%",
//     },

//     height: {
//       "@media (max-width: 1024px)": "auto",
//     },
//   },
// })
