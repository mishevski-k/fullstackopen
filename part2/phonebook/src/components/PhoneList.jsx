import PhoneLine from "./PhoneLine";

const PhoneList = ( { list } ) => {
    return(
        <section>
            {list.map((entry) => <PhoneLine key={entry.id} name={entry.name} number={entry.number} />)}
        </section>
    )
}

export default PhoneList;