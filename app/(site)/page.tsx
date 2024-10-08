import { client } from '@/sanity/lib/client';
import { POSTS_QUERY, CATEGORIES_QUERY } from '@/sanity/lib/queries';
import { POSTS_QUERYResult, CATEGORIES_QUERYResult } from '../../sanity.types';
import HomeArticles from '@/components/homeArticles';

const revalidate = 60;

async function getData() {
  const [categories, posts] = await Promise.all([
    client.fetch<CATEGORIES_QUERYResult>(
      CATEGORIES_QUERY,
      {},
      {
        next: {
          revalidate,
        },
      }
    ),
    client.fetch<POSTS_QUERYResult>(
      POSTS_QUERY,
      {
        categorySlug: null,
      },
      {
        next: {
          revalidate,
        },
      }
    ),
  ]);
  // TODO get data from sanity
  return { categories, posts };
}

const Homepage = async () => {
  const { categories, posts } = await getData();
  return (
    <div className="p-4 min-h-screen">
      <HomeArticles categories={categories} posts={posts} />
    </div>
  );
};

export default Homepage;
