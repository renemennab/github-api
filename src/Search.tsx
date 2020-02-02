import React, { useState } from 'react'
import styled from 'styled-components'
import SearchIcon from './searchIcon'
import { useParams } from 'react-router-dom'
type serachPropTypes = {
    route: 'home' | 'results'
}
export default function Search(props: any) {
    const [SearchString, setSearchString] = useState('')
    const [RequestProfileResponse, setRequestProfileResponse] = useState({})
    const [RequestReposResponse, setRequestReposResponse] = useState({})

    function onSubmitForm(event: any) {
        event.preventDefault()
        try {
            Promise.all([
                fetch(`https://api.github.com/users/${SearchString}`),
                fetch(`https://api.github.com/users/${SearchString}/repos`)
            ]).then(([profile, repo]) => {
                setRequestProfileResponse(profile.json())
                setRequestReposResponse(repo.json())
            })
        } catch (err) {
            console.error(err)
        }
    }

    const currentPath = props.location.pathname.replace('/', '')

    console.warn(props)
    console.log(SearchString)

    return (
        <SearchStyles id="search" className={currentPath}>
            <div id="title">
                <strong>Github</strong> Search
            </div>
            <form onSubmit={event => onSubmitForm(event)}>
                <input
                    type="text"
                    id="searchText"
                    name="search"
                    value={SearchString}
                    onChange={event => setSearchString(event.target.value)}
                />

                <button id={'submitBtn'} type="submit">
                    <SearchIcon />
                </button>
            </form>
        </SearchStyles>
    )
}
const SearchStyles = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    #title {
        font-style: italic;
        font-weight: 200;
        font-size: 60px;
        margin-bottom: 10px;
        white-space: nowrap;
        strong {
            font-style: normal;
            font-family: Monaco;
            font-weight: 400;
        }
    }

    form {
        width: 80%;
        height: 50px;
        display: flex;
        justify-content: center;
        &.result {
            width: 100%;
        }
    }
    #searchText {
        width: 90%;
        border-radius: 2px;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.18);
        border: none;
    }
    #submitBtn {
        max-width: 100px;
        background: #ac53f2;
        width: 30%;
        height: inherit;
        border-radius: 2px;
        svg {
            width: 35px;
            path {
                fill: white;
                transform: scale(-1, 1) translateX(-100%);
            }
        }
    }
    &.result {
        flex-direction: row;

        form {
            width: 100%;
        }
        #title {
            font-size: 40px;
            margin-right: 70px;
        }
    }
    @media screen and (max-width: 600px) {
        &.result {
            flex-direction: column;
            #title {
                margin-right: 0px;

                font-size: 35px;
            }
        }

        svg {
            width: 25px;
        }
    }
`
