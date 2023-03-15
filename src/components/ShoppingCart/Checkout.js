import styles from './Checkout.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/CartContext'

import { useRef, useState, useContext } from 'react'

// to make it easier to validate, here you make a helper function which just checks if isEmpty is empty or isFiveNumbers actually contains 5 numbers. You then call it when you submit the form to validate all the inputs.
const isEmpty = (value) => value.trim() === ''
const isFiveNumbers = value => value.trim().length === 5


const Checkout = ({ setShowCheckOut }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const [formInputsValid, setFormInputsValid] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })
    const context = useContext(CartContext)

    // we will use useRef to store the value that user put in
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const submitForm = (event) => {
        event.preventDefault()

        // you have to save the current.value is some const 
        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostalCode = postalCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value

        // here you use your helpers function which you have on the top. Basically you're saying that enteredNameIsValid if it is NOT empty. You cna also write it the other way around without negating, depends how your function helper looks like
        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalCodeIsValid = isFiveNumbers(enteredPostalCode)
        const enteredCityIsValid = !isEmpty(enteredCity)

        setFormInputsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        // now we can check if the overall form is valid by combining all these 4 values. It will pass only if all 4 are valid
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid
        // form is Valid will return true only if all its values will be true

        //if it is not valid we will show error
        if (!formIsValid) {
            return
        }


        // submiting to backend
        const submit = async () => {
            setIsSubmitting(true)
            await fetch('url', {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        name: enteredName,
                        street: enteredStreet,
                        city: enteredCity,
                        postalCode: enteredPostalCode
                    },
                    orderedItems: context.items
                })
            })
            setIsSubmitting(false)
            setDidSubmit(true)
            context.clearCart()
        }
        submit()

    }

    return <Modal onClick={() => setShowCheckOut(false)}>
        {/* here we're setting message, while the order is submiting to Firebase and after it's successfull we show another message */}
        {isSubmitting && <p>One moment please, we're completing your order...</p>}
        {didSubmit &&
            <>
                <p>You successfully sent the order!</p>
                <div className={styles.actions}>
                    <button type='button' onClick={() => setShowCheckOut(false)}>Close</button>
                </div>
            </>}
        {!isSubmitting && !didSubmit &&
            <div className={styles.checkout}>
                <h3>Your Order:</h3>
                <div className={styles['checkout-items']}>
                    {
                        context.items.map((oneItem) => {
                            const { id, name, amount } = oneItem
                            return <div key={id} className={styles['checkout-item']}>
                                {name} - x{amount}
                            </div>
                        })
                    }
                </div>
                <div className={styles.total}>
                    <span>Total Price: </span>
                    <span>${context.totalAmount.toFixed(2)}</span>
                </div>
                <div className={styles.form}>
                    <h3>Your Details:</h3>
                    <form onSubmit={submitForm}>
                        <div className={`${styles.control} ${formInputsValid.name ? '' : styles.invalid}`}>
                            <label htmlFor="name">Name</label>
                            <div className={styles.input}>
                                <input type="text" id='name' ref={nameInputRef} />
                                {!formInputsValid.name && <span>Please enter a valid name.</span>}
                            </div>
                        </div>
                        <div className={`${styles.control} ${formInputsValid.street ? '' : styles.invalid}`}>
                            <label htmlFor="street">Street</label>
                            <div className={styles.input}>
                                <input type="text" id='street' ref={streetInputRef} />
                                {!formInputsValid.street && <span>Please enter a valid street name.</span>}
                            </div>
                        </div>
                        <div className={`${styles.control} ${formInputsValid.postalCode ? '' : styles.invalid}`}>
                            <label htmlFor="postal">Postal Code</label>
                            <div className={styles.input}>
                                <input type="text" id='postal' ref={postalCodeInputRef} />
                                {!formInputsValid.postalCode && <span>Postal code has to have 5 characters.</span>}
                            </div>
                        </div>
                        <div className={`${styles.control} ${formInputsValid.city ? '' : styles.invalid}`}>
                            <label htmlFor="city">City</label>
                            <div className={styles.input}>
                                <input type="text" id='city' ref={cityInputRef} />
                                {!formInputsValid.city && <span>Please enter a valid city.</span>}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button type='button' onClick={() => setShowCheckOut(false)}>Cancel</button>
                            <button className={styles.button}>Order</button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </Modal>
}


export default Checkout