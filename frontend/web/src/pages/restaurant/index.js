import React,{ useState, useEffect} from "react";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import useForm from "react-hook-form";
import api from "../../services/api";

import "./styles.css"
import  {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions

} from "@material-ui/core";


export default function Restaurant() {
 const [open, setOpen] = useState(false);
 const [type, setType]= useState("");
 const [classifications, setClassifications] = useState([]);
 const {register, handleSubmit, errors } = useForm();
 const onSubmit = async data => {
    const{ classification } = data
    const response = await api.post("types",{
      classification,
      section: type
    })
    classifications.push(response.data)

    localStorage.setItem("classification", JSON.stringify(classifications))
    loadClass()
 }
 function loadClass(){
  setClassifications(JSON.parse(localStorage.getItem("classification")))
 }
 useEffect(() => {
  loadClass()
 },[])
 function handleClickOpen(name) {
   setType(name)

    setOpen(true);

};

function handleClose(){
    setOpen(false);

};
const mondalIngredient = (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">`Classificações de {type}`</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>Classificações</h3>
            <ul>
              {classifications.map(item => {
                if(item.section === type){
                  return(
                    <li key={item._id}><span>{item.classification}</span></li>
                  )
                }
              })}

            </ul>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend>Nova Classificação</legend>
              <input
                type="text"
                name="classification"
                ref={register({ required: true })}/>
            </fieldset>
            <button type="submit">Criar</button>
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Fechar</button>

        </DialogActions>
      </Dialog>
)
 return (
    <>
      <HomeBar />
      <div id="containerRestaurant">
      <NavBar />
      <div>
        <nav className="options">
          <ul>
            <li>
              <span>Classificações</span>
              <ul>
               <li><button onClick={() => handleClickOpen("dish") }>Pratos</button></li>
                <li><button onClick={() => handleClickOpen("ingredient") }>Ingredientes</button></li>
                <li><button onClick={() => handleClickOpen("table") }>Mesas</button></li>
              </ul>
            </li>
          </ul>
        </nav>
        {mondalIngredient}
      </div>
      </div>

    </>
  );
}
