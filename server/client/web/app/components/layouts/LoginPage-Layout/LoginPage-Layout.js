import LoginButton from '../../modules/LoginButton/LoginButton'
import Footer from '../../modules/Footer/Footer'
import styles from './LoginPage-Layout.module.scss'

const LoginPageLayout = () => {
  return (
    <section className={styles.loginPageLayoutWrapper}>
    
        <main>{/* Top Wrapper no Footer */}

          
          <nav>{/*  Navbar */}

          </nav>

          <article>{/* Middle Body Wrapper */}
            <div>
              <div>
                <h1>LOGO HERE</h1>
                <div>{/* Login Body Components Container */}
                  <div>{/* Login Body Components Group */}
                    <div>Easily Sign in with your stonybrook.edu email</div>
                    <LoginButton />
                    <div>{/* Divider wrapper (--- or ----- )*/}
                      <div>------------</div>
                      <div>or</div>
                      <div>------------</div>
                    </div>
                    <div> Get the app.</div>
                    <div>
                      <div>
                        <div>
                          <a>
                            <img src="/images/appstore/apple-ios-badge(B).svg" width={136} height={40} />
                          </a>
                        </div>
                        <div>
                          <a>
                            <img src="/images/appstore/google-play-badge.png" height={58} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <div>SUB FOOTER</div>

        </main>
        
        <footer>{/* Bottom Wrapper for Footer */}
          <Footer />
        </footer>

    </section>
  )
}

export default LoginPageLayout