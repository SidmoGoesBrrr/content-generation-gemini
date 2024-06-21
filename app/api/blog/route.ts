import { NextRequest, NextResponse } from 'next/server';
import { fetchNews } from '@/./utils/fetchNews.js';
// Placeholder fetchNews function. Replace with actual implementation or import.
async function fetchNewsHandler(categories: string[]): Promise<{ title: string, description: string }[]> {
    try {
      const articles = await fetchNews(categories);
      return articles.map(article => ({
        title: article.title,
        description: article.description
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
  
  

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const { categories, prompt: customPrompt } = body;
    // Ensure categories is an array
    if (!Array.isArray(categories)) {
      throw new TypeError("categories must be an array");
    }

    // Fetch news articles based on selected categories
    const articles = await fetchNewsHandler(categories);

    // Prepare the request payload for Gemini
    const newsArticles = articles.map(article => ({
      title: article.title,
      description: article.description,
    }));

    
    const selected_articles = JSON.stringify(newsArticles);
    let prompt = customPrompt;

    if (prompt.includes("{news_articles}")) {
      prompt = prompt.replace("{news_articles}", selected_articles);
  }
    console.log("Prompt:", prompt);
    // const conclusion= "Keep word count at 1000 words."
    // let prompt = `Write a blog on categories: ${selected_categories} and use case studies if needed : ${selected_articles}. Do not write about information related to coin or crypto technologies ${conclusion}`;
    // //Check if categories have "AIC RMP" in them, if they do then add a line to the prompt
    // if(categories.includes("AIC RMP")){
    //   prompt += "Here is some background about AIC. (AIC) Atal Incubation Centre- Rambhau Mhalgi Prabodhini (RMP) Foundation has been set up in alignment with Atal Innovation Mission (AIM), NITI Aayog to nurture, handhold and support New Age Entrepreneurs for New Age India. The focus is on job creation through entrepreneurship in the domains of Agriculture, Education & ICT. It also aims to create & support sustainable business models at grassroot level including social enterprises.VisionTo inspire, nurture and handhold New Age Entrepreneurs for New India by steering the power of innovation and entrepreneurship.";
    // }

    

    // Replace with your actual API key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorDetails: any = await response.json();
      console.error('Gemini API error details:', errorDetails);
      throw new Error(`Failed to create blog with Gemini API: ${errorDetails.error.message}`);
    }

    const responseData = await response.json();
    console.log('Gemini API response data:', JSON.stringify(responseData, null, 2));

    const blogContent = responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content.parts.map(part => part.text).join(' ');

    return NextResponse.json({ message: 'Blog created successfully', blogContent });

  } catch (error) {
    console.error('Failed to create blog:', error);
    return new NextResponse('Internal Server Error', { status: 500, body: JSON.stringify({ error: error.message }) });
  }
}
