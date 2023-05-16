import { Link } from 'react-router-dom';

const HomePage: React.FunctionComponent = () => {
    return (
        <div className={styleClasses.container}>
            <Link to="./editor" reloadDocument>
                <button>Go to the editor</button>
            </Link>
        </div>
    );
};

const styleClasses = {
    container: 'flex justify-center items-center w-screen h-fit min-h-screen'
};

export default HomePage;
