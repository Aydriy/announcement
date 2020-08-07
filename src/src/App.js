import React, { useState, useEffect } from "react";
import Sidebar from "./component/sidebarComponents/Sidebar.jsx";
import axios from "axios";
import AnnouncementItem from "./component/sidebarComponents/AnnouncementItem.jsx";
import { useHistory } from "react-router-dom";

function App() {
  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      lists.filter((x) => x && x.name.toLowerCase().includes(e.target.value))
    );
  };

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=id").then(({ data }) => {
      setLists(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const onEditDescription = (id, description) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.description = description;
      }
      return item;
    });
    setLists(newList);
  };
  let history = useHistory();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <AnnouncementItem
          items={[
            {
              active: history.location.pathname === "/",
              class: "sidebar__announcement navbar-brand",
              name: "All announcement",
            },
          ]}
          onClickItem={(list) => {
            history.push(`/lists/`);
            setActiveItem(null);
          }}
        />

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      {searchResults.length ? (
        <Sidebar
          lists={searchResults}
          onAddList={onAddList}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onEditTitle={onEditTitle}
          onEditDescription={onEditDescription}
        />
      ) : (
        <Sidebar
          lists={lists}
          setLists={setLists}
          onAddList={onAddList}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onEditTitle={onEditTitle}
          onEditDescription={onEditDescription}
        />
      )}
      {/* <Sidebar
        
        lists={lists}
        setLists={setLists}
        onAddList={onAddList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onEditTitle={onEditTitle}
        onEditDescription={onEditDescription}
      /> */}
    </div>
  );
}

export default App;
