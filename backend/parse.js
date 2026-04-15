import store from "./store.js"

const cmds={
    "SET":(key,value)=>{
        if(!key||!value){
        return "missing key or value"}
        store.set(key,value)
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