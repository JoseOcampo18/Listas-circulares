export default class Base {
    constructor(name,duration) {
        this._name = name.toUpperCase();
        this._duration = duration;
        this._next = null;
        this._previous = null;
    }

    getNext(){
        return this._next;
    }

    setNext(base){
        this._next = base;
    }

    getPrevious(){
        return this._previous;
    }

    setPrevious(base){
        this._previous = base;
    }

    getName(){
        return this._name;
    }

    getDuration(){
        return this._duration;
    }

    getInfo(){
        return `<div>
        ${this._name}-${this._duration}
        </div>`;
    }
}