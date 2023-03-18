import PhoneLine from "./PhoneLine";

const PhoneList = ( { list, handleDelete } ) => {
    return(
        <section>
            {list.map((entry) => <PhoneLine key={entry.id} name={entry.name} number={entry.number} id={entry.id} handleDelete={handleDelete} />)}
        </section>
    )
}

export default PhoneList;