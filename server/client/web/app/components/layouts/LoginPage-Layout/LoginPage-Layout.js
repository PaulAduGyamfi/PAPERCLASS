import LoginButton from '../../modules/LoginButton/LoginButton'
import Footer from '../../modules/Footer/Footer'
import styles from './LoginPage-Layout.module.scss'

const LoginPageLayout = () => {
  return (
    <section className={styles.loginPageLayoutContainer}>
    
        <main className={styles.loginPageLayoutTopWrapper}>{/* Top Wrapper no Footer */}

          <article className={styles.loginPageLayoutArticleContainer}>{/* Middle Body Wrapper */}
            <div>{/* ONLY ON DESKTOP */}</div>
            <div className={styles.loginPageLayoutLoginBodyContainer}>
              <div className={styles.loginPageLayoutLoginBodyWrapper}>
                <h1>[ LOGO HERE ]</h1>
                <div className={styles.loginPageLayoutLoginBodyContainer}>{/* Login Body Components Container */}
                  <div className={styles.loginPageLayoutLoginBodyWrapper}>{/* Login Body Components Group */}
                    <div className={styles.loginPageLayoutLoginBodyTextWrapper}>
                      <div>
                        Easily sign in with your stonybrook.edu email
                      </div>
                    </div>
                    <LoginButton />
                    <div className={styles.loginPageLayoutLoginBodyDividerContainer}>
                      <div className={styles.loginPageLayoutLoginBodyDividerLineWrapper}>{/* Divider wrapper (--- or ----- )*/}
                        <div><hr className={styles.loginPageLayoutLoginBodyDividerLine}/></div>
                        <div className={styles.loginPageLayoutLoginBodyDividerText}>or</div>
                        <div><hr className={styles.loginPageLayoutLoginBodyDividerLine}/></div>
                      </div>
                    </div>
                    <div className={styles.loginPageLayoutLoginBodyGetAppText}> Get the app.</div>
                    <div className={styles.loginPageLayoutLoginBodyGetAppContainer}>
                      <div className={styles.loginPageLayoutLoginBodyGetAppWrapper}>
                        <div>
                          <a href="#">
                            <img alt="Available on the App Store" src="/images/appstore/apple-ios-badge(B).svg" width={136} height={40} />
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <img alt="Available on Google Play" src="/images/appstore/google-play-badge.png" height={58} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <div className={styles.loginPageLayoutSubFooterContainer}></div>

        </main>
        
        <footer className={styles.loginPageLayoutFooterContainer}>{/* Bottom Wrapper for Footer */}
          <Footer />
        </footer>

    </section>
  )
}

export default LoginPageLayout