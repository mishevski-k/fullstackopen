const RatingButton = ({handleCLick, text}) => {
    return(
        <button onClick={handleCLick}>{text}</button>
    )
}

export default RatingButton;