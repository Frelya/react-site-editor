import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { MittProvider } from '@components/Decorators';

function App() {
    return (
        <MittProvider>
            <div>
                <Outlet />
                <Tooltip anchorSelect={'.icon'} />
            </div>
        </MittProvider>
    );
}

export default App;
