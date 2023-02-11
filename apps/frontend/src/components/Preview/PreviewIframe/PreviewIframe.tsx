import PreviewIframeStyle from './PreviewIframe.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    return (
        <div className={`${PreviewIframeStyle.preview}`}>
            <iframe
                width="80%"
                height="100%"
                src="http://localhost:5173/preview"></iframe>
        </div>
    );
};

export default PreviewIframe;
