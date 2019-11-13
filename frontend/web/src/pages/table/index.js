import React, { useState, useEffect  } from "react";
import useForm from "react-hook-form";
import api from "../../services/api"

import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import "./styles.css";

import direction from "../../assets/button/direction.svg";
import exclude from "../../assets/button/destroy.svg";

export default function Table() {
  const [tables, setTables]= useState([]);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    const { number, classification, vacancies } = data;
   const response = await api.post("/table", {
      number,
      vacancies,
      classification
  });
  tables.push(response.data)


    setTables(tables);
    localStorage.setItem("tables", JSON.stringify(tables))
    window.alert(`mesa ${number} em ${classification} foi adicionado a lista de mesas!`);


}
  const tableList=(
  <ul className="table-list">
      {tables.map(item => (
        <li key={item._id}>
          <span key={item._id}>
            Mesa: <strong>{item.number}</strong>
          </span>
          <span>
            Lugares: <strong>{item.vacancies }</strong>
          </span>
          <span>
            Disponibilidade: <strong>{item.availability=== true?"Disponivel":"Ocupada"}</strong>
          </span>
          <button className="direction" onClick={() => handleAvailability(item)}>
            <img src={direction} alt="direction" />
          </button>
          <button className="exclude" onClick={() => handleDestroy(item)}>
            <img src={exclude} alt="destroy" />
          </button>
        </li>
      ))}
    </ul>


)


  async function handleDestroy(table){
    const response = await api.delete(`table/${table._id}`)
    console.log(response)
    const index = tables.indexOf(table._id)
    tables.splice(index,1)
    console.log(tables)
    localStorage.setItem(
      "tables",
    JSON.stringify( tables))
    loadTable()


  }
  function handleAvailability(table){
    table.availability?table.availability = false:table.availability = true
    const index = tables.indexOf(table._id)
    tables[index] = table
    localStorage.setItem("tables", JSON.stringify( tables))
    loadTable()

  }
function loadTable(){
  setTables(JSON.parse(localStorage.getItem("tables")));

}
  useEffect(() => {
    loadTable()
  }, []);
  return (

    <>
      <HomeBar />
      <div id="containerTable">
        <NavBar />
        <div className="grid">
          <div id="listTable" >
           {tableList}
          </div>
          <div id="createTable" >
          <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend>Número</legend>
                <input
                  type="number"
                  placeholder="Número"
                  name="number"
                  ref={register({ required: true })}
                />
              </fieldset>
              <fieldset>
                <legend>Local</legend>
                <input
                  type="text"
                  placeholder="local"
                  name="classification"
                  ref={register({ required: true, min: 0 })}
                />
              </fieldset>
              <fieldset>
                <legend>Lugares</legend>
                <input
                  type="number"
                  placeholder="lugares"
                  name="vacancies"
                  ref={register({ required: true, min: 0 })}
                />
              </fieldset>
              <input type="submit" />
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
