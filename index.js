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
        const trendingmangaurl = API_URL + "/trending/manga";

        const responseman = await axios.get(trendingmangaurl,config);
        const rsman = responseman.data.data;
        const trendingManga = [];
        for(let i = 0;i<10;i++){
            const title = rsman[i]?.attributes?.titles?.en ?? rsman[i]?.attributes?.titles?.en_us ?? "Title Not Available";
            const synopsis = rsman[i].attributes.synopsis;
            const description = rsman[i].attributes.description;
            const averageRating = rsman[i].attributes.averageRating;
            const favouritesCount = rsman[i].attributes.favoritesCount;
            const ageRating = rsman[i].attributes.ageRating;
            const episodeCount = rsman[i].attributes.chapterCount;
            const imageurl = rsman[i].attributes.posterImage.medium;

            const series = {
                title,
                synopsis,
                description,
                averageRating,
                favouritesCount,
                ageRating,
                episodeCount,
                imageurl,
            };
            trendingManga.push(series);
        }
        const charactersurl = API_URL + "/characters";
        const responsechar = await axios.get(charactersurl,config);
        const rschar = responsechar.data.data;
        const characters = [];
        for(let i=0;i<tofetch;i++){
            const title = rschar[i].attributes.names.en;
            const synopsis = rschar[i].attributes.description;
            const imageurl = rschar[i].attributes.image.original;

            const series = {
                title,
                synopsis,
                imageurl
            }
            characters.push(series);
        }
        
        res.render("index.ejs",{trendingani : trendingAnimes, trendingman : trendingManga, chars:characters});
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

