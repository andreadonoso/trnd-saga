import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "@mui/material/styles";

const AccountPage = ({colorMode}) => {
    const theme = useTheme();
    return ( 
        <div>
            <IconButton onClick={colorMode} >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            Account Page
        </div>
     );
}
 
export default AccountPage;