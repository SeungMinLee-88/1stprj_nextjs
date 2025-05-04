import React, { useState, useEffect, useCallback } from "react";

import { Container,
  ListItem,
  ListIcon,
  ListHeader,
  ListDescription,
  ListContent,
  List,
  Pagination,
  Search  } from "semantic-ui-react";
import styles from "./ItemList.module.css";
import Link from "next/link";



function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false}
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}
const initialState = {
  loading: false,
  results: [],
  value: '',
}
export default function BoardList({ boardList, currentPage, TotalPage, changePage, changeSearchKey, changeSearchValue, searchKey, startPage, endPage }) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state
  const [paginationOptions, setPaginationOptions] = useState({
    activePage: currentPage,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: false,
    showPreviousAndNextNav: true,
    totalPages: TotalPage
  });
  
  const [activePageData, setActivePageData] = useState([]);

  
  const goToPage = pageNumber => {
    //setPaginationOptions({ ...paginationOptions, activePage: pageNumber });
    console.log("pageNumber : " + pageNumber);
    changePage(pageNumber);
    /* setActivePageData(2
      orderedData.slice(
        (pageNumber - 1) * itemPerPage,
        pageNumber * itemPerPage
      )
    ); */
  };
  const timeoutRef = React.useRef()
  const handleSearchChange = (e, data) => {
    console.log("data.value : " + data.value);
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })
    console.log("results : " + results);
    changeSearchValue(data.value);

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
      })
    }, 300)
  }


  
  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'right', alignItems:'right'}}>
    <select
          value={searchKey}
          onChange={e => changeSearchKey(e.target.value)} style={{width: 100}}>
          <option value="boardTitle">Title</option>
          <option value="boardWriter">Writer</option>
        </select>
      
      <Search
          loading={loading}
          placeholder='Search...'
          onSearchChange={handleSearchChange}
          showNoResults={false}

        />
   </div>
   {boardList.length !== 0 ?
      <div>
      {boardList.map((board) => (
        <li key={board.id}>{board.id}
        </li>
      ))}
       <List divided relaxed>
        {/* {  if(boardList.length === 0){
    return <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>No Content</h1></div>
  }} */}
   {/* <ListItem href="/board/detail/${board.id}"  key={board.id} > */}
   {/* <Link href="/board/detail/[id]" as={`/board/detail/${board.id}`}> */}

          {boardList.map((board) => (
           
           <ListItem href={`/board/detail/${board.id}`}  key={board.id} >
              <ListContent>
                <ListHeader>{board.boardTitle}</ListHeader>
                <ListDescription>Writer : {board.boardWriter}</ListDescription>
                <ListDescription>{board.boardCreatedTime.substring(0, 10)}</ListDescription>
              </ListContent>
            </ListItem>
          ))}
        </List>
        </div>
          : 
          <div style={{display: 'flex',  justifyContent:'center'}}>
          <h1 class="ui header">There is no Contents</h1>
          </div>
        
          }
        
        
        {/* https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces */}
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Pagination
          /* activePage={paginationOptions.activePage} */
          activePage={currentPage}
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={TotalPage}
          onPageChange={(_, { activePage }) => goToPage(activePage)}
          
        />
        </div>

    </div>
  );
}