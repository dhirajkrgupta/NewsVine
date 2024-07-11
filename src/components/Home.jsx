import React from "react";
import { useLoaderData,useSearchParams } from 'react-router-dom';


const Home = () => {
  const { articles, totalResults } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'general';
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '21';

  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Headlines</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article) => (
          <div key={article.url} className="border p-4 rounded-lg shadow-md">
            <img
              src={article.urlToImage || 'https://via.placeholder.com/150'}
              alt={article.title}
              className="mb-4 w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.description}</p>
            <a href={article.url} className="text-blue-500 mt-2 block">Read more</a>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-bold mt-4">
                    <button  type="button" className="btn btn-dark" onClick={()=>handlePageChange(Number(page)-1)} disabled={page <= 1} >&larr; Previous</button>
                    <button  type="button" className="btn btn-dark" onClick={()=>handlePageChange(Number(page)+1)} disabled={page >= Math.ceil(totalResults/pageSize)}>Next &rarr;</button>
      </div>
    </div>
    
  );
};

export default Home;
export const loadNews = async ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'general';
  const page = url.searchParams.get('page') || 1;
  const pageSize = url.searchParams.get('pageSize') || 21;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Re-throw the error after logging it
  }
};

