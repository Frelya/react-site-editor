import { emitter, MittContext } from '@contexts/mitt';

const MittProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <MittContext.Provider value={emitter}>{children}</MittContext.Provider>;
};

export default MittProvider;
