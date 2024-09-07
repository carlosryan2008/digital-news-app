'use client';

import React, { useState, useEffect } from 'react';
// import AOS
import AOS from 'aos';

export default function CreatePostItem() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  const intialState = {
    title: '',
    img: '',
    category: '',
    author: '',
    brief: '',
    validate: '',
  };

  const [text, setText] = useState(intialState);

  const handleTextChange = (e: Event | any) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: '' });
  };

  const handleFormSubmit = async (e: Event | any) => {
    e.preventDefault();
    // simple form validation
    if (
      text.title === '' ||
      text.img === '' ||
      text.category === '' ||
      text.brief === ''
    ) {
      setText({ ...text, validate: 'incomplete' });
      return;
    }

    // POST request sent
    try {
      const response = await fetch('/api/postitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      setText({ ...text, validate: 'loading' });

      const result = response.status;
      if (result === 201) {
        setText({ ...text, validate: 'success' });
        console.log('Success:', result);
      }
    } catch (error) {
      setText({ ...text, validate: 'error' });
      console.error('Error:', error);
    }
  };

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
                      <h1 className="page-title">Criar um novo artigo</h1>
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
                          placeholder="Cole aqui a URL da imagem desejada"
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
                          placeholder="Digite a categoria do artigo"
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
                          placeholder="Digite o nome do autor"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Resumo</label>
                        <textarea
                          className="form-control"
                          name="brief"
                          value={text.brief}
                          onChange={handleTextChange}
                          placeholder="Digite um breve resumo do conteúdo"
                          cols={30}
                          rows={10}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === 'loading' && (
                          <div className="loading">Enviando Artigo...</div>
                        )}
                        {text.validate === 'incomplete' && (
                          <div className="error-message">
                            Preencha os campos obrigatórios.
                          </div>
                        )}
                        {text.validate === 'success' && (
                          <div className="sent-message">
                            Sua contribuição foi aceita. Obrigado!
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
                          value="Postar Artigo"
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
