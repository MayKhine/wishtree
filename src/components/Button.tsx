import * as stylex from "@stylexjs/stylex"

type ButtonProps = {
  onClickFn: () => void
  type?: "submit" | "reset" | "button"
  text: string
}
export const Button = ({ onClickFn, type, text }: ButtonProps) => {
  return (
    <button
      {...stylex.props(styles.base)}
      type={type ? type : "button"}
      onClick={onClickFn}
    >
      {text}
    </button>
  )
}

const styles = stylex.create({
  base: {
    border: "0px",
    borderRadius: "2rem",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "1rem",
    backgroundColor: "#134074",
    color: { default: "#eef4ed", ":hover": "#8da9c4" },
    cursor: "pointer",
  },
})
