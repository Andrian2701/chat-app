import "@/styles/components/index.scss";

type Props = {
  label: string;
};

export const FormButton = ({ label }: Props) => {
  return (
    <button type="submit" className="form-btn">
      {label}
    </button>
  );
};
