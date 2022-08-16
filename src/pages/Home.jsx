import React, { useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Sort } from "../components/sort";
import { Skeleton } from "../components/skeleton";
import { PizzaItem } from "../components/pizza-item";
import { Categories } from "../components/categories";
import Pagination from "../components/pagination/pagination";
import { AppContext } from "../App";
import { setCategoryId, setCurrentPage } from "../services/slices/filterSlice";

export const Home = () => {
  const {categoryId, sort, currentPage} = useSelector(state => state.filterSlice)
  const dispatch = useDispatch()

  const {searchValue} = useContext(AppContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //Сменить категорию

  const onChangeCategory = (id) => {
   dispatch(setCategoryId(id))
  }

  //Сменить страницу

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : "";

    axios.get(`https://62efe09657311485d12a2ac3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res => {
      setItems(res.data);
       setIsLoading(false);
    })
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage= {currentPage} onChangePage = {onChangePage}/>
      </div>
    </>
  );
};
