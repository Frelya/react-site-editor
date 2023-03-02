import Droppable from '@/components/Decorators/Droppable';
import PreviewIframeStyle from './PreviewIframe.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    return (
        <div className={PreviewIframeStyle.container}>
            {/* <Droppable
                type="component"
                onDrop={() => console.log('dede')}
                onDragEnter={() => console.log('dede')}
                onDragLeave={() => console.log('dede')}> */}
            <iframe className={PreviewIframeStyle.iframe} src="/preview"></iframe>
            {/* </Droppable> */}
        </div>
    );
};

export default PreviewIframe;
