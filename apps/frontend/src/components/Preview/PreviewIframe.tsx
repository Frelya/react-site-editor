const PreviewIframe: React.FunctionComponent = () => {
    return (
        <div className={styleClasses.container}>
            <iframe className={styleClasses.iframe} src="/preview"></iframe>
        </div>
    );
};

const styleClasses = {
    container: 'flex flex-1 justify-center items-center h-screen bg-slate-500',
    iframe: 'aspect-video w-11/12'
};

export default PreviewIframe;
