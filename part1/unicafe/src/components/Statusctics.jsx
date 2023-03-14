const Statistics = ({good, neutral, bad, ratingCount, avarage, positive}) => {

    if(ratingCount === 0){
        return(
            <section>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </section>
        )
    }

    return(
        <section>
            <h1>Statistics</h1>
            <div>
                <p>Good { good }</p>
                <p>Neutral { neutral }</p>
                <p>Bad { bad }</p>
                <p>all { ratingCount }</p>
                <p>avarage { avarage }</p>
                <p>positive { positive } %</p>
            </div>
        </section>
    )
}

export default Statistics;