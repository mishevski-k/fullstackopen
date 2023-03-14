import StatisticLine from "./StatisticLine";

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
                <StatisticLine text="Good" value={good} />
                <StatisticLine text="Neutral" value={neutral} />
                <StatisticLine text="Bad" value={bad} />
                <StatisticLine text="All" value={ratingCount} />
                <StatisticLine text="Avarage" value={avarage} />
                <StatisticLine text="Positive" value={positive} />
            </div>
        </section>
    )
}

export default Statistics;