import React, { Component } from 'react';
import {Link} from 'react-router';

class FotoAtualizacoes extends Component {

  
    like (event){
      event.preventDefault();
      this.props.like(this.props.foto.id);
    }

    comenta(event){
      event.preventDefault();
      this.props.comenta(this.props.foto.id, this.comentario.value);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} href="#" className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo': 'fotoAtualizacoes-like'}>Likar</a>
              {/* <a onClick={this.like.bind(this)} href="#" >Likar</a> */}
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

class FotoInfo extends Component {

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                {
                  this.props.foto.likers.map(liker => {
                    return <Link key={liker.login} to={`/timleline/${liker.login}`}>{liker.login},</Link>
                  })
                }
                
                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.foto.comentario}  
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.props.foto.comentarios.map(comentario => {
                    return (
                      <li className="comentario">
                        <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                        {comentario.texto}  
                      </li>
                    )
                  })
                }
                
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                {/* <img src={this.props.foto.urlPerfil} alt="foto do usuario"/> */}
                <img src={'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg'} alt="foto do usuario"/>
                
                <figcaption className="foto-usuario">
                <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}

export default class FotoItem extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader foto={this.props.foto}/>
            {/* <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} /> */}
            <img alt="foto" className="foto-src" src={'https://steamuserimages-a.akamaihd.net/ugc/932679319376932731/F20D56D2CA003C4254372DD33BD47171E2F12FB6/'} />            
            <FotoInfo foto={this.props.foto} />
            <FotoAtualizacoes {...this.props} />
          </div>            
        );
    }
}