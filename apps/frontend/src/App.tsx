import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { MittProvider } from '@components/Providers';

function App() {
    return (
        <MittProvider>
            <Outlet />
            <Tooltip anchorSelect={'.icon'} />
        </MittProvider>
    );
}

export default App;
