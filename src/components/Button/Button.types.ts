export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}
