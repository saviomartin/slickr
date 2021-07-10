import { Button } from "@material-ui/core";

const Btn = ({ children, className, onClick }) => {
  return (
    <Button
      className={`cursor-pointer ${className} overflow-hidden !rounded-none !lowercase !p-0 !m-0 !min-w-0 !min-h-0`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default Btn;
