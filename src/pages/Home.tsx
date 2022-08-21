import React, { FC } from "react";
import qs from "qs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../services/store";
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
import { fetchPizzas, SearchPizzaParams } from "../services/slices/pizzasSlice";

export const Home: FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filterSlice
  );
  const { items, status } = useSelector((state: any) => state.pizzasSlice);
  const dispatch = useAppDispatch();

  //Сменить категорию

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  //Сменить страницу

  const onChangePage = (number: number) => {
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
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      }
      const queryString = qs.stringify(params, {skipNulls: true}
      );
      navigate(`?${queryString}`);

      if(!window.location.search) {
        dispatch(fetchPizzas({} as SearchPizzaParams))
      }

    }
  }, [categoryId, sort.sortProperty, currentPage, navigate ]);

  //Если был первый рендер то проверяем параметры и сохраняем в хранилище

  React.useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isMounted.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaItem key={item.id} {...item} />
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
