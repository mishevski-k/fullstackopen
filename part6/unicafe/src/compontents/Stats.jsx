import StatisticLine from "./StatisticLine";

const Statistics = ({stats}) => {
    const ratingCount = Object.values(stats).reduce((a, b) => a + b, 0);
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
            <table>
                <tbody>
                    <StatisticLine text="Good" value={stats.good} />
                    <StatisticLine text="Neutral" value={stats.ok} />
                    <StatisticLine text="Bad" value={stats.bad} />
                </tbody>
            </table>
        </section>
    )
}

export default Statistics;