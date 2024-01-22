const ErrorPreview = ({ error, isFontBig = false }: { error: string; isFontBig?: boolean }) => {
  return <span className={`text-red-500 ${isFontBig ? "font-bold text-2xl" : ""}`}>{error}</span>;
};

export default ErrorPreview;
