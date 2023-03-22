import styles from './NavBar.module.css'
import NavbarCartButton from './NavbarCartButton'
import logo from '../../images/logo.svg'
import Card from '../UI/Card'


const NavBar = ({ setShowCart }) => {
    return <div className={styles['main-page']}>
        <div className={styles['main-image']}>
            <header className={styles.header}>
                <img src={logo} alt="" className={styles.logo} />

                <NavbarCartButton setShowCart={setShowCart} />
            </header>
        </div>
        <Card className={styles.mainCard}>
            <h4>Welcome to Kytka jako Brno!</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit!</p>
        </Card>
    </div>

}


export default NavBar