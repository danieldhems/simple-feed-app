import React from "react";
import { useState, useEffect } from 'react';
import './App.css';

export type item = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [items, setItems] = useState<item[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const onInputChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  const searchResult = searchTerm && items.length
    ? items.filter(item => item.title?.includes(searchTerm))
    : items;

  return (
    <div className="App">
      <header className="App-header">
        <input id="search-field" type="text" placeholder="Enter search term" onChange={onInputChange} />
        <ul>
          {searchResult.map((item: any, index: number) => (
            <li key={"item-" + index}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
