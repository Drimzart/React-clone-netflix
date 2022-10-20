import React, { useState } from "react"
import "../index.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/*Componente responsavel pela lista de filmes */

export default ({title, items}) => {
  /*-- Funçoes para criação do carrossel --*/
  const [scrollX, setScrollX] = useState(-400)
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
        x = 0;
    }
    setScrollX(x);
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) -60;
    }
    setScrollX(x);

    
  }
  return (
    <div className="mb-8">
      <h2 className="ml-8 font-roboto font-bold text-3xl">
        {title}
      </h2>
      <div 
        className="absolute w-10 h-60 mt-3 pl-3 left-0 z-40 flex items-center justify-center overflow-hidden bg-black/60 cursor-pointer "
        onClick={handleLeftArrow}
      >
        <ArrowBackIosIcon       
          style={{fontSize: 50}}
        />
      </div>
      <div
        className="absolute w-10 h-60 mt-3 right-0 z-40 flex items-center  justify-center overflow-hidden bg-black/60 cursor-pointer "
        onClick={handleRightArrow}
      >
        <ArrowForwardIosIcon 
          style={{fontSize: 50}} 
        />
      </div>
      <div 
        className="overflow-x-hidden pl-8"
      >
        <div 
          className="cursor-pointer transition-all ease-in duration-500"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 176
          }}
        >
          {items.results.length > 0 && items.results.map((item, key)=> (
          <div 
          key={key} 
          className="inline-block w-44"
          >
            <img 
              className="w-auto scale-90 hover:scale-100 transition-all duration-200 ease-in"
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
          </div>
          ))}
        </div>
       </div>
    </div>
  )
}