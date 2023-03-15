import PhoneLine from "./PhoneLine";

const PhoneList = ( { list } ) => {
    return(
        <section>
            {list.map((entry) => <PhoneLine key={entry.id} name={entry.name} />)}
        </section>
    )
}

export default PhoneList;