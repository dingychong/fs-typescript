import type { CoursePart } from "../types";

const Content = (props: { parts: CoursePart }) => {
    switch (props.parts.kind) {
        case "basic":
            return (
                <div className="course-part">
                    <p>
                        <strong>{props.parts.name}</strong> {props.parts.exerciseCount}
                    </p>
                    <p>{props.parts.description}</p>
                </div>
            );
        case "group":
            return (
                <div className="course-part">
                    <p>
                        <strong>{props.parts.name} {props.parts.exerciseCount}</strong>
                    </p>
                    <p>project exercises {props.parts.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div className="course-part">
                    <p>
                        <strong>{props.parts.name}</strong> {props.parts.exerciseCount}
                    </p>
                    <p>{props.parts.description}</p>
                    <a href={props.parts.backgroundMaterial}>background material</a>
                </div>
            );
        case "special":
            return (
                <div className="course-part">
                    <p>
                        <strong>{props.parts.name}</strong> {props.parts.exerciseCount}
                    </p>
                    <p>{props.parts.description}</p>
                    <p>required skills: {props.parts.requirements.join(", ")}</p>
                </div>
            );  
        default:
            return null;
    };

};

export default Content;