import React from 'react'
import '.login.css'


function login(){
    return(
        <main className='centralize'>
            <form>
                <input type= "email" placeholder='Email'/>
                <input type="password" placeholder='Senha'/>
                <button type="button" className='clear'>Recuperar senha</button>
                <button type="button" className='solid'>Entrar</button>
                <button type="button" className='outline'>Registrar</button>
            </form>

        </main>


    )

}