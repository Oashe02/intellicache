import store from "./store.js"

const cmds={
    "SET":(...args)=>{
        const key=args[0];
        const valuearr = [];
        let expiry=null;

        for (let i=1;i<args.length;i++) {
        if (args[i]==="EX") {
            const val=Number(args[i+1]);
            if(!isNaN(val)) {
                expiry=val;
            }
            break
        }
        valuearr.push(args[i]);
        }
        const value=valuearr.join(" ")
        if(!key||!value){
        return "missing key or value"}
        store.set(key,value,expiry)
        return "done"
    },
    "GET":(key)=>{
        if(!key){
            return "missing key"
        }
        const value = store.get(key)    
        return value || "not found"
    },
    "DELETE":(key)=>{
        if(!key){
            return "missing key"}
        store.delete(key)
        return"done"
    },
    "EXISTS":(key)=>{
        if(!key){
            return "missing key"}
        const data = store.st.get(key);
        if (!data) return "false";
        if (data.expiry && Date.now()>data.expiry){
            store.st.delete(key);
            return "false";
        }
        return "true"
    },
    "TTL":(key)=>{
        const data=store.st.get(key);
        if (data.expiry == null) return "no expiry"
        if (!data) return "data nhi hain for this key";
        const rem=Math.floor((data.expiry-Date.now())/1000);
        return rem>0?rem:"expired";
    },
    "KEYS":()=>{
    return JSON.stringify(Array.from(store.st.keys()));
    },
    "STATS":()=>{
    let total=store.st.size;
    let exp=0;

    for (let data of store.st.values()) {
        if (data.expiry) exp++;
    }
    return JSON.stringify({total,exp})
}
}


function inputparser(input){
    const parts=input.trim().split(" ")
    const comm=parts[0]?.toUpperCase()
    if(!comm){
        return "cmd not existss"
    }
    const commdfn = cmds[comm]
    if(!commdfn){
        return "cmd not existss"
    }
    return commdfn(...parts.slice(1))
}

export default inputparser