export interface PromoFormValues {
  code: string;
}

export interface PromoFormProps {
  onSubmit?: (values: PromoFormValues) => void;
}
