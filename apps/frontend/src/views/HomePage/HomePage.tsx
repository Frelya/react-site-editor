import { Link } from 'react-router-dom';
import HomePageStyle from './HomePage.module.css';

const HomePage: React.FunctionComponent = () => {
    return (
        <div className={HomePageStyle.container}>
            <Link to="/editor" reloadDocument>
                <button>Go to the editor</button>
            </Link>
        </div>
    );
};

export default HomePage;
