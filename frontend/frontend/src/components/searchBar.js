import { InputBase, styled, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 5,
    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main, 0.07),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'primary',
    '& .MuiInputBase-input': {
      fontSize:"medium",
      fontWeight:"300",
      padding: theme.spacing(1, 1, .7, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create('width'),
      width: '100',
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
    },
}));

const SearchBar = () => {
    const theme = useTheme();
    return ( 
        <Search theme={theme}> 
              <SearchIconWrapper >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.25" stroke={theme.palette.text.primary} fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              </SearchIconWrapper>
              <StyledInputBase
              theme={theme}
              fullWidth="true"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              />
        </Search>
     );
}
 
export default SearchBar;