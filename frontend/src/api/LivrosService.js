import axios from "axios";

// Em desenvolvimento: usa proxy do Vite (/api -> http://localhost:3000)
// Em produção: define a variável de ambiente VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api"

export class LivrosService{
    static getLivros(){
        return axios.get(BASE_URL+'/livros');
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/livros/${id}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/livros`,body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/livros/${id}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/livros/${id}`);
    }
    
}
