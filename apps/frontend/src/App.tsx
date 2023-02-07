import { Button } from '@react-site-editor/ui';

function App() {
    return (
        <div>
            <Button
                text="Click me"
                onClick={() => alert('Button was clicked!')}
                style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px'
                }}
            />
        </div>
    );
}

export default App;
