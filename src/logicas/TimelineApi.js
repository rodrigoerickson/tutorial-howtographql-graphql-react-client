import {listagem, comentario, like, notifica} from '../actions/actionCreator'

export default class TimelineApi {

    static lista(urlPerfil) {
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                });
        }
    }

    static comenta(fotoId, textoComentario) {
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ texto: textoComentario }),
                    headers: new Headers({
                        'Content-type': 'application/json'
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('não foi possível comentar')
                    }
                }).then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario))
                    return novoComentario;
                })
        }

    }

    static like(fotoId) {

        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
                { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Não foi possível faze o like da foto")
                    }
                })
                .then(liker => {
                    dispatch(like(fotoId, liker))
                    return liker;
                })
        }

    }

    static pesquisa (login){
        return dispatch => {
            fetch(`http://localhost:8080/api/public/fotos/${login}`)
                .then(response => response.json())
                .then(fotos => {
                    if(fotos.length === 0){
                        dispatch(notifica('usuário não encontrado'))
                    }else{
                        dispatch(notifica('usuário encontrado'))    
                    }
                    dispatch(listagem(fotos))
                    return fotos;
            });
        }
    }

}