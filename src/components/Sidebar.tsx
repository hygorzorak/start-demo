import { Box, Drawer, List, ListItem, css, styled } from '@mui/material'
import { CustomLink } from './CustomLink'

const StyledCustomLink = styled(CustomLink)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};
    text-decoration: none;
    width: 100%;
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
    display: block;
    font-weight: 400;
    background: transparent;
    border-left: 4px solid transparent;
    transition: background 0.2s, font-weight 0.2s;
    
    &:hover {
      background-color: ${theme.palette.action.hover};
    }
  `,
)

const DRAWER_WIDTH = 240

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#f5f5f5', // light gray
          minHeight: '100vh',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', pt: 0 }}>
        <List disablePadding>
          <ListItem disablePadding>
            <StyledCustomLink
              to="/"
              activeProps={{
                style: {
                  background: '#e3f0fc',
                  fontWeight: 700,
                  borderLeft: '4px solid #1976d2',
                },
              }}
              inactiveProps={{
                style: {
                  background: 'transparent',
                  fontWeight: 400,
                  borderLeft: '4px solid transparent',
                },
              }}
            >
              Give consent
            </StyledCustomLink>
          </ListItem>
          <ListItem disablePadding>
            <StyledCustomLink
              to="/collected-consents"
              activeProps={{
                style: {
                  background: '#e3f0fc',
                  fontWeight: 700,
                  borderLeft: '4px solid #1976d2',
                },
              }}
              inactiveProps={{
                style: {
                  background: 'transparent',
                  fontWeight: 400,
                  borderLeft: '4px solid transparent',
                },
              }}
            >
              Collected consents
            </StyledCustomLink>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
