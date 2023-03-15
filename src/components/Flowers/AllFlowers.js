import styles from './AllFlowers.module.css'
import OneFlower from './OneFlower'
import FilterFlower from './FilterFlowers'
import data from '../../data'

import {useState} from 'react'

const AllFlowers = ({setShowDetails}) => {

  const [ selectedFlowers, setSelectedFlowers ] = useState(data)


  const filterByColor = (selectedColors) => {
 
    const filteredFlowers = data.filter((oneFlower) => {
      return oneFlower.color.some(oneColor => selectedColors.includes(oneColor))
    })
    setSelectedFlowers(filteredFlowers)
  }
  

    return <div className={styles.menu}>
      <div className={styles.filter} >
        <FilterFlower filterByColor={filterByColor}/>
      </div>
      <div className={styles.flowers}>
        <section className={styles['all-flowers']}>
            {
                selectedFlowers.map((oneFlower) => {
                    const { id } = oneFlower
                    return <OneFlower {...oneFlower} key={id} setShowDetails={setShowDetails}/>
                })
            }
        </section>
      </div>
    </div>
}


export default AllFlowers
