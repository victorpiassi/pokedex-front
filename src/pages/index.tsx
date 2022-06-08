import type { NextPage } from 'next'
import Image from "next/image"
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.sass'
import PokemonItem from './components/PokemonItem'

const Home: NextPage = () => {

  
  interface IPokemonData{
    name: string
    url: string
  }

  interface IPokemonsData{
    pokemonsList: IPokemonData[]
  }

  const [pokedexOnOff, setPokedexOnOff] = useState<Boolean>(false)
  const [pokemonsData, setPokemonsData] = useState<IPokemonsData | any>([])
  const [selectedPokemon, setSelectedPokemon] = useState<number>(1)
  const [pokemonDetails, setPokemonDetails] = useState<boolean>(false)
  // const [fade, setFade] = useState<any>(styles.fadeIn)

  async function getPokemonData(){

    const response =  await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")

    const pokemonsData = await response.json()

    setPokemonsData(pokemonsData.results)

  }

  const handleSelectPokemon = (pokemonNum : number) => {
    setSelectedPokemon(pokemonNum)
  }
  
  const handleSelectPrevPokemon = () => {
    if (selectedPokemon === 1 ){
      setSelectedPokemon(151)
    }
    else{
      setSelectedPokemon((selectedPokemon-1))
    }
  }

  const handleSelectNextPokemon = () => {
    if (selectedPokemon === 151 ){
      setSelectedPokemon(1)
    }
    else{
      setSelectedPokemon(selectedPokemon+1)
    }
  }
  
  const handleTurnOnOff = () => {
    setPokedexOnOff(!pokedexOnOff)
  }
  
  const handlePokemonDetails = async () => {
    setPokemonDetails(!pokemonDetails)
  }
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    getPokemonData()
  }, [])
  
  useEffect( () => {
    (document.querySelector(`div[tabindex="${selectedPokemon}"]`) as HTMLElement)?.focus()
  }, [selectedPokemon])

  
  return (
    <div className={styles.canvas}>
          <div className={styles.pokedex}>
              
              <div className={[styles.leftBlackPart, styles.blackPart].join(" ")}>
                  <div className={[styles.topWhiteButton, styles.whiteButton].join(" ")} onClick={handleSelectPrevPokemon}/>
                  <div className={[styles.bottomWhiteButton, styles.whiteButton].join(" ")} onClick={handleSelectNextPokemon}/>
                  <div className={styles.blueButton} onClick={handleTurnOnOff}/>
              </div>

              <div className={pokedexOnOff ? styles.screen : styles.screen + " " + styles.screenOff}>
                { pokedexOnOff &&
                  <>
                    <div className={styles.hidden + " " + styles.pokemonImage}>
                      <div className={styles.pokemonBackground}></div>
                      <img  width={200} height={200} alt="" src={
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon}.png`
                      }/>
                      <div className={styles.detailsButtons}>
                        <button onClick={handlePokemonDetails}>Details</button>
                      </div>
                        <div className={styles.pokemonDetails + " " + fade}>
                          <div>
                                asdasdss
                          </div>
                        </div>
                    </div>


                    <div className={styles.pokemonsList}>
                      {pokemonsData.map((pokemon : IPokemonData, i : number) => (
                            <PokemonItem 
                              key={i+1} pokemonName={pokemon.name} pokemonNum={i+1}
                              active={!!(selectedPokemon === i+1)} tabIndex={i+1}
                              onClick={() => handleSelectPokemon(i+1)}
                            />
                      ))}

                    </div>

                  </>
                }
              </div>
              
              <div className={[styles.rightBlackPart, styles.blackPart].join(" ")}>
                  <div className={[styles.topGreenButton, styles.greenButton].join(" ")}/>
                  <div className={[styles.bottomGreenButton, styles.greenButton].join(" ")}/>
              </div>

          </div>
      </div>
  )
}

export default Home
