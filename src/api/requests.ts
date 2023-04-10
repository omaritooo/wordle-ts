import axios from 'axios'

export const getWords = () => {
    return axios.get('https://api.frontendexpert.io/api/fe/wordle-words')
}