import React, { memo, useCallback, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

const fetchdefaultJSON = () => {
  return (
    axios
      .get(
        'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json'
      )
      // .then(({data}) synatx to get the directly data
      .then((res) => {
        // handle success
        return JSON.stringify(res.data, null, 3);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  );
};

const App = () => {
  const [value, setValue] = useState([]);
  const [fetchAxios, setfetchAxios] = useState([]);
  const [displayJson, setdisplayJson] = useState('');

  // Easy Method
  const fetchdefaultdata = () => {
    axios
      .get(
        'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json'
      )
      .then(function (response) {
        // handle success
        setfetchAxios(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // By using callbacks
  const fetchData = useCallback(() => {
    const url =
      'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
    return axios.get(url);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData();
      setValue(res.data);
    };
    getData();
  }, []);

  useEffect(() => {
    //By using aync await
    const getData = async () => {
      const res = await fetchdefaultJSON();
      setdisplayJson(res);
    };
    getData();
    // By using normal promise
    // fetchdefaultJSON().then((json) => {
    //   setdisplayJson(json);
    // });
  });

  return (
    <>
      {/* <ul>{value?.map((item) => <li>{item.author}</li>)}</ul> */}
      <button
        onClick={() => {
          fetchdefaultdata();
        }}
      >
        fecth using axios
      </button>
      <ul>
        {fetchAxios?.map((item) => (
          <li>{item.author}</li>
        ))}
      </ul>
      {/* To displat as Json iteself */}
      <pre>{displayJson}</pre>
    </>
  );
};

render(<App />, document.getElementById('root'));
