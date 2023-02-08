import SideBarHeaderStyle from './SideBarHeader.module.css';

const SideBarHeader: React.FunctionComponent<React.PropsWithChildren> = (props) => {
    return (
        <div className={SideBarHeaderStyle.container}>
            {props.children}
        </div>
    )
};

export default SideBarHeader;
