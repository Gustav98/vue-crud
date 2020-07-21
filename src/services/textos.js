import { http } from './config'

export default {
    listar: () => {
        let consultaDados = http.get('posts').then(result => {
            return result.data;
        });
        return consultaDados;
    },

    adicionar: (texto) => {
        return http.post('/posts', texto)
    }

}