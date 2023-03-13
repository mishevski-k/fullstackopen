import Part from "./Part";

const Content = (props) => {
    return(
        <div>
            {props.parts.map((item, index) => {
                return <Part key={index} name={item.name} exercises={item.exercises} />
            })}
        </div>
    );
}

export default Content;