import styles from './AddFlower.module.css'

import { useRef } from 'react'


const AddFlower = ({ addItemToCartHandler }) => {

    // PRO POUZIVANI USEREF
    const valueInput = useRef()


    const onSubmit = (event) => {
        event.preventDefault()

        const value = valueInput.current.value
        console.log(value)
        addItemToCartHandler(value)
    }

    return <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input} type="number" min='1' max='5' step='1' id='amount' defaultValue='1' ref={valueInput} />
        <button>+ Add</button>
    </form>
}


export default AddFlower