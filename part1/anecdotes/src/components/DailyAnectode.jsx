import Anecdote from "./Anecdote"

const DailyAnectode = ( {anecdote} ) => {
    return(
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote content={anecdote.content} votes={anecdote.votes} />
        </div>
    )
}

export default DailyAnectode;