import React from "react";
import { Sort } from "../components/sort";
import { Skeleton } from "../components/skeleton";
import { PizzaItem } from "../components/pizza-item";
import { Categories } from "../components/categories";
import logo from "../logo.svg";
import Pagination from "../components/pagination/pagination";

export const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort;
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://62efe09657311485d12a2ac3.mockapi.io/items?page=${currentPage}&limit=4&${category}
      &sortBy=
      ${sortBy}
      ${search}`
    )
      .then((data) => { 
        return data.json();
      })
      .then((json) => {
        setItems([...json]);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(i) => setCategoryId(i)}
          />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage = {(number) => setCurrentPage(number)}/>
      </div>
    </>
  );
};
