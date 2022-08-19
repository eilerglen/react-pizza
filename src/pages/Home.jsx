import React from "react";
import axios from "axios";
import qs from "qs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Sort, sortList } from "../components/sort";
import { Skeleton } from "../components/skeleton";
import { PizzaItem } from "../components/pizza-item";
import { Categories } from "../components/categories";
import Pagination from "../components/pagination/pagination";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../services/slices/filterSlice";
import { fetchPizzas } from "../services/slices/pizzasSlice";

export const Home = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const searchParams = useSearchParams()
  console.log(searchParams)
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzasSlice);
  const dispatch = useDispatch();

  //Сменить категорию

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  //Сменить страницу

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //Запрос на получение пицц
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  //Сохраняем в хранилище новый объект запроса. Если изменили параметры и был первый  рендер...

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
      console.log(queryString);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер то проверяем параметры и сохраняем в хранилище
  React.useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = qs.parse(search.substring(1));
      console.log(params);
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      console.log(sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item) => (
    <Link key={item.id} to={`/pizza/${item.id}`}>
      <PizzaItem  {...item} />;
    </Link>
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2> Произошла ошибка </h2>
            <p> К сожалению не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
