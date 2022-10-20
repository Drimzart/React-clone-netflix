import React from "react";
import "./FeatureMovie.css"


export default ({item}) => {
  /*--Funçao para formatar o tamanho do overview--*/
  let description = item.overview;
  if (description?.length > 200) {
        description = description.substring(0, 200)+'...';
  };
  /*-- Função para pegar apenas o ano da série --*/
  let firstDate = new Date(item.first_air_date);
  /*--Função para pegar os generos da série--*/
  let genres = [];
  for(let i in item.genres) {
    genres.push(item.genres[i].name);
  }
  return (
    <section 
      className="h-screen"
      style={{
        backgroundSize: 'cover',
        backgroudPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }}
    >
      <div className="feature--vertical">
        <div className="feature--horizontal flex flex-col justify-center pl-8 pb-36 pt-16">
          <h1 className="text-6xl font-bold">{item.original_name}</h1>
          <div className="text-lg font-bold mt-4">
             <div className="inline-block mr-4 text-green-500">
              {item.vote_average} pontos
              </div>
             <div className="inline-block mr-4">
              {firstDate.getFullYear()}
              </div>
             <div className="inline-block ">
              {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? "s" : ""}
              </div>
          </div>
          <div className="mt-4 text-xl text-gray-500 w-2/5">{description}</div>
          <div className="mt-4">
            <a
              className="inline-block text-xl font-bold py-3 px-6 mr-2 rounded bg-white text-black hover:opacity-70 transition-all duration-200 ease-in" 
              href={`/watch/${item.id}`}>
               ► Assistir
            </a>
            <a 
              className="inline-block text-xl font-bold py-3 px-6 mr-2 rounded bg-gray-500 text-white hover:opacity-70 transition-all duration-200 ease-in" 
              href={`/list/add/${item.id}`}>
               + Minha Lista
              </a>
          </div>
          <div className="mt-4 text-lg text-gray-200">
            <strong>Gêneros:</strong>
            {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );

}