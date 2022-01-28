import React, { memo, useCallback, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import './style.css';

const App = () => {
  const [value, setValue] = useState([]);
  const [fetchAxios, setfetchAxios] = useState([]);

  // Easy Method
  const fetchdefaultdata = () => {
    axios.get('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
    .then(function (response) {
      // handle success
      setfetchAxios(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  // By using callbacks
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
      {/* <ul>{value?.map((item) => <li>{item.author}</li>)}</ul> */}
      <button onClick={() => { 
        fetchdefaultdata(); 
        }}>
          fecth using axios</button>
      <ul>{fetchAxios?.map((item) => <li>{item.author}</li>)}</ul>
    </>
  )
}

render(<App />, document.getElementById('root'));
