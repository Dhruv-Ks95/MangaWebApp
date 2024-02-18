import express from "express";
import axios from "axios";

const app = express();
const port = 4150;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.get("/aboutus.ejs", (req,res)=>{
    res.render("aboutus.ejs");
});

app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});

