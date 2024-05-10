import express from "express";
import axios from "axios";

const app = express();
const port = 4150;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Kitsu API for anime descriptions and details
const API_URL = "https://kitsu.io/api/edge"
const config = {
    headers: { Authorization: `Bearer ROA8mdsn_UCKZnJ_d0tNcRs5hXOI2lFtrh2edpj2qDs` }
};

app.get("/", async(req,res)=>{
    try{
        const trendinganimeurl = API_URL +"/trending/anime";
        const response = await axios.get(trendinganimeurl,config);
        const rs = response.data.data;
        const trendingAnimes = [];
        const tofetch = 10;
        // Planning to update the front-end 
        for(let i = 0;i<tofetch;i++){
            const title = rs[i].attributes.titles.en;
            const synopsis = rs[i].attributes.synopsis;
            const description = rs[i].attributes.description;
            const averageRating = rs[i].attributes.averageRating;
            const favouritesCount = rs[i].attributes.favoritesCount;
            const ageRating = rs[i].attributes.ageRating;
            const episodeCount = rs[i].attributes.episodeCount;
            const imageurl = rs[i].attributes.posterImage.medium;
            const coverurl = rs[i].attributes.coverImage.small;

            const series = {
                title,
                synopsis,
                description,
                averageRating,
                favouritesCount,
                ageRating,
                episodeCount,
                imageurl,
                coverurl,
            };

            trendingAnimes.push(series);
        }
        
        res.render("index.ejs",{trending : trendingAnimes});
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

