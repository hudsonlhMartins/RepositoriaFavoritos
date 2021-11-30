import React, { useCallback, useEffect, useState } from "react";
import {FaGithub, FaPlus, FaSpinner, FaTrash, FaBars} from 'react-icons/fa'
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'


import api from '../../services/api'
import { Link } from "react-router-dom";

export default function Main (){
    const [newResp, setNewResp] = useState('')
    const [repositorios, setRepositorios] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)


    useEffect(()=>{
        
        const responseGet = localStorage.getItem('repos')
        if(responseGet){
            setRepositorios(JSON.parse(responseGet))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])


    const handleSubmit = useCallback((e)=>{
        e.preventDefault()

        async function Submit (){
            setLoading(true)
            try{
                    const res = await api.get(`/repos/${newResp}`)

                    const hasRespo = repositorios.find(repo => repo.name === newResp)
                    // return true ou false

                    if(hasRespo){
                        throw new Error('Vc ja tem esse Repositorio')
                    }

                    const data ={
                        name: res.data.full_name
                    }

                    setRepositorios([...repositorios, data])
                    setNewResp('')
                }catch(err){
                    setAlert(true)
                    console.log(err)
                }finally{
                    // aqui ele vai entrar se ter success ou erro
                    setLoading(false)
                }
            
        }
        Submit()

    }, [newResp, repositorios])


    const handleDelete = useCallback((repo)=>{
        const find = repositorios.filter(item => item.name !== repo)
        setRepositorios(find)
        localStorage.setItem('repos', JSON.stringify(repositorios))

    }, [repositorios])

    const hancleChangeState = (e)=>{
        setNewResp(e.target.value)
        setAlert(null)
    }

    return(
        <div>
            <Container>
                <h1>
                    <FaGithub size={25}/>
                    Meus Repositorios
                </h1>

                <Form onSubmit={handleSubmit} error={alert} >
                    <input type='text' placeholder='Nome do Repositorio' value={newResp} 
                    onChange={hancleChangeState} required/>

                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? (
                            <FaSpinner size={14} color='#fff' />

                        ) : (
                            <FaPlus size={14} color='#fff' />
                        )}
                        
                    </SubmitButton>
                </Form>

                <List>
                    {repositorios.map(repo =>(
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={()=> handleDelete(repo.name)} >
                                    <FaTrash size={14} color='#0D2636' />
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} color='0D2636' />
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        </div>
    )
}

// isso pq true === 1 e false ===0

// encodeURIComponent isso pq nossa url tem / ex: facebok/react ele entende que esta entrando em outra pagina__
// com isso não vai entender que uma pagina so