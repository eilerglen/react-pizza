import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss';

interface IPAginationProps {
  currentPage: number,
  onChangePage: (page: number) => void
}
const Pagination: FC<IPAginationProps> = ({currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="<"
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected+1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
  />
  )
 
}

export default Pagination