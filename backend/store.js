class Store{
    constructor(){
        this.st = new Map()
        setInterval(()=>this.cleanup(),1000)
    }

    set(key,value,givenexpiry=null){
        let expiry=null
        if(givenexpiry){
            expiry= Date.now() +givenexpiry*1000
        }
        this.st.set(key,{value,expiry})
    }

    get(key){
        const data = this.st.get(key)
        if(!data){
            return null
        }
        if(data.expiry && Date.now() > data.expiry){
            this.st.delete(key)
            return null
        }
        return data.value
    }

    delete(key){
    this.st.delete(key)
    }
    cleanup(){
        const now =Date.now()
        for (let [key,data] of this.st.entries()){
            if(Date.now()>data.expiry){
                this.st.delete(key)
            }
        }
    }
}

export default new Store()