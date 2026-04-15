import net from "net"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.port

const server = net.createServer((socket) => {
  console.log("connected");
  
  socket.on("data", (data) => {
    try{

        const input=data.toString().trim()
        socket.write(input);
    }catch(err){
        console.log("error",err)
    }
  });

  socket.on("end",()=>{
    console.log("disconnected")
  })

  socket.on("error",(err)=>{
    console.log("error",err)
  })
});

server.listen(port, () => {
  console.log(` server running on port ${port}`);
});