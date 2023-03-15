import AddFlower from './AddFlower'
import styles from './OneFlower.module.css'
import CartContext from '../../store/CartContext'

import { useContext } from 'react'

const OneFlower = ({ name, description, price, image, id, setShowDetails }) => {

    const context = useContext(CartContext)

    const addItemToCartHandler = (amount) => {
        context.addItem({
            name: name,
            price: price,
            id: id,
            amount: parseInt(amount)
        })
    }

    return <div className={styles['one-flower']}>
        <img src={image} alt="" />
        <h3 onClick={() => setShowDetails(true)}>{name}</h3>
        <p>{description}</p>
        <p>${price.toFixed(2)}</p>
        <AddFlower addItemToCartHandler={addItemToCartHandler} />
    </div>
}


export default OneFlower
