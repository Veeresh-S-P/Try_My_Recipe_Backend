require("dotenv").config()

const express=require("express")
const cors=require("cors")

const {connection}=require("./database/db")
const{recipeRoute}=require("./routes/recipe.route")

const app=express()

app.use(express.json());

app.use(cors());



app.get("/",async(req,res)=>{
    return res.status(200).send({message:`This is base endpoint`})
})


app.use("/",recipeRoute)

app.all("*", async(req,res)=>{
    return res.status(404).send("route not found")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB connected successfuly")
    } catch (error) {
        console.log(error.message);
    }
    console.log(`server is running at ${process.env.port}`)
})
