import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import MittProvider from '@/components/Decorators/MittProvider';
import type { MittContextType } from '@/components/Decorators/MittProvider';

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
