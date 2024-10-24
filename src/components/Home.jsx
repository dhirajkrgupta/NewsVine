import React from "react";
import { useLoaderData} from 'react-router-dom';


const Home = () => {
  const { articles} = useLoaderData();
  

  return (
    <div className="p-4  bg-gray-900">
      <h1 className="text-2xl text-purple-600 font-bold mb-4">Top Headlines</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article) => (
          <div key={article.url} className="p-4 rounded-2xl  bg-slate-800 shadow-lg">
            <img
              src={article.urlToImage || 'https://via.placeholder.com/150'}
              alt={article.title}
              className="mb-4 w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-medium text-white">{article.title}</h2>
            <p className="text-sm text-gray-400">{article.description}</p>
            <a href={article.url} className="text-purple-700 mt-2 block">Read more</a>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Home;
export const loadNews = async ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'general';

  try {
    const response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; 
  }
};

