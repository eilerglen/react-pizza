import logo from "./logo.svg";
import "./scss/app.scss";
import { Header } from "./components/header";
import { Categories } from "./components/categories";
import { Sort } from "./components/sort";
import { PizzaItem } from "./components/pizza-item";

function App() {
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
            <PizzaItem title = "Мексиканская" price={500}/>
            <PizzaItem title = "Мексиканская" price={350}/>
            <PizzaItem title = "Мексиканская" price={450}/>
            <PizzaItem title = "Мексиканская" price={600}/>
            <PizzaItem title = "Мексиканская" price={250}/>
            <PizzaItem title = "Мексиканская" price={390}/>
            <PizzaItem title = "Мексиканская" price={400}/>
            <PizzaItem title = "Мексиканская" price={400}/>
            <PizzaItem title = "Мексиканская" price={350}/>
            <PizzaItem title = "Мексиканская" price={550}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
