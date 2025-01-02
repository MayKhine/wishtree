import * as stylex from "@stylexjs/stylex"
type ClearPopUpProps = {
  children?: React.ReactNode
  onCancelFn: () => void
}
export const ClearPopUp = ({ children, onCancelFn }: ClearPopUpProps) => {
  return (
    <div {...stylex.props(styles.base)} onClick={onCancelFn}>
      {children}
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "rgba(130, 163, 161, 0)",
    left: 0,
    top: 0,
    position: "fixed",
    zIndex: 10,
    width: "100%",
    height: "100%",
    pointerEvents: "auto",
  },
})
