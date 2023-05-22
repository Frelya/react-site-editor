export interface ButtonProps {
    text: string;
    textColor: string;
    fontSize: number;
    backgroundColor: string;
    onClick: (event?: React.SyntheticEvent) => void;
}
