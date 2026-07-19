interface totalProps {
    total: number;
}
const Total = (props: totalProps) => {
    return (
        <div>
            <p>Number of exercises is {props.total}</p>
        </div>
    );
};

export default Total;