import PreviewIframeStyle from './PreviewIframe.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    return (
        <div className={PreviewIframeStyle.container}>
            <iframe
                className={PreviewIframeStyle.iframe}
                src="http://localhost:5173/preview"></iframe>
        </div>
    );
};

export default PreviewIframe;
