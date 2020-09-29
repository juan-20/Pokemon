import React from 'react';
import axios from 'axios';

import './App.css';

const style = {
  perfilContainer: {
    "display": "inline-block",
    "width": "20%",

    "background-color": "#212121",
    "color": "#fff"
  },
  perfilImagem: {
    "margin": "0 auto",
    "width": "100%",

    "background-color": "#0d7377",
    "border": "5px solid #212121"
  },
  "perfilTexto": { 
    "textAlign": "center" ,
  },
  "btn_box": {
    "display": "flex",
     "justify-content": "center",
  },
 "btn": {
   "background": "none",
    "display": "block",
    "margin": "20px auto",
    "text-align": "center",
    "border": "2px solid",
    "color": "#fff",
    "padding": "14px 40px"
 }
}


const Perfil = (props) => (

//  div de tudo
  <div style={style.perfilContainer}>

    {/* styles e declaração da imagem do pokemon */}
    <img style={style.perfilImagem}
      src={props.imagem}></img>

      {/* styles pro P do nome do pokemon */}
    <p style={ style.perfilTexto }>
      { props.nome }
    </p>

    {/* caixa dos botões */}
    <div style={style.btn_box}>
    <button style={style.btn} onClick={ () => props.deleta(props.index) }>💔</button>
    <button style={style.btn} onClick={ () => props.alteraNome(props.index) }>❤️</button>
    </div>


  </div>
);

// função
class App extends React.Component {
  constructor(props) {
    super(props);
    // declara o poke
    this.state = {
      
      pokes: []
    };
  
    this.atualizaDados();
  }

  // pega a data do json
  atualizaDados = async () => {
    const res = await axios.get("http://localhost:3333/pokes") 
    if(res.data) {
      this.setState({ pokes: res.data });
    }
  }

  // dá um like no seu pokemon preferido
  coracao = async (index) => {
    const poke = this.state.pokes[index];
    poke.nome += " - ❤️"; 
    await axios.put(`http://localhost:3333/pokes/${index}`, poke);
    this.atualizaDados()
  }

  // tentativa de tirar um coração que não deu certo, então adicionei o coração partido
  // deleta = async (index) => {
  //   const poke = this.state.pokes[index];
  //   poke.nome -= " - "; 
  //   await axios.delete(`http://localhost:3333/${index}`, poke);
  //   this.atualizaDados()
  // }

  // ele adiciona um coração partido
  deleta = async (index) => {
   const poke = this.state.pokes[index];
    poke.nome += " - 💔"; 
    await axios.put(`http://localhost:3333/pokes/${index}`, poke);
    this.atualizaDados()
  }

  render() {
    return (
      <div className="App">
      {
        // box que fica os coração
        this.state.pokes.map((poke, index) => 
           (<Perfil key={index} index={index} 
            alteraNome={ this.coracao }
            deleta={ this.deleta } {...poke} />) 
        )
      }
    </div>
    )
  }
}

export default App;
