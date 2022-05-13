import * as axios from 'axios';

const baseURL = 'https://sas.front.kreosoft.space/api/';
const instance = axios.create({
    baseURL : baseURL
});

function getNews()
{
    return instance.get('News')
    .then(response => {
        if (response.status === 200)
        {
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error)
    });
}

export const newsApi = {
    getNews : getNews
}