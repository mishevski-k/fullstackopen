import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const Course = ({course}) => {
    return(
        <>
            <Header title={ course.name } />
            <Content parts={ course.parts } />
            <Total parts={ course.parts } />
        </>
    );
}

export default Course;