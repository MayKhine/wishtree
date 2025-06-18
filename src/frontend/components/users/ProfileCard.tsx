import * as stylex from "@stylexjs/stylex"
import { tokens } from "../../tokens.stylex"

type ProfileCardProps = {
  data: { name: string; id: string }
}
export const ProfileCard = ({ data }: ProfileCardProps) => {
  return (
    <div
      {...stylex.props(styles.base)}
      onClick={() => {
        console.log(
          "Profile card on click - todo: go to each user profile page ",
        )
      }}
    >
      <div {...stylex.props(styles.roundDiv)}>{data.name[0]}</div>
      <div {...stylex.props(styles.userInfo)}>
        <div>{data.name}</div>
        <div>{data.id}</div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: tokens.tealGreen,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    gap: "1rem",
    width: {
      default: "9rem",
      "@media (max-width: 1024px)": "7rem",
    },
    borderRadius: "1rem",
    cursor: "pointer",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
  },
  roundDiv: {
    borderRadius: "50%",
    width: {
      default: "7rem",
      "@media (max-width: 1024px)": "5rem",
    },
    height: {
      default: "7rem",
      "@media (max-width: 1024px)": "5rem",
    },
    backgroundColor: tokens.grayTeal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: {
      default: "3rem",
      "@media (max-width: 1024px)": "2.5rem",
    },
    fontWeight: "600",
    color: tokens.offWhite,
  },
})
