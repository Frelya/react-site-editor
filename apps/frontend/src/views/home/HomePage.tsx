import { Fragment } from 'react';
import { Button, Link } from '@nextui-org/react';
import NavBar from '@components/NavBar';
import { Icon } from '@components/Decorators';

const HomePage: React.FunctionComponent = () => {
    return (
        <Fragment>
            <NavBar />
            <main className={styleClasses.container}>
                <Button
                    as={Link}
                    color="primary"
                    href="./editor"
                    reloadDocument
                    endContent={<Icon name={'arrow-small-up'} className="rotate-90" />}
                >
                    Go to the editor
                </Button>
            </main>
        </Fragment>
    );
};

const styleClasses = {
    container: 'flex flex-col items-center justify-center w-screen h-screen'
};

export default HomePage;
