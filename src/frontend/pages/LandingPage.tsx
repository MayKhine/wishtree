import stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { tokens } from "../tokens.stylex"
export const LandingPage = () => {
  const createUserAcc = () => {
    console.log("Create user acc")
  }
  return (
    <div {...stylex.props(styles.page)}>
      <MenuBar />
      {/* <div {...stylex.props(styles.base)}> */}
      <div {...stylex.props(styles.bg1)}>
        <div {...stylex.props(styles.base)}>
          <div {...stylex.props(styles.heroSec)}>
            <div {...stylex.props(styles.heroTextSec)}>
              <div {...stylex.props(styles.textSec)}>
                <div> START YOUR WISH LIST</div>
                <h2> Give the Gifts They Love, Get the Gifts You Love! </h2>
                <div {...stylex.props(styles.italicText)}>
                  Whether it's birthdays, holidays, or just for fun - create,
                  share, and fulfill wish lists effortlessly—so every occasion
                  feels just right.
                </div>
                <div {...stylex.props(styles.buttonDiv)}>
                  <Button
                    text="CREATE YOUR ACCOUNT"
                    onClickFn={createUserAcc}
                  />
                </div>
              </div>
            </div>
            <div {...stylex.props(styles.treeImgDiv)}>
              <img
                {...stylex.props(styles.treeImg)}
                src="src/frontend/assets/images/wishtree.jpg"
              />
            </div>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.bg2)}>
        <div {...stylex.props(styles.keyFeaturesSec)}>
          <h2> WishTree Key Features</h2>
          <div>Easy wish list creation</div>
          <div>Share with your friends and family </div>
          <div>Reserve the wish item to avoid gifting the same gift</div>
        </div>
      </div>
      <div {...stylex.props(styles.bg3)}>
        <div {...stylex.props(styles.howSec)}>
          <h2> How WishTree works</h2>
          <div {...stylex.props(styles.stepContainer)}>
            <div {...stylex.props(styles.stepDiv)}>
              <div>1</div>
              <div>Create an account or log in </div>
            </div>
            <div {...stylex.props(styles.stepDiv)}>
              <div>2</div>
              <div>Create your first wish list </div>
            </div>
            <div {...stylex.props(styles.stepDiv)}>
              <div>3</div>
              <div> Share your wish list with your loved ones </div>
            </div>
            <div {...stylex.props(styles.stepDiv)}>
              <div>4</div>
              <div> Enjoy receiving the gifts you've always wanted! </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

const styles = stylex.create({
  page: {
    // margin: "0",
  },
  bg1: {
    backgroundColor: tokens.offWhiteGreen,
  },
  bg2: {
    backgroundColor: tokens.offWhite,
  },
  bg3: {
    backgroundColor: tokens.tealGreen,
  },
  base: {
    // backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    // margin: {
    //   default: "3rem",
    //   "@media (max-width: 767px)": "1rem",
    // },
    // justifyItems: {
    //   default: "none",
    //   "@media (max-width: 767px)": "center",
    // },
    maxWidth: "90rem",
    alignSelf: "center",
    alignContent: "center",
    justifySelf: "center",
    // width: "100%",
  },
  heroSec: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "orange",
  },
  heroTextSec: {
    alignSelf: "center",
    minWidth: "25rem",
    width: { default: "50%", "@media (max-width: 1024px)": "100%" },
    //   "@media (max-width: 767px)": "center",
    // },
    // justifyItems: {
    //   default: "none",
    //   "@media (max-width: 767px)": "center",
    // },
    // backgroundColor: "lightyellow",
  },
  textSec: {
    padding: { default: "3rem ", "@media (max-width: 767px)": "2rem" },
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "1.2rem",
  },
  buttonDiv: {
    width: "25rem",
    marginTop: "2rem",
  },
  treeImg: {
    maxWidth: "35rem",
    width: "100%",
    borderRadius: "50%",
  },
  treeImgDiv: {
    width: { default: "50%", "@media (max-width: 1024px)": "100%" },
    justifyContent: "center",
    // backgroundColor: "pink",
    display: "flex",
    alignSelf: "center",
  },
  keyFeaturesSec: {
    // background: "lightgreen",
    padding: { default: "3rem ", "@media (max-width: 767px)": "2rem" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
  },
  howSec: {
    // background: "lightgray",
    padding: { default: "3rem ", "@media (max-width: 767px)": "2rem" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    flexWrap: "wrap",
    backgroundColor: "yellow",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDiv: {
    display: "flex",
    flexDirection: "column",
    // minWidth: "20rem",
    // maxWidth: "20rem",
    width: { default: "15rem", "@media (max-width: 767px)": "100%" },
    backgroundColor: "pink",
    alignContent: "center",
    alignItems: "center",
    // padding: ".5rem",
    // justifyContent: "center",
  },
})
