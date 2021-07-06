import React from "react";
import { categoryList, ratingList } from "../../../constants";
import CheckboxProton from "../../common/CheckboxProton";
import FilterListToggle from "../../common/FilterListToggle";
import SliderProton from "../../common/SliderProton";
import "./styles.css";

const FilterPanel = ({
  selectedCategory,
  selectToggle,
  selectedRating,
  selectRating,
  cusines,
  changeCheked,
  selectedPrice,
  changedPrice,
}) => {
  return (
    <div>
      <div className="input-group">
        <p className="label">Category</p>
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectToggle}
        />
      </div>
      <div className='input-group'>
        <p className="label">Cuisine</p>
        { cusines.map(cuisine=><CheckboxProton
        key={ cuisine.id }
        cuisine={cuisine}
        changeCheked={changeCheked}
        />) }
      </div>

          <div className='input-group'>
            <p className='label-range'>Cuisine</p>
            <SliderProton
            value={ selectedPrice }
            changedPrice={changedPrice}
            />

          </div>

      <div className="input-group">
        <p className="label">Star Rating</p>
        <FilterListToggle
          options={ratingList}
          value={selectedRating}
          selectToggle={selectRating}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
