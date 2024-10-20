import React, { useState, useEffect } from 'react'; 
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // To manage the loading state
  const [error, setError] = useState(null); // To manage errors

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data.articles || []); // Make sure articles is always an array
        setLoading(false); // Loading is complete
      } catch (err) {
        setError(err.message);
        setLoading(false); // Even if there's an error, stop the loading state
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>   
      <h2 className="text-center">
        <span className="badge bg-danger fs-16">Top-Headlines</span>
      </h2>

      {loading && <p className="text-center">Loading news...</p>} {/* Loading state */}
      {error && <p className="text-center text-danger">Failed to load news as We did not have The Companies premium Plan which gives us allowance to fetch the news in the production mode. But wait, if you are a developer then simply refer the below documentation to run this project locally on your machine
      <a href="www.google.com" target="_blank">Click here!</a></p>} {/* Error handling */}

      {!loading && !error && (
        <div className='d-flex flex-wrap justify-content-center'>
          {articles.map((news, index) => (
            <NewsItem 
              key={index} 
              title={news.title} 
              description={news.description} 
              src={news.urlToImage || "default_image.jpg"} // Default image if urlToImage is missing
              url={news.url} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsBoard;
