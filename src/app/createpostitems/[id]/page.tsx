'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// import AOS
import AOS from 'aos';

export default function EditPostItem({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();

  const [text, setText] = useState<any | {}>({});
  
  const getSinglePostData = () => {
    fetch(`/api/postitems/${id}`)
      .then(res => {
        if (res.status === 404) {
          router.push('/not-found');
        }
        return res.json();
      })
      .then(data => setText(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    getSinglePostData();
  }, [id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple form validation
    if (
      text.title === '' ||
      text.img === '' ||
      text.category === '' ||
      text.brief === ''
    ) {
      setText({ ...text, validate: 'incomplete' });
      return;
    }

    // POST request
    try {
      const response = await fetch(`/api/postitems/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      setText({ ...text, validate: 'loading' });

      const result = response.status;
      if (result === 200) {
        setText({ ...text, validate: 'success' });
        console.log('Success:', result);
      }
    } catch (error) {
      setText({ ...text, validate: 'error' });
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container" data-aos="fade-up">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Editar Post</h1>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label>Título</label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite o título"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Imagem URL</label>
                        <input
                          type="text"
                          name="img"
                          value={text.img}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Cole a URL da imagem"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Categoria</label>
                        <input
                          type="text"
                          name="category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite a categoria"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Autor</label>
                        <input
                          type="text"
                          name="author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite o nome do author"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Breve Resumo</label>
                        <textarea
                          className="form-control"
                          name="brief"
                          value={text.brief}
                          onChange={handleTextChange}
                          placeholder="Escreva um breve resumo"
                          cols={30}
                          rows={10}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === 'loading' && (
                          <div className="loading">Enviando Post</div>
                        )}
                        {text.validate === 'incomplete' && (
                          <div className="error-message">
                            Preencha todos os campos obrigatórios.
                          </div>
                        )}
                        {text.validate === 'success' && (
                          <div className="sent-message">
                            Artigo atualizado com sucesso. Obrigado pela contribuição.
                          </div>
                        )}
                        {text.validate === 'error' && (
                          <div className="error-message">Server Error</div>
                        )}
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Atualizar Post"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
