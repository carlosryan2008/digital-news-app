'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';

// Definição da interface para Post
interface Post {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  trending: boolean;
  top: boolean;
}

export const initialPost = {
    _id: '',
    img: '',
    category: '',
    date: '',
    title:'',
    brief:'',
    avatar: '',
    author: '',
    trending: '',
    top: '',
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<Post[]>([]);
  const [item, setItem] = useState<Post | null>(null);

  // Função para obter os dados dos posts
  const getItemsData = async () => {
    try {
      const res = await fetch('/api/postitems');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.log('Error fetching items:', e);
    }
  };

  // Função para obter dados de um post específico
  const getSinglePostData = async (_id: string) => {
    try {
      const res = await fetch(`/api/postitems/${_id}`);
      if (res.status === 404) {
        router.push('/not-found');
      } else if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setItem(data);
    } catch (e) {
      console.log('Error fetching single post:', e);
    }
  };

  useEffect(() => {
    getItemsData();
    getSinglePostData('66d0ef36d557111174afbe6e');
  }, []);

  return (
    <section id="post" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          {/* Coluna para posts top - a principal */}
          <div className="col-lg-6">
            <h2 className="title-margin-right">Principais</h2> {/* Título com margem */}
            <div className="top-posts">
              {items && items.length > 0 &&
                items.filter((item) => item.top) // Filtra posts top
                  .slice(0, 3) // Limita a 3 posts
                  .map((item) => (
                    <PostItemOne key={item._id} large={true} item={item} />
                  ))}
            </div>
          </div>
          {/* Coluna para posts trending */}
          <div className="col-lg-3">
            <h2 className="title-margin-right">Mais Acessados</h2> {/* Título com margem */}
            <div className="trending-posts">
              {items && items.length > 0 &&
                items.filter((item) => item.trending) // Filtra posts trending
                  .slice(0, 3) // Limita a 3 posts
                  .map((item) => (
                    <PostItemOne key={item._id} large={false} item={item} />
                  ))}
            </div>
          </div>
          {/* Coluna para posts não trending nem top */}
          <div className="col-lg-3">
            <h2 className="title-margin-right">Veja Também</h2> {/* Título com margem */}
            <div className="non-trending-top-posts">
              {items && items.length > 0 &&
                items.filter((item) => !item.trending && !item.top) // Filtra posts que não são trending nem top
                  .slice(0, 3) // Limita a 3 posts
                  .map((item) => (
                    <PostItemOne key={item._id} large={false} item={item} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
