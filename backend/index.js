import net from "net"
import dotenv from "dotenv"
import inputparser from "./parse.js"
dotenv.config()
const port = process.env.port

const server = net.createServer((socket) => {
  console.log("connected\n");
  let buffer = ""
  
  socket.on("data", (data) => {
    buffer+=data.toString()
    const recinput=buffer.split("\n")
    buffer=recinput.pop()
    for (let cmd of recinput){
    try{
      cmd=cmd.trim()
      if(!cmd) continue;
      const res=inputparser(cmd)
      if (res !== undefined && res !== null) {
        socket.write(res + "\n");
      } else {
        socket.write("null\n");
      }
    } catch (err) {
      console.log("error", err.message+ "\n")
    }
  }
  });

  socket.on("end",()=>{
    console.log("disconnected\n")
  })

  socket.on("error",(err)=>{
    console.log("error",err)
  })
});

server.listen(port, () => {
  console.log(` server running on port ${port}\n`);
});