import CartIcon from "./CartIcon"
import styles from './NavbarCartButton.module.css'
import CartContext from "../../store/CartContext"

import { useContext, useEffect, useState } from 'react'


const NavbarCartButton = ({setShowCart}) => {

    const [ btnIsHighlighted, setBtnIsHighlighted ] = useState(false)


    const context = useContext(CartContext)

    // adding animation for button, every time we add something into the cart
    useEffect(() => {
    if (context.totalAmount > 0){
        setBtnIsHighlighted(true)
    }

    //we cannot forget to set timeout
    const timer = setTimeout(() => {
        setBtnIsHighlighted(false)
    }, 300)

    // and as usual when using timeout we add clear timeout to clear any remaining time for the animation (so it doesnt stack up)
    return () => {
        clearTimeout(timer)
    }
}, [context.totalAmount])

    return <>
        <button  className={ `${ styles.button } ${ btnIsHighlighted ? styles.bump : '' }` }  onClick={() => setShowCart(true)}>
        <span className={styles.icon}> <CartIcon/> </span>
        <span>Your Cart</span>
        <span className={styles.badge}> ${context.totalAmount.toFixed(2)} </span>
    </button>
    </>
}


export default NavbarCartButton
