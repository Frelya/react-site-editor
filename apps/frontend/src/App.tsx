import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function App() {
    return (
        <div>
            <Outlet />
            <Tooltip anchorSelect={'.icon'} />
        </div>
    );
}

export default App;
