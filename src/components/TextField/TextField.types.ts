export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
}
