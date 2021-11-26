export default class Route{

    constructor(start) {
        this._start = start;
    }

    addBase(newBase){
        if (this._start == null){
            this._start = newBase;
            this._start.setNext(this._start);
            this._start.setPrevious(this._start);
            return `${this._start.getInfo()}`;
        }
        else if(this._searchBase(newBase.getName()) == null){
            let aux=this._start;
            while(aux.getNext()!= this._start){
                aux=aux.getNext();
            }
            aux.setNext(newBase);
            newBase.setPrevious(aux);
            newBase.setNext(this._start);
            this._start.setPrevious(newBase);
            console.log(this._start);
            return `${newBase.getInfo()}`;
        }
        else{
            return `No se puede agregar`;
        }
    }

    deleteBase(name){
        if (this._start == null) {
            return null;
        }
        else{
            let del = null;
            if (name == this._start.getName()){
                if (this._start.getNext() != this._start){
                    del = this._start;
                    this._start.getPrevious().setNext(this._start.getNext());
                    this._start.getNext().setPrevious(this._start.getPrevious());
                    this._start = this._start.getNext();
                    del.setNext(null);
                    del.setPrevious(null);
                    return del;
                }
                else{
                    del = this._start;
                    this._start = null;
                    return del;
                }
            }
            else{
                let aux = this._start.getNext();
                while (aux != this._start) {
                    if (aux.getName() == name){
                        del = aux;
                        aux.getPrevious().setNext(aux.getNext())
                        aux.getNext().setPrevious(aux.getPrevious());
                        del.setNext(null);
                        del.setPrevious(null);
                        return del;
                    }
                    else{
                        aux = aux.getNext();
                        }
                }
                return del;
            }
        }
    }

    _addToList(aux){
        if (aux.getNext() == this._start) {
            return aux.getInfo();
        }
        else{
            return aux.getInfo() + this._addToList(aux.getNext());
        }
    }

    listBases(){
        if (this._start===null){
            return "Esta vacio";
        }
        else {
            return this._addToList(this._start);
        }
    }

    createCard(base,date,minutes){
        let count = 1;
        let text = `<div>
        ${count}-${base}-${date.getHours()}:0${date.getMinutes()}
        </div>`;
        let startbases = this._searchBase(base);
        if (startbases != null) {
            let aux = startbases.getNext();
            while (minutes > 0) {
               let duration = Number(aux.getDuration());
               minutes -= duration;
               if (minutes < 0) {
                   return text;
               }
               else{
                   count ++;
                    date.setMinutes(date.getMinutes() + duration);
                    let minutes2 = date.getMinutes();
                    if(minutes2 < 10 ){
                        text += `<div>
                        ${count}-${aux.getName()}-${date.getHours()}:0${date.getMinutes()}
                        </div>`;
                    }
                    else{
                        text += `<div>
                        ${count}-${aux.getName()}-${date.getHours()}:${date.getMinutes()}
                        </div>`;
                    }
                    aux = aux.getNext();
               }

            }
            return text;
        }else{
            return `Esa base no existe`;
        }
    }

    _searchBase(name){
        let aux = this._start;
        if (aux.getName() == name) {
            return aux;
        }
        else{
            aux = aux.getNext();        
            while (aux != this._start) {
                if (name == aux.getName()) {
                return aux;
                }
                else {
                aux = aux.getNext();
                }
            }
        return null;
        }
    }
}