import '../style/token.css';

function Token(props) {

    return (
        <div id="token">
            <p>{props.contract}</p>
        </div>
    );
}

export default Token;