import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTopSection}>
        <div className={styles.footerTopSectionContainer}>

          <div className={styles.footerTopSectionWrapper}>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>About</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Terms</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Privacy</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Help</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Github</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Discord</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Status</div>
              </a>
            </div>
            <div className={styles.footerTopSectionItemContainer}>
              <a href='#'>
                <div className={styles.footerTopSectionItemText}>Report a Bug</div>
              </a>
            </div>
          </div>

          <div></div>

        </div>
      </div>
      
      <div className={styles.footerBottomSection}>
        <div className={styles.footerBottomSectionContainer}>
          <div className={styles.footerBottomSectionWrapper}>
            <div className={styles.footerBottomSectionText}>© 2021 Website Name, Inc.</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer