import PreviewStyle from './Preview.module.css';

const Preview: React.FunctionComponent = () => {
    return (
        <div className={`${PreviewStyle.preview}`}>
            <iframe
                width="80%"
                height="100%"
                src="http://localhost:5173/preview"></iframe>
        </div>
    );
};

export default Preview;
