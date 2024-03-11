import "@/styles/components/index.scss";

type AppButtonProps = {
  label: string;
  onClick?: () => void;
};

export const AppButton = ({ label, onClick }: AppButtonProps) => {
  return (
    <button type="submit" className="app-btn" onClick={onClick}>
      {label}
    </button>
  );
};