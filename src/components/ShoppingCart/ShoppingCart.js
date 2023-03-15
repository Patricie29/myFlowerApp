import styles from './ShoppingCart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/CartContext'

import { useContext } from 'react'


const ShoppingCart = ({setShowCart, setShowCheckOut}) => {

    const context = useContext(CartContext)

    const hasItems = context.items.length > 0

    const addItemHandler = (oneItem) => {
        context.addItem({
            ...oneItem, 
            amount: 1
        })
    }

    const removeItemHandler = (oneItem) => {
        context.removeItem({
            ...oneItem, 
            amount: - 1
        })
    }

    const checkoutHandler = () => {
        setShowCart(false)
        setShowCheckOut(true)
    }

    return <Modal onClick={() => setShowCart(false)}>
        <ul className={styles['cart-items']}>
        { !hasItems && <h3 className={styles.cartEmpty}>Your cart is empty!</h3>}
            {
                context.items.map((oneItem) => {
                    const { id, name, amount, price } = oneItem
                    return <li className={styles['cart-item']} key={id}>
                        <div>
                            <h2>{name}</h2>
                            <div className={styles.summary}>
                                <span className={styles.price}>${price}</span>
                                <span className={styles.amount}>x{amount}</span>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => addItemHandler(oneItem)}>+</button>
                            <button onClick={() => removeItemHandler(oneItem)}>-</button>
                        </div>
                    </li>
                })
            }
        </ul>
        <div className={styles.total}>
            <span>Total Price</span>
            <span>${context.totalAmount.toFixed(2)}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={() => setShowCart(false)}>Close</button>
            { hasItems && <button className={styles.button} onClick={checkoutHandler}>Confirm</button>}
        </div> 
    </Modal>
}


export default ShoppingCart
