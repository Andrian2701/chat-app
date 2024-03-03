import "@/styles/components/index.scss";

type FormButtonProps = {
  label: string;
};

const FormButton = ({ label }: FormButtonProps) => {
  return (
    <button type="submit" className="form-btn">
      {label}
    </button>
  );
};

export default FormButton;
