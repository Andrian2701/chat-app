import "@/styles/components/index.scss";

type AppButtonProps = {
  className: string;
  label: string;
  onClick?: () => void;
};

export const AppButton = ({ className, label, onClick }: AppButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};
