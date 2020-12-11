function getData(){
    return fetch("https://spaceflightnewsapi.net/api/v2/articles?_limit=15")
    .then(e=>e.json())
}

function getAtrribute(a){
    console.log(a)
}

function main(a){
    if(typeof a === "function"){
        window.addEventListener("DOMContentLoaded",a)
        return true;
    }else{
        throw {error:"require function"}
    }
}

main(async ()=>{
    const fragment = document.createDocumentFragment()
    const articles = document.querySelector("div#articles")
    const article = document.querySelector("template#article").content
    function MakeCards(data){
        try{
            for (let i = 0; i < data.length; i++) {
                const ale = data[i];
                const {id,title,imageUrl,url,publishedAt,summary,updatedAt,newsSite} = ale;
                const baseArticle = article.querySelector("div");
                const titleArticle = article.querySelector(".article_Title");
                const dataArticle =article.querySelector(".article_Data");
                // editing template
                baseArticle.setAttribute("id",id);
                baseArticle.style.backgroundImage = `url("${imageUrl}")`;
                titleArticle.querySelector("span").innerText = title;
                titleArticle.querySelector("a").setAttribute("href",url);
                dataArticle.querySelector(".article_Description").innerText = summary;
                dataArticle.querySelector(".article_published").innerText = moment(publishedAt)
                dataArticle.querySelector(".article_updated").innerText = moment(updatedAt)
                //writing template
                const clone = article.cloneNode(true);
                fragment.appendChild(clone);
            }
            articles.appendChild(fragment);
            return articles;
        }catch(err){
            return err;
        }
    }
    let data = await getData();
    MakeCards(data);
})
