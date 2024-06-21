import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const categoriesMapping = {
  "AIC RMP": "(AIC RMP)",
  "Niti Aayog": "(Niti Aayog)",
  "Indian Startups": "(Indian Startups)",
  "Grassroot Level": "(Grassroot Level)",
  "Innovative Solution": "(Innovative Solution)"
};

export async function fetchNews(categories) {
  const allArticles = [];

  for (const category of categories) {
    const query = categoriesMapping[category];
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 3,
        apiKey: API_KEY
      }
    });

    allArticles.push(...response.data.articles);
  }

  return allArticles;
}
