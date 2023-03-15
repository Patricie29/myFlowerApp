import CartContext from "./CartContext"
import { useState } from 'react'


 
const CartProvider = (props) => {

    const [ currentItems, setCurrentItems ] = useState([])
    const [ totalPrice, setTotalPrice ] = useState(0)

    const addItemToCartHandler = (oneItem) => {

        console.log(oneItem)
        // updating amount, and saving previous amount so it adds up
        setTotalPrice(prevState => prevState + oneItem.amount * oneItem.price)

        // finding the item we clicked on
        const clickedItem = currentItems.filter((oneFilteredItem) => {
            return oneFilteredItem.id === oneItem.id
        })  

        // have to resave the currentItems so we can later on update them individually
        let allUpdatedItems = currentItems

        // if there is something in the clicked item
        if (clickedItem.length > 0) {
            //find index of that clicked item
            const findIndex = currentItems.findIndex((oneItemIndex) => {
                return oneItemIndex.id === oneItem.id
            })

            // create let and update just the amount of items 
            const updatedItem = {
                ...clickedItem[0],
                amount: clickedItem[0].amount + oneItem.amount
            }

            // update the intem saving his index, so it doesnt change its position ans stays put
            allUpdatedItems[findIndex] = updatedItem

        } else { 
            // else if there is no match, add it to the array
            allUpdatedItems = [...currentItems, oneItem]
        }

        // and update our currentItems so we can see it properly in the cart
        setCurrentItems(allUpdatedItems)
    }



    const removeItemFromCartHandler = (oneItem) => {

        // updating amount, and saving previous amount so it adds up
        setTotalPrice(prevState => prevState - oneItem.price)


        const clickedItem = currentItems.filter((oneFilteredItem) => {
            return oneFilteredItem.id === oneItem.id
        })

        // have to resave the currentItems so we can later on update them individually
        let allUpdatedItems = currentItems

        if (clickedItem[0].amount === 1) {
            allUpdatedItems = currentItems.filter((oneFilteredItem) => {
                return oneFilteredItem.id !== oneItem.id
            })
        } else {
            const findIndex = currentItems.findIndex((oneItemIndex) => {
                return oneItemIndex.id === oneItem.id
            })
             // create let and update just the amount of items 
             const updatedItem = {
                ...clickedItem[0],
                amount: clickedItem[0].amount - 1
            }
            
            allUpdatedItems[findIndex] = updatedItem
        }

        setCurrentItems(allUpdatedItems)

    }

    const clearCartHandler = () => {
        setCurrentItems([])
        setTotalPrice(0)
    }


    // tady mas nastaveny ty values od cart context a jenom k nim pridany values s kteryma tady pracujeme a pod kteryma je accessneme.
    const cartContext = {
        items: currentItems,
        totalAmount: totalPrice,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}


export default CartProvider