import { twMerge } from "tailwind-merge";
import Typography from "@mui/material/Typography";

interface Props {
  isLoading: boolean;
  isError?: boolean;
}

const Loader = ({ isLoading, isError }: Props) => {
  const content = {
    errorText:
      "Something bad happened and we are working to fix it. Please wait for a while and try again. If problem is still persisting please contact our support.",
  };

  if (isError)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur bg-opacity-30 bg-red-200">
        <Typography variant="h5" align="center" className="w-3/4">
          {content.errorText}
        </Typography>
      </div>
    );

  return (
    <div
      className={twMerge(
        "absolute bg-white inset-0 z-50 transition flex items-center justify-center",
        isLoading ? "opacity-40" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="loader" />
    </div>
  );
};

export default Loader;
