import SideBarStyle from './SideBar.module.css';

type SideBarScale = '1' | '2';

interface SideBarProps {
    scale: SideBarScale;
    children?: React.ReactNode | React.ReactNode[];
}

const SideBar: React.FunctionComponent<SideBarProps> = (props) => {
    return (
        <div
            className={`${SideBarStyle.container} ${
                SideBarStyle[`scale${props.scale}`]
            }`}>
            {props.children}
        </div>
    );
};

export default SideBar;
