import stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FaGifts, FaShare } from "react-icons/fa"
import { ImHappy2 } from "react-icons/im"
import { Button } from "../assets/Button"
import { MenuBar } from "../assets/MenuBar"
import { PopUp } from "../assets/PopUp"
import { UserAccountForm } from "../components/forms/UserAccountForm"
import { tokens } from "../tokens.stylex"

export const LandingPage = () => {
  const createUserAcc = () => {
    console.log("Create user acc")
    setUserAccCreation(true)
  }

  const [userAccCreation, setUserAccCreation] = useState(false)

  return (
    <div>
      <MenuBar />

      <div {...stylex.props(styles.bg1)}>
        <div {...stylex.props(styles.base)}>
          <div {...stylex.props(styles.heroSec)}>
            <div {...stylex.props(styles.heroTextSec)}>
              <div {...stylex.props(styles.textSec)}>
                <div> START YOUR WISH LIST</div>
                <h1> Give the Gifts They Love, </h1>
                <h1> Get the Gifts You Love!</h1>
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
                  {userAccCreation && (
                    <div {...stylex.props(styles.userAccFormContainer)}>
                      <PopUp
                        onCancleFn={() => {
                          setUserAccCreation(false)
                        }}
                      ></PopUp>
                      <UserAccountForm />
                    </div>
                  )}
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
          <div {...stylex.props(styles.featureHeader)}>
            WishTree Key Features
          </div>
          <div {...stylex.props(styles.featureText)}>
            Easy wish list creation
          </div>
          <div {...stylex.props(styles.featureText)}>
            Share with your friends and family
          </div>
          <div {...stylex.props(styles.featureText)}>
            Reserve the wish item to avoid gifting the same gift
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.bg3)}>
        <div {...stylex.props(styles.howSec)}>
          <div {...stylex.props(styles.featureHeader)}>How WishTree works </div>
          <div {...stylex.props(styles.stepContainer)}>
            <div {...stylex.props(styles.stepDiv)}>
              <div>
                <FaGifts size={"3rem"} />
              </div>
              <div {...stylex.props(styles.howTextBig)}>1. Create </div>
              <div {...stylex.props(styles.stepDetailText)}>
                Create your account and first wish list{" "}
              </div>
            </div>
            <div {...stylex.props(styles.stepDiv)}>
              <div>
                <FaShare size={"3rem"} />
              </div>
              <div {...stylex.props(styles.howTextBig)}>2. Share</div>
              <div {...stylex.props(styles.stepDetailText)}>
                Share your wish list with your loved ones{" "}
              </div>
            </div>
            <div {...stylex.props(styles.stepDiv)}>
              <div>
                <ImHappy2 size={"3rem"} />
              </div>
              <div {...stylex.props(styles.howTextBig)}>3. Enjoy</div>
              <div {...stylex.props(styles.stepDetailText)}>
                Enjoy receiving the gifts you've always wanted!
              </div>
            </div>
          </div>
          <div {...stylex.props(styles.buttonDiv)}>
            <Button
              text="Let's get STARTED!"
              onClickFn={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
                createUserAcc()
              }}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

const styles = stylex.create({
  userAccFormContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    // position: "relative",
    left: 0,
    top: 0,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
  },
  bg1: {
    backgroundColor: tokens.offWhiteGreen,
  },
  bg2: {
    // backgroundColor: tokens.tealGreen,
  },
  bg3: {
    backgroundColor: tokens.tealGreen,
  },
  base: {
    // backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    paddingTop: {
      default: "3rem",
      "@media (max-width: 767px)": "1rem",
    },
    paddingBottom: {
      default: "3rem",
      "@media (max-width: 767px)": "1rem",
    },
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
    // maxWith: "20rem",
    // width: "25rem",
    width: "100%",
    maxWidth: "25rem",
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
    padding: { default: "3rem ", "@media (max-width: 767px)": "2rem" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  featureHeader: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  featureText: {
    color: tokens.grayTeal,
    fontWeight: "400",
    fontSize: "1.5rem",
    margin: ".2rem",
    textAlign: "center",
  },
  howSec: {
    padding: { default: "3rem ", "@media (max-width: 767px)": "2rem" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // height: "auto",
  },
  howTextBig: { fontWeight: "400", fontSize: "1.5rem" },
  stepContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    // backgroundColor: "yellow",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDiv: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    width: { default: "18rem", "@media (max-width: 767px)": "100%" },
    alignContent: "center",
    alignItems: "center",
    height: "auto",
  },
  stepDetailText: {
    textAlign: "center",
    fontWeight: "600",
  },
})
