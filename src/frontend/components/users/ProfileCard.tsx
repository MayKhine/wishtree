import * as stylex from "@stylexjs/stylex"

type ProfileCardProps = {
  data: any
}
export const ProfileCard = ({ data }: ProfileCardProps) => {
  return <div {...stylex.props(styles.base)}> USER CARD {data.name}</div>
}

const styles = stylex.create({ base: { backgroundColor: "pink" } })
