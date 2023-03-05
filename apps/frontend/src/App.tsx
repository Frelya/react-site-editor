import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { MittProvider } from '@/plugins/mitt/react-mitt';

function App() {
    return (
        <div>
            <Outlet />
            <Tooltip anchorSelect={'.icon'} />
        </div>
    );
}

export default App;
