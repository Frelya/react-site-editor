import PreviewIframeStyle from './PreviewIframe.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    return (
        <div className={PreviewIframeStyle.container}>
            <iframe className={PreviewIframeStyle.iframe} src="/preview"></iframe>
        </div>
    );
};

export default PreviewIframe;
