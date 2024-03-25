import "@/styles/components/index.scss";

type Props = {
  label: string;
  onClick?: () => void;
};

export const AppButton = ({ label, onClick }: Props) => {
  return (
    <button type="submit" className="app-btn" onClick={onClick}>
      {label}
    </button>
  );
};
