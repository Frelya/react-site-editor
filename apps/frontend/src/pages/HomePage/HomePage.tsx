import { Button } from '@react-site-editor/ui';

const HomePage: React.FunctionComponent = () => {
    return (
        <div className="Home">
            {
                Button.caller({
                    text:"Click me",
                    onClick: () => alert('Button was clicked!'),
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '10px 20px'
                    }
                })
            }
        </div>
    )
};

export default HomePage;
