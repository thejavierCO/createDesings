const App = {
    api:"https://spaceflightnewsapi.net/api/v2/articles?_limit=15",
    db:"/json/db.json"
}
/**
 * obtener info 
 * @returns {Array<{
 *  id:number
 *  title:string
 *  imageUrl:string
 *  url:string
 *  publishedAt:Date
 *  summary:string
 *  updatedAt:Date,
 *  newsSite:string
 * }>}
 */
const getData = async ()=> await fetch(App.api).then(e=>e.json());
/**
 * start function
 * @param {Function} a callback
 */
const main = a=>typeof a === "function"?(()=>{window.addEventListener("DOMContentLoaded",a);return true})():(()=>{throw "require fn"})()
/**
 * Creacion de cartas
 * @param {Array<{
 *  id:number
 *  title:string
 *  imageUrl:string
 *  url:string
 *  publishedAt:Date
 *  summary:string
 *  updatedAt:Date,
 *  newsSite:string
 * }>} data 
 * @returns {any}
 */
function MakeCards(data){
    try{
        const fragment = document.createDocumentFragment();
        const articles = document.querySelector("div#articles");
        const article = document.querySelector("template#article").content;
        for (let i = 0; i < data.length; i++) {
            const {id,title,imageUrl,url,publishedAt,summary,updatedAt,newsSite} = data[i];
            console.log(newsSite);
            const baseArticle = article.querySelector("div");
            const titleArticle = article.querySelector(".article_Title");
            const dataArticle =article.querySelector(".article_Data");
            baseArticle.setAttribute("id",id);
            baseArticle.style.backgroundImage = `url("${imageUrl}")`;
            titleArticle.querySelector("span").innerText = title;
            titleArticle.querySelector("a").setAttribute("href",url);
            dataArticle.querySelector(".article_Description").innerText = summary;
            dataArticle.querySelector(".article_published").innerText = moment(publishedAt);
            dataArticle.querySelector(".article_updated").innerText = moment(updatedAt);
            const clone = article.cloneNode(true);
            fragment.appendChild(clone);
        }
        articles.appendChild(fragment);
    }catch(err){return err;}
}

main(async ()=>MakeCards(await getData()))