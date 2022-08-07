import logo from "./logo.svg";
import "./scss/app.scss";
import { Header } from "./components/header";
import { Categories } from "./components/categories";
import { Sort } from "./components/sort";
import { PizzaItem } from "./components/pizza-item";

import pizzas from '../src/assets/data/pizzas.json'


function App() {
  console.log(pizzas )
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
           {
              pizzas.map((item) => (
                <PizzaItem 
                 title = {item.title} 
                  price={item.price} 
                  image={item.imageUrl}
                  sizes={item.sizes}
                  types={item.types}
                />
              ))
               
           }

          </div>
        </div>
      </div>
    </div> 
  );
}

export default App;
