import { useEffect, useState } from "react"
import Tmdb from "./Tmdb"
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie/FeatureMovie";
import Header from "./components/Header/Header";

export default function App() {

  /*--Este useState tem como objetivo mostrar qual o filme esta em destaque! --*/
  const [featureData, setFeatureData] = useState([]);
  /*--Este useState tem como objetivo pegar a lista que foi criada no arquivo Tmdb.js --*/
  const [movieList, setMovieList] = useState([]);
  /*--Este useState tem como objetivo alterar o brackground do Header --*/
  const [blackHeader, setBlackHeader] = useState(true);


  useEffect(() =>{
      const loadAll = async () => {
      /*--Pegando a lista--*/
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      /*-- Pegando o filme em destaque--*/
      let originals = list.filter(i=>i.slug === 'originals');
      /*--Escolhendo aleatoriamente qual filme mostrar --*/
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      /*--Pegando a info do filme em destaque--*/
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
    window.removeEventListener('scroll', scrollListener);
    }
  },[]);
  

  return (
    <div className="bg-neutral-900 text-white font-roboto">

      <Header black={blackHeader}/>

      {featureData &&
        <FeatureMovie item={featureData}/>
      }
      <section className="-mt-36">
        {movieList.map((item, key)=>(
          
            <MovieRow key={key} title={item.title} items={item.items} />
          
        ))}
      </section>
      <footer className="my-0 mx-12 text-center">
        Feito com <span role="img" arial-label="coração">❤️</span> por  
        <a 
        className="ml-1 font-bold hover:opacity-50 transition-all ease-in duration-200"
        target="_blank"
        href="https://github.com/Drimzart">Kaio Murillo. </a> <br />
        Direitos de imagem para Netflix. <br />
        API - Themoviedb.org
      </footer>

       {movieList.length <= 0 &&
         <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
         <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading" />
       </div>   
       }   
     
    </div>
  )
}
