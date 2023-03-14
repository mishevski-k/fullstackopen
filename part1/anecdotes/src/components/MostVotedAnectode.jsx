import Anecdote from "./Anecdote"

const MostVotedAnecdote = ( { anectode, totalVotes } ) => {
    if(totalVotes <= 0){
        return(
            <div>
                <h1>Anecdote with most votes</h1>
                <p>There are no votes yes, check again later</p>
            </div>
        )
    }

    return(
        <div>
            <h1>Anecdote with most votes</h1>
            <Anecdote content={anectode.content} votes={anectode.votes} />
        </div>
    )
}

export default MostVotedAnecdote;