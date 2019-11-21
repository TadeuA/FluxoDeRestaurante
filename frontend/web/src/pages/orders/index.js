import React, {useEffect, useState, useMemo} from "react";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import { Modal } from 'react-bootstrap';
import useForm from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"




export default function Orders() {
  const [dishs, setDishs] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [category, setCategory] = useState("");
  const [dish, setDish] = useState("")
  const [show, setShow] = useState(false);
  const [ingredients, setIngredients] = useState([])
  const [extra, setExtra] = useState([]);
  const [price, setPrice] = useState();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = data => {
    const { ps, amount } = data;
    delete data.ps;
    delete data.amount
    let ingre = []
    let ext = []
    for (let prop in data) {
      if (data[prop] === false) {
        delete data[prop];
    }}
    data = Object.values(data)


    console.log(data);
    console.log(ext);
  }

  function handleClose(){
    setShow(false);
  }
 function handleShow(item){
   setDish(item)
   setIngredients(item.ingredients)
   setPrice(item.price)
   setShow(true);
  }

  useEffect(()=>{
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
        if(item.section === "dish"){
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
                value={JSON.stringify(item)}
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
                value={JSON.stringify(item)}
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
      </div>
      {modal}
    </>
  )
}
