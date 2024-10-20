import React, { useState, useEffect } from 'react'; 
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {

    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        fetch(url).then(response=>response.json()).then(data => setArticles(data.articles));

    },[category])

  return (
    <div>   
        <h2 className="text-center"><span className="badge bg-danger fs-16">Top-Headlines</span></h2>
        <div className='d-flex flex-wrap justify-content-center'>
          <p> Due to some reasons, we are unable to fetch the Data through the API as we did not took their premium plan and only on local machine we can use their data.</p>
        {articles.map((news,index)=>{
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
        })}
        </div>
    </div>
  )
}

export default NewsBoard
