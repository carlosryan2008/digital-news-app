'use client'; // Marca este arquivo como um componente cliente

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
}

export default function PostItems() {
  const [items, setItems] = useState<Post[]>([]);

  const getItemsData = () => {
    fetch(`/api/postitems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error: unknown) => {
        let errorMessage = 'Erro ao buscar os itens';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error(errorMessage);
      });
  };

  useEffect(() => {
    getItemsData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este item?')) {
      try {
        const response = await fetch(`/api/postitems/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Atualizar a lista após a exclusão
          setItems(items.filter(item => item._id !== id));
        } else {
          const errorData = await response.json();
          console.error("Erro ao deletar o item:", errorData.message);
        }
      } catch (error: unknown) {
        let errorMessage = 'Erro ao deletar o item';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error(errorMessage);
      }
    }
  };

  return (
    <div className="container">
      <main id="main">
        <section id="posts" className="posts">
          <div className="grid">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item._id} className="post-item position-relative">
                  <Link href={`/postitems/${item._id}`}>
                    <div>
                      <img src={item.img} alt={item.title} className="post-image" />
                      <div className="post-details">
                        <span className="post-category">{item.category} - {formatDate(item.date)}</span>
                        <h2 className="post-title">{item.title}</h2>
                      </div>
                    </div>
                  </Link>
                  <button 
                    className="btn btn-danger position-absolute top-0 end-0 m-2" 
                    onClick={() => handleDelete(item._id)}
                    aria-label="Deletar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <Link href={`/createpostitems/${item._id}`}>
                    <button 
                      className="btn btn-primary position-absolute top-0 start-0 m-2"
                      aria-label="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p>Nenhum post encontrado.</p>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .post-item {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          position: relative;
        }

        .post-item:hover {
          transform: scale(1.02);
        }

        .post-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .post-details {
          padding: 15px;
        }

        .post-category {
          display: block;
          font-size: 14px;
          color: #aaa;
          margin-bottom: 5px;
        }

        .post-title {
          font-size: 18px;
          margin: 10px 0;
          color: #333;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          color: white;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
          color: white;
        }
      `}</style>
    </div>
  );
}
