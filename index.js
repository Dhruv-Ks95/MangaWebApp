import express from "express";
import axios from "axios";

const app = express();
const port = 4150;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Random API until i get access to MangaDex API
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12322";

app.get("/", async(req,res)=>{
    try{
        const response = await axios.get(API_URL);
        console.log(response.data.drinks);
        const drinkname = response.data.drinks[0].strDrink;
        const drinkurl = response.data.drinks[0].strDrinkThumb;
        console.log(drinkname,drinkurl);
        res.render("index.ejs", {dname:drinkname,durl:drinkurl});
    }catch(error){
        console.log("some error in fetching from API");
        res.sendStatus(500);
    }
});

app.get("/aboutus.ejs", (req,res)=>{
    res.render("aboutus.ejs");
});

app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});

