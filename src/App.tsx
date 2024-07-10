import React from "react";
import { useState, useEffect } from 'react';
import { Field, Input, Card } from "@grafana/ui";
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
        <Field label="Enter a search term" description="Your search term will be matched against each item's title text">
          <Input id="search-field" onChange={onInputChange} />
        </Field>
        <ul style={{
          padding: '20px',
          listStyle: 'none',
          display: 'grid'
        }}>
          {searchResult.map((item: any, index: number) => (
            <li key={"item-" + index}>
              <Card>
                <Card.Heading>{item.title}</Card.Heading>
                <Card.Description>{item.body}</Card.Description>
              </Card>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;