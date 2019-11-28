import React, {useEffect, useState, useMemo} from "react";
import api from "../../services/api";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import { Modal} from 'react-bootstrap';
import useForm from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import destroy from "../../assets/button/destroy.svg";




export default function Orders() {
  const [tables, setTables] = useState([])
  const [dishs, setDishs] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [category, setCategory] = useState("");
  const [dish, setDish] = useState("")
  const [show, setShow] = useState(false);
  const [ingredients, setIngredients] = useState([])
  const [extra, setExtra] = useState([]);
  const [command, setCommand] = useState([]);
  const { handleSubmit, register, errors } = useForm();
  const [destiny, setDestiny] = useState(null);
  const [classTable, setClassTable] = useState("")
  const [table, setTable] = useState("")
  const [user, setUser] = useState("")


  function nextRadio(){
    setClassTable("")
    setTable("")
  }
  function refresh(){
    setCommand([])
    nextRadio()
    setDestiny(null)
  }

  useEffect(()=>{nextRadio()},[destiny])
  const inSubmit = async data =>{
    let obj ={
      costumer : null,
      salesman:user.name,
      destiny,
      table: null,
      adrress: {
        zipCode: null,
        number: null,
        complement: null
      },
      orders: command
    }
    console.log(destiny)
    const {zipCode, number, complement, costumer} = data
    switch (destiny) {
      case 'tables':
        obj.table = table
        handleCommand(obj)
        break;
      case 'delivery':

        obj.adrress = {
          zipCode: zipCode,
          number: number,
          complement: complement
        }
        obj.costumer = costumer
        handleCommand(obj)
        break;
      case 'take':

        obj.costumer = costumer
        handleCommand(obj)
        break;
      default:
        console.log("selecione uma opção de destino");

    }
  }
  async function handleCommand(obj){
    const response = await api.post("command", obj)
    console.log(response.data)
    refresh()
  }

  const onSubmit = async data => {
    const { ps, amount } = data;
    delete data.ps;
    delete data.amount
    let withdraw = []
    let extra = []
    for (let prop in data) {
      if (data[prop] === false) {
        delete data[prop];
      }else{
        dish.ingredients.map(item => {
          if(item._id === data[prop]){
            withdraw.push(data[prop])
            delete data[prop]
          }})
        if(data[prop]){
          extra.push(data[prop])
          delete data[prop]
        }
      }
  }
    const response = await api.post("orders",{
      dish: dish._id,
      withdraw,
      extra,
      ps,
      amount
    })
    let arr = command
    arr.push(response.data)

    setCommand(arr)

    handleClose()
  }
  const numTable =(
     <>
      <label>Local</label>
      <select onChange={event => setClassTable(event.target.value)}>
        <option value="" ></option>
        {classifications.map( item => {
          if(item.section === "table"){
            return(
            <option
              key={item._id}
              value={item.classification}
            >
              {item.classification}
            </option>
            )
          }
        })}
      </select>
      {classTable !== ""
      ?<>
        <label>Número da mesa</label>
        <select onChange={event => setTable(event.target.value)}>
          <option value=""></option>
          {tables.map( item => {
            if(item.classification.classification === classTable){
              return(
                <option value={item._id}>{item.number}</option>
          )}})}
      </select>
      </>
    :null}
  </>
  )

  const delivery = <>
      <label>Cliente: </label>
      <input type="text" name="costumer"ref={register({ required: true })}/>
      <label>CEP: </label>
      <input type="number" name="zipCode" ref={register({ required: true })}/>
      <label>Número</label>
      <input type="number" name="number" ref={register({ required: true })}/>
      <label>Complemento</label>
      <input type="text" name="complement" ref={register({ required: false })}/>
    </>

  const costummer = <>
    <label>Cliente: </label>
    <input type="text" name="costumer" ref={register({ required: true })}/>
    </>
  const theDestiny = destiny === "tables"
    ? <>{numTable}</>
    :destiny === "delivery"
      ?<>{delivery}</>
      :destiny === "take"
        ?<>{costummer}</>
        :null

  const theCommand = command.length > 0
    ?(
      <>
      <ul>
        {command.map(item => {
          const index = (command.indexOf(item) +1 )
            return(
              <li key={item._id}>
                <span>{index}</span>
                <span>{item.amount}x {item.dish.name}</span>
                <button><img src={destroy} alt="destroy"/></button>
                <ul>
                  <li>
                    {item.withdraw.length > 0
                      ?<div>
                        <h5>Retirar: </h5>
                        {item.withdraw.map(subitem =>(
                          <span key={subitem._id}>
                            {subitem.name}
                          </span>
                        ))}
                      </div>
                    :null}
                    {item.extra.length > 0
                      ?<div>
                        <h5>Adicionar: </h5>
                        {item.extra.map(subitem =>(
                          <span key={subitem._id}>
                            {subitem.name}
                          </span>
                        ))}
                      </div>
                    :null}
                    {item.ps.length > 0
                    ?<>
                      <h5>Observação:</h5>
                      <span>{item.ps}</span>
                    </>
                    :null }
                    <h5>Valor R${item.totalPrice}</h5>
                  </li>
                </ul>
              </li>
        )})}
      </ul>
      <button id="confirm-command" type="submit">Confirmar</button>
      </>
    )
    :(<span className="empty">Comanda vazia</span>)

  function handleClose(){
    setShow(false);
  }
 function handleShow(item){
   setDish(item)
   setIngredients(item.ingredients)
   setShow(true);
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
    setTables(JSON.parse(localStorage.getItem("tables")))
    const arr = JSON.parse(localStorage.getItem("dishs"))
    setDishs(arr);
    setClassifications(JSON.parse(localStorage.getItem("classification")));
    let variable = []
    function resolveThis(element, index, array){
    if(element.classification.classification === "Extra"){
      variable.push(element)
    }
  }

  arr.forEach(resolveThis)
  setExtra(variable)
  },[])

  const navClassifications = useMemo(() => {
    return(
      <div id="navClass">
      {classifications.map(item => {
        if(item.section === "dish" && item.classification !== "Extra"){
          return(
            <header key={item._id}>
              <button onClick={() => setCategory(item.classification)}>
                {item.classification}
              </button>
            </header>
          )
        }
      })}

     </div>
    )

  }, [classifications])

  const listDish = useMemo(() => {
    if(category === ""){
      return <h1>Selecione uma categoria</h1>
    }else{
      return(
        <div id="listDish">
          {dishs.map(item => {
            if(item.classification.classification === category){
              return(
                <header key={item._id}>
                  <button onClick={() => handleShow(item)}>
                    {item.name}
                  </button>
                </header>
              )
            }
          })}
        </div>
      )
    }
  },[category])



  const modal = (
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>{dish.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="options">
            Selecione os Ingredientes que deseja retirar
            <div>
            {ingredients.map(item => (
            <>
              <input
                key={item._id}
                type="checkbox"
                name={item.name}
                value={item._id}
                ref={register}

              />
              <label htmlFor={item.name}>{item.name}</label>
            </>
          ))}
          </div>
          </Modal.Body>
          <Modal.Body className="options">
            Selecione os extras que deseja adicionar:
            <div>
            {extra.map(item => (
            <>
              <input
                key={item._id}
                type="checkbox"
                name={item.name}
                value={item._id}
                ref={register}

              />
              <label htmlFor={item.name}>{item.name}</label>
            </>
          ))}
          </div>
          </Modal.Body>
          <Modal.Body className="options">
            <label htmlFor="ps">Observações</label><br/>
            <textarea name="ps" ref={register} />
          </Modal.Body>
          <Modal.Footer>
            <label htmlFor="amount">Quantidade</label>
            <input
                type="number"
                name="amount"
                ref={register}
                min="1"
                required
            />
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" type="submit">
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
  )

  return (
    <>
      <HomeBar />
      <div id="containerOrders">
        <NavBar />
        <div id="alingOrders">
        {navClassifications}
        {listDish}
        </div>

      <input type="checkbox" id="command"hidden />
      <label htmlFor="command" className="command-icon"><p>Comanda</p> </label>

      <nav className="command-menu" id="command-list" >
        <form onSubmit={handleSubmit(inSubmit)}>
          <div>
            <div>
              <label htmlFor="tables">Mesa</label>
              <input type="radio" name="destiny" onChange={() => setDestiny("tables")} />
            </div>
            <div>
              <label htmlFor="delivery">Entrega</label>
              <input type="radio" name="destiny" onChange={() => setDestiny("delivery")}/>
            </div>
            <div>
              <label htmlFor="take">Levar</label>
              <input type="radio" name="destiny" onChange={() => setDestiny("take")}/>
            </div>
          </div>
          {theDestiny}
          <br/>
          {theCommand}
        </form>
      </nav>

      </div>
      {modal}
    </>
  )
}
