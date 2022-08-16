import React from 'react';
import styles from './search.module.scss';
import search from '../../assets/img/icons/search.svg'
import { AppContext } from '../../App';
import { useRef } from 'react';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';


const Search = () => {
  const [value, setValue] = React.useState('')
  const {searchValue, setSearchValue} = React.useContext(AppContext)
  const inputRef = useRef(null)

  const onclickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  }
  React.useCallback(() => {

  })
  
 

  React.useEffect(() => {
    console.log(document.querySelector('input'))

  },[])

 

  const updateSearchValue = useCallback (
      debounce((str) => {
        console.log(str)
        setSearchValue(str)
      }, 2000),

    [],
  )

  const onChangeInput = (evt) => {
    setValue(evt.target.value)
    updateSearchValue(evt.target.value)
  }

  return (
    <div className={styles.root}>
    <svg 
      className={styles.icon}
      fill="#000000" 
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 20 20" width="18px" height="18px">    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
    </svg>
      <input 
        ref={inputRef} 
        value= {value}
        onChange = {onChangeInput}
        className={styles.input} 
        placeholder ="Поиск пиццы" 
        type="text" 
      />
       {
        searchValue && (
          <svg
          onClick={onclickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
        )
       }
      
    </div>
     
  )
}
export default Search