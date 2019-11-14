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
  const [classifications, setClassifications]= useState([])

  const onSubmit = async data => {
    const { number, classification, vacancies } = data;
   const response = await api.post("/table", {
      number,
      vacancies,
      classification
  });
  tables.push(response.data)



    localStorage.setItem("tables", JSON.stringify(tables))
    setTables(JSON.parse(localStorage.getItem("tables")));
    window.alert(`mesa ${number} em ${classification} foi adicionado a lista de mesas!`);


}
  const tableList=(
  <ul className="table-list">
    {classifications.map(item => {
      if(item.section === "table"){
        return(
        <li key={item._id}>
          <h3>{item.classification}</h3>
          <ul>
          {tables.map(subItem => {
            if(subItem.classification._id === item._id){
              return(

          <li key={subItem._id}>
            <span key={subItem._id}>
              Mesa: <strong>{subItem.number}</strong>
            </span>
            <span>
              Lugares: <strong>{subItem.vacancies }</strong>
            </span>
            <span>
              Disponibilidade: <strong>{subItem.availability=== true?"Disponivel":"Ocupada"}</strong>
            </span>
            <button className="direction" onClick={() => handleAvailability(subItem)}>
              <img src={direction} alt="direction" />
            </button>
            <button className="exclude" onClick={() => handleDestroy(subItem)}>
              <img src={exclude} alt="destroy" />
            </button>
          </li>
        )}})
      }
          </ul>
        </li>

       )}
    })}

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
    setClassifications(JSON.parse(localStorage.getItem("classification")))
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
                <select name="classification"  ref={register({ required: true })}>
                  <option value=""></option>
                  {classifications.map(item => {
                    if(item.section === "table"){
                      return(
                      <option key={item._id} value={item._id}>{item.classification}</option>
                      )
                    }
                  })}
                </select>
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
