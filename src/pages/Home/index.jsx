import React, { useState } from "react";
import FilterPanel from "../../components/Home/FilterPanel";
import SearchBar from "../../components/Home/SearchBar";
import List from "../../components/Home/List";
import "./styles.css";
import { dataList } from "../../constants";
import { useEffect } from "react";
import EmptyView from "../../components/common/EmptyView";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState("");
  const [resultFound,setResultFound] = useState(false)
  const [cusines, setCusines] = useState([
    {
      id: 1,
      checked: false,
      label: "American",
    },
    {
      id: 2,
      checked: false,
      label: "Chinese",
    },
    {
      id: 3,
      checked: false,
      label: "Italian",
    },
  ]);

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeCheked = (id) => {
    const cusinesStateList = cusines;
    const changeChekedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCusines(changeChekedCuisines);
  };

  const handleChangePrice = (event, value) => setSelectedPrice(value);

  const applyFilters = () => {
    let updatedList = dataList;

    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    const cuisineChecked = cusines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisineChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisineChecked.includes(item.cuisine)
      );
    }

    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    if (inputSearch) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(inputSearch.toLowerCase().trim()) !==
          -1
      );
    }



    setList(updatedList);

    !updatedList.length ? setResultFound(false):setResultFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cusines, selectedPrice,inputSearch]);

  return (
    <div className="home">
      <SearchBar
        value={inputSearch}
        changeInput={(e) => setInputSearch(e.target.value)}
      />
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            cusines={cusines}
            changeCheked={handleChangeCheked}
            selectedPrice={selectedPrice}
            changedPrice={handleChangePrice}
          />
        </div>
        <div className="home_list-wrap">
          { resultFound ? <List list={list} /> : <EmptyView/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
