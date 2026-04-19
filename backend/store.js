class Store{
    constructor(){
        this.st = new Map()
        this.maxKeys = 1000
        setInterval(()=>this.cleanup(),1000)
    }

    set(key,value,givenexpiry=null){
        let expiry=null
        if(givenexpiry){
            expiry= Date.now() +givenexpiry*1000
        }
        if (this.st.has(key)) {
            this.st.delete(key)
        }
        this.evictIfNeeded()
        this.st.set(key,{value,expiry,lastAccessed:Date.now()})
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
        this.st.delete(key)
        this.st.set(key, {
            ...data,
            lastAccessed: Date.now()
        })
        return data.value
    }

    delete(key){
    this.st.delete(key)
    }
    cleanup(){
        const now=Date.now()
        for (let [key,data] of this.st.entries()){
            if(data.expiry && now>data.expiry){
                this.st.delete(key)
            }
        }
    }
    evictIfNeeded(){
        if (this.st.size<this.maxKeys)return
        const oldestKey=this.st.keys().next().value;
        if (oldestKey){
            this.st.delete(oldestKey)
            console.log(oldestKey)
        }
    }
}

export default new Store()