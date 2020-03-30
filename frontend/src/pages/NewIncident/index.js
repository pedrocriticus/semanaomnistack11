import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Heros"/>
                    <h1>Cadastrar novo casp</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                           Voltar para home
                            </Link>
                </section>
                
                <form onSubmit={handleNewIncident}>
                    <input 
                    value = {title}
                    onChange = {e => setTitle(e.target.value)}
                    placeholder="Título do caso"/>    
                   
                    <textarea 
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                    placeholder="Descrição"></textarea>
                    
                    <input 
                    value = {value}
                    onChange = {e => setValue(e.target.value)}
                    placeholder="Valor em reais" />
                    
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}