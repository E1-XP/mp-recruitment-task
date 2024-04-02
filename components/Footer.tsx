import { theme } from "@/styles/theme";
import { Typography } from "@mui/material";

const Footer = () => {
  const content = {
    copyrightText: `© ${new Date().getUTCFullYear()} Sebastian Stypuła`,
  };

  return (
    <div className="bg-secondary w-full flex justify-center items-center p-4">
      <Typography variant="body1" color={'white'}>
        {content.copyrightText}
      </Typography>
    </div>
  );
};

export default Footer;
