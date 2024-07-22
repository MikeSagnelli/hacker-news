const fetchLatestNews = async () => {
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/newstories.json'
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching latest news', error);
    return null;
  }
};

const fetchNewsItem = async (id: number) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return response.json();
  } catch (error) {
    console.error(`Error fetching news item with id: ${id}`, error);
    return null;
  }
};

export const hackerNewsApi = {
  fetchLatestNews,
  fetchNewsItem,
};
