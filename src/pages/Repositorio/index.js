import React, {useState, useEffect} from "react";
import api from "../../services/api";

import {Container, Owener, ButtonLink, LoadingDiv, IssuesList, ButtonsPagination} from './styles'
import {FaArrowLeft, FaSpinner} from 'react-icons/fa'


export default function Repositorio ({match}){
// esse match ele receber o path do link que /repositorio/:repositorio
// ele tem um parametro chamando params que e oq foi recebindo no /:repositorio
// para pegar e so passar match.params.nomeDoID
    const [repositorio, setRepositorio] = useState({})
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [state, setState] = useState('open')

    useEffect(()=>{
        const load = async () =>{
            const nomeRepo = decodeURIComponent(match.params.repositorio)

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        per_page:5,
                        state: 'open'
                    }
                })
            ])
            // 1° e a primeira promise ...
            setRepositorio(repositorioData.data)
            console.log(issuesData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }

        load()
    },[match.params.repositorio])

    useEffect(()=>{
        const load =  async () =>{
            const nomeRepo = decodeURIComponent(match.params.repositorio)
            const res = await api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        per_page:5,
                        state: state,
                        page
                    }
                })
                setIssues(res.data)

        }
        load()
    }, [page, match.params.repositorio, state])

    const handlePagination = (action) =>{
        setPage(action === 'next' ? page + 1 : page - 1)
        console.log(page)
    }

    const handleStateGit = (e)=>{
        console.log(e.target.value)
        setState(e.target.value)
    }


    if(loading){
        return(
            <LoadingDiv>
                <FaSpinner color='#fff' size={100} />
            </LoadingDiv>
        )
    }


    return(
        <Container >
            <ButtonLink to='/'>
                    <FaArrowLeft color='000' size={24}/>
            </ButtonLink>
            <Owener>
                <img src={repositorio.owner.avatar_url} />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owener>

            <IssuesList>

                <select onChange={handleStateGit} >
                    <option>open</option>
                    <option>all</option>
                    <option>closed</option>
                </select>

                {issues.map(item=>(
                    <li key={String(item.id)} >
                        <img src={item.user.avatar_url} />

                        <div>
                            <strong>
                                <a target='_blank' href={item.html_url}>{item.title}</a>
                            </strong>

                            <p>{item.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <ButtonsPagination>
                    <button onClick={()=>handlePagination('back')}
                        disabled={page<2}
                    >Anterio</button>
                    <button onClick={()=>handlePagination('next')}>Proximo</button>

            </ButtonsPagination>
        </Container>
    )
}
// decodeURIComponent -> e para tirar os %$ que vem quando usar o encodeURIComponent__
// pq ele vem com isso para saber que e uma parametro 