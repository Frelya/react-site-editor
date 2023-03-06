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
        <div>
            <MittProvider>
                <Outlet />
                <Tooltip anchorSelect={'.icon'} />
            </MittProvider>
        </div>
    );
}

export default App;
