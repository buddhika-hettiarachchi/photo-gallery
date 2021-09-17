import React, { useState, useEffect, useRef } from "react";

import "./allphotos.css";
import axios from "axios";


function AllPhotos() {
  const [items, setItems] = useState();
  const [gridItems, setGridItems] = useState();
  const [array, setArray] = useState();
  const [isLoading, setLoadig] = useState(true);

  const entriesList = [];
  let entries;
  const elementList = [];
  const imgList = [];

  useEffect(() => {
    /*   get uploaded photos json file */
    axios
      .get(`http://localhost:3000/uploads`) 
      .then((res) => {
        entries = res.data.entries;
        const list = entries.map((photo) => {
          return (
            <div class="input-container" key={photo.id}>
              <input
                id={photo.id + "photo"}
                type="checkbox"
                name={photo.id}
                value={photo.id}
                onChange={handleChange}
              />
              <label id={photo.id} for={photo.id + "photo"}></label>
              <img
                class="uploaded-photo"
                id={photo.id + "img"}
                src={`${photo.picture}/${photo.id}/john.png`}
              />
            </div>
          );
        });

        setItems(list);
        setLoadig(false);
      });

    /* get all saved photos from db */
    axios
      .get(`http://localhost:3000/fetchAll`)
      .then((result) => {
        const fetchResult = result.data;
        const fetchList = fetchResult.map((photo) => {
          return (
            <div class="grid-item" key={photo.value}>
              <img src={`https://i.ibb.co/${photo.value}/john.png`} />
            </div>
          );
        });

        setGridItems(fetchList);
      })
      .catch((err) => console.log(err));
  }, []);

  /* order photos according to user selection */
  const handleChange = (event) => {
    const obj = {
      value: event.target.value,
      checked: event.target.checked,
    };

    if (obj.checked) {
      if (entriesList.length < 9) {
        entriesList.push(obj);
      }
    }

    if (obj.checked == false) {
      for (var i = entriesList.length - 1; i >= 0; --i) {
        if (entriesList[i].value == event.target.value) {
          entriesList.splice(i, 1);
        }
      }
    }

    setArray(entriesList);

    var index = entriesList
      .map(function (e) {
        return e.value;
      })
      .indexOf(event.target.value);

    var element = document.getElementById(event.target.value);
    var imgElement = document.getElementById(event.target.value + "img");

    if (index != -1) {
      elementList.push(element);
      imgList.push(imgElement);
      element.innerHTML = index + 1;
    }

    if (index == -1) {
      for (var i = elementList.length - 1; i >= 0; --i) {
        if (elementList[i].id == event.target.value) {
          elementList.splice(i, 1);
          imgList.splice(i, 1);
        }
      }
      element.innerHTML = null;
      const tempArr = [];
      for (let element of elementList) {
        if (element.innerHTML != null) {
          tempArr.push(element);
        }
      }

      for (let element in tempArr) {
        tempArr[element].innerHTML = null;
        tempArr[element].innerHTML = Number(element) + 1;
      }
    }
  };

  /* save user selected photos to db and show them in photo grid */
  const handleSubmit = (arr) => {
    axios
      .get(`http://localhost:3000/delete`)
      .then((result) => {
        const valueArray = [];
        for (let item of arr) {
          valueArray.push(item.value);
        }
        const jsonObj = { value: valueArray };
        console.log(jsonObj);
        axios
          .post(`http://localhost:3000/save`, jsonObj)
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    if (arr) {
      const gridList = arr.map((photo) => {
        return (
          <div class="grid-item" key={photo.value}>
            <img src={`https://i.ibb.co/${photo.value}/john.png`} />
          </div>
        );
      });

      setGridItems(gridList);
    }
  };

  return (
    <div class="main-section">
      {isLoading ? (
        <div class="over-lay">
          <img src="/loader.jpg" alt="loader" />
        </div>
      ) : null}
      <div class="title">Photo Gallery</div>
      <form class="form" onSubmit={handleSubmit}>
        {items}
      </form>
      <button class="button" type="button" onClick={() => handleSubmit(array)}>
        Choose
      </button>
      <div class="grid-container">{gridItems}</div>
    </div>
  );
}

export default AllPhotos;
