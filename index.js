import React, { memo, useCallback, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import './style.css';

const App = () => {
  const [value, setValue] = useState([]);

  const fetchData = useCallback(() => {
    const url = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json'
    return axios.get(url);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData()
      setValue(res.data)
    }
    getData()
  },[])

  return (
    <>
      <ul>{value?.map((item) => <li>{item.author}</li>)}</ul>
    </>
  )
}

render(<App />, document.getElementById('root'));
