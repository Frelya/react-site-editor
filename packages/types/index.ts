export interface Component {
    caller: React.FunctionComponent,
    defaultProps: {
        [prop: string]: any;
    }
}
