import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { MittProvider } from '@/plugins/mitt/react-mitt';
import type { MittContextType } from '@/plugins/mitt/react-mitt';

declare global {
    interface Window {
        getEmitter: () => MittContextType;
    }
}

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
