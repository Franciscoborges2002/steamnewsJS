const axios = require("axios");

baseURL = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/";
hasReapetedNews = false;
howManyNews = 0;
newsTitles = []

async function getNews(appid, countOfNews, maxLength, trust, format){
    //Changing the format of the file, json if not specified
    //appid -> app id of the game
    //countOfNews -> The number of news to appear
    //maxLenght -> Maximum length of each new entry
    //trust -> if the link for the new is internal or external, the trust goes to steam store new
    //format -> json(standard), xml, vdf
    if(format == "xml"){//To support the xml format

    }else if(format == "vdf"){//To support the vdf format

    }else {
        try{
        const response = await axios.get(baseURL + `?appid=${appid}&count=${countOfNews}&maxlength=${maxLength}&format=json`);
        const news = response.data.appnews.newsitems;

        console.log(`trust: ${trust}`)

        for(var i = 0; i < countOfNews; i++){
            //console.log(news[i].url.includes("steam_community_announcements"))
           
            if(trust == true){
               if(news[i].url.includes("steam_community_announcements")){
                //console.log("new " + (i + 1) + ": " + news[i].gid)
                //console.log("title of the new: " + news[i].title)
                //console.log("content of the new: " + news[i].contents)
                console.log("link to access: " + news[i].url)
                howManyNews++;
                }else{
                    hasReapetedNews = true;
                } 
            }else{//If the trust set to false, do later

            }
            
            
        }

        //console.log(newsTitles)

        if(hasReapetedNews){
            console.log(`Didn't appeared all of the news, some news are repeated. So only from steam sotre are accepted to appear.\nNumber of news that appeared ${howManyNews}`)
        }
        }catch(err){
            console.log(err)
        }
    }

    
}

getNews(440, 3, 3000, true)