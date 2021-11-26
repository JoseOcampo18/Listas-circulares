import Base from "./base.js";
import Route from "./route.js";
class App{
    constructor(){
        this._route= new Route();
        this._div = document.querySelector("#detail");
        let btnAdd=document.querySelector("#btnAdd");
        btnAdd.addEventListener("click",this._addBase);
        let btnDelete=document.querySelector("#btnDelete");
        btnDelete.addEventListener("click",this._delete);
        let btnList=document.querySelector("#btnList");
        btnList.addEventListener("click",this._list);
        let btnCard=document.querySelector("#btnCard");
        btnCard.addEventListener("click",this._tarjeta);
   }

   _addBase= () =>{
       let base = null;
        let name = document.getElementById('textName').value;
        let duration = document.getElementById('numberMinutes').value;

        if(duration&&name){
            document.getElementById('textName').value = "";
            document.getElementById('numberMinutes').value = "";
            base = new Base(name,duration);
            this._div.innerHTML = this._route.addBase(base);
        }
        else{
            this._div.innerHTML = `La base no se agregó`;
            return;
        }
   }

   _list= () =>{
        this._div.innerHTML = this._route.listBases();
        return;
   }

   _delete= () => {
        let name = document.getElementById("textName");
        let del = this._route.deleteBase(name.value.toUpperCase());
        if (del) {
            this._div.innerHTML = `Se eliminó la base:. </n>
            ${del.getInfo()}`;
            name.value = "";
            return;
        }
        else{
            this._div.innerHTML = `No se encontró la base.`;
            name.value = "";
            return;
        }
   }

   _tarjeta= () => {
       let base = document.getElementById("textBase").value.toUpperCase();
       let hora = document.getElementById("numberTime").value;
       let tiempo = document.getElementById("numberDuration").value;
       let date = new Date(2021, 11, 26, hora);
       if(base&&hora&&tiempo){
            document.getElementById("textBase").value = "";
            document.getElementById("numberTime").value = "";
            document.getElementById("numberDuration").value = "";
            this._div.innerHTML = this._route.createCard(base,date,tiempo);
        }else{
            this._div.innerHTML = `La tarjeta no fue creada`;
            return;
        }
   }
}

new App();