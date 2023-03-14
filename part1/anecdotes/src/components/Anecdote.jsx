const Anecdote = ( { content, votes} ) => {
    return(
        <div>
            <p>{ content }</p>
            <p>has { votes } votes</p>
        </div>
    )
}

export default Anecdote;