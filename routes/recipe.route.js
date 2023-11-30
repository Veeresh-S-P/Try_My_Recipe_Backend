const {Router}=require("express")
const recipeRoute=Router()

const {RecipeModel}=require("../models/recipe.model")

recipeRoute.post("/recipe", async(req,res)=>{
    try {
        
const {name,category,ingredients,instructions,price}=req.body;

let newRecipe=new RecipeModel({name,category,ingredients,instructions,price})
await newRecipe.save()
res.status(200).send({"success":true, "message":"recipe added succesfully"})

    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

recipeRoute.get("/recipes",async(req,res)=>{
    try {
        const recipes=await RecipeModel.find();
        res.status(200).send({"success":true, "message":"you succesfully got recipes ", data:recipes})
    } catch (error) {
        res.status(400).send({"error":error.message})

    }
})

recipeRoute.delete("/recip/:id", async(req,res)=>{


    try {
        const recipeId=req.params.id;
        let recipe =await RecipeModel.findByIdAndDelete(recipeId)
        res.status(200).send({"success":true, "message":"you succesfully deleted recipes"})

    } catch (error) {
        res.status(400).send({"error":error.message})

    }
})

recipeRoute.get("/recipes/filter", async(req,res)=>{
    try {
        
        const {category, sortBy}=req.query;
        let query={}
        if(category){
            query.category=category;
        }
        let sortOption={};

        if(sortBy==="asc"){
            sortOption={price:1}

        }else if(sortBy==="desc"){
            sortOption={price:-1}

        }
        const recipes=await RecipeModel.find(query).sort(sortOption);
        res.status(200).send({"success":true, "message":"you succesfully sorted and filtered recipes"})



    } catch (error) {
        res.status(400).send({"error":error.message})

    }
})

module.exports={recipeRoute}