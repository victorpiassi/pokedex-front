import pokeballIcon from "../../public/pkb_icon.svg"
import styles from "../../styles/PokemonItem.module.sass"
import Image from "next/image"

interface IPokemonItemProps{
    pokemonNum: number
    pokemonName: string
    active: boolean
    tabIndex: number
    onClick: () => void
}

const PokemonItem = (props :  IPokemonItemProps) => {
    const handlePokemonNum = (pokemonNum : number) => {
        let formattedPokemonNum = "No. "+ pokemonNum

        if (pokemonNum < 100 && pokemonNum >= 10){
            formattedPokemonNum = "No. 0"+pokemonNum
        }
        else if(pokemonNum < 10){
            formattedPokemonNum = "No. 00"+pokemonNum
        }

        return formattedPokemonNum
    }
    return(
        <div onClick={props.onClick} tabIndex={props.tabIndex} className={props.active ? styles.container + " " + styles.containerActive : styles.container}>
            <Image src={pokeballIcon.src} alt="" width={20} height={20}/>
            <div className={styles.itemText}>
                <span>
                    {handlePokemonNum(props.pokemonNum)} 
                </span>
                <span id={props.active ? styles.pokemonName : ""}>
                    {props.pokemonName}
                </span>
            </div>
        </div>
    )
}

export default PokemonItem