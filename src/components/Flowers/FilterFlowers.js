import styles from './FilterFlowers.module.css'
import Card from '../UI/Card'
import { useState } from 'react'

const FilterFlower = ({ filterByColor }) => {

    const [selectedColors, setSelectedColors] = useState([]);
    const [validation, setValidation] = useState(false)

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        if (event.target.checked) {
            setSelectedColors([...selectedColors, selectedColor]);
        }
        else {
            setSelectedColors(selectedColors.filter(color => color !== selectedColor));
        }
    }

    const seeAllHandler = () => {
        filterByColor(['red', 'white', 'apricot', 'blue', 'pink', 'yellow'])
    }


    const submitForm = (event) => {
        event.preventDefault()

        if (selectedColors.length === 0) {
            setValidation(true)
            const timeout = setTimeout(() => {
                setValidation(false);
            }, 1500);
            return () => clearTimeout(timeout);
        }

        filterByColor(selectedColors)
        setSelectedColors([])
        setValidation(false)

    }

    return <>
        <Card className={styles.filterCard}>
            <h4>Filter By Color</h4>
            <form onSubmit={submitForm}>
                <label>
                    <input type="checkbox" name="color" value="red" onChange={handleColorChange} checked={selectedColors.includes('red')} />
                    <span style={{ color: '#ff0000' }}>Red</span>
                </label>
                <label>
                    <input type="checkbox" name="color" value="yellow" onChange={handleColorChange} checked={selectedColors.includes('yellow')} />
                    <span style={{ color: '#ffff00' }}>Yellow</span>
                </label>
                <label>
                    <input type="checkbox" name="color" value="blue" onChange={handleColorChange} checked={selectedColors.includes('blue')} />
                    <span style={{ color: '#0000ff' }}>Blue</span>
                </label>
                <label>
                    <input type="checkbox" name="color" value="white" onChange={handleColorChange} checked={selectedColors.includes('white')} />
                    <span style={{ color: '#ffffff' }}>White</span>
                </label>
                <label>
                    <input type="checkbox" name="color" value="apricot" onChange={handleColorChange} checked={selectedColors.includes('apricot')} />
                    <span style={{ color: '#ffb347' }}>Apricot</span>
                </label>
                <label>
                    <input type="checkbox" name="color" value="pink" onChange={handleColorChange} checked={selectedColors.includes('pink')} />
                    <span style={{ color: '#ffc0cb' }}>Pink</span>
                </label>
                <button type='submit' className={styles.button}>Select</button>
                <button onClick={seeAllHandler} className={styles.button}>See All</button>
            </form>
        </Card>
        {validation && <div className={styles.error}><p>Please select a color.</p> </div>}
    </>
}


export default FilterFlower


