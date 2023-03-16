const Notification = ({type, message}) => {
    if(message === null){
        return null;
    }

    return(
        <div className={"notification-container type-" + type}>
            {message}
        </div>
    )
}

export default Notification;