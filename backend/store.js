class Store{
    constructor(){
        this.st = new Map()
    }

    set(key,value){
        this.st.set(key,value)
    }

    get(key){
        return this.st.get(key)
    }

    delete(key){
    this.st.delete(key)
    }
}

export default new Store()