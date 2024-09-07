'use client'

import React, { useState, useEffect } from 'react';

interface Post {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  content: string;
}

export default function PostItem({ params }: { params: { id: string } }) {
  const id: string = params.id;

  const [item, setItem] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSinglePostData = async () => {
    try {
      const res = await fetch(`/api/postitems/${id}`);
      if (!res.ok) {
        throw new Error('Erro ao carregar os dados do post');
      }
      const data: Post = await res.json();
      setItem(data);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Erro desconhecido';
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinglePostData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              <div className="single-post">
                <h1 className="post-title">{item?.title}</h1>
                <div className="post-meta">
                  <span className="date">{item?.category}</span>
                  <span className="mx-1">
                    <i className="bi bi-dot"></i>
                  </span>
                  <span>{new Date(item?.date || '').toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="post-content">
                  <p>{item?.brief}</p>
                  <div className="post-full-content">
                    <p>{item?.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .post-title {
          font-size: 2rem;
          margin-top: 20px;
          line-height: 1.3;
        }

        .post-meta {
          font-size: 1rem;
          color: #888;
          margin-bottom: 15px;
        }

        .post-meta .date {
          font-weight: bold;
        }

        .post-content {
          padding: 0 15px;
        }

        .post-content p {
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
        }

        .post-full-content {
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .post-content {
            padding: 0 10px;
          }
        }
      `}</style>
    </main>
  );
}
