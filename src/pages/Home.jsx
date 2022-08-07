import React from "react"
import { Sort } from "../components/sort"
import { Skeleton } from "../components/skeleton"
import { PizzaItem } from "../components/pizza-item"
import { Categories } from "../components/categories"
import logo from "../logo.svg";


export const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://62efe09657311485d12a2ac3.mockapi.io/items')
    .then((data) => {return data.json();
      })
    .then(json => {
      setItems([...json])
      setIsLoading(false)
  
    })
    
   },[])

  return (
    <>
       <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
           { isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) :
              items.map((item) => (
               <PizzaItem key = {item.id}
                {...item}
                />
              ))
               
           }

          </div>
    </>
  )
}