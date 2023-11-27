import { Box, Container, Link, Typography } from '@mui/material';

const links = [
  {
    label: 'SpiderWorks.in',
    href: 'https://spiderworks.in/'
  }
];

export const Footer = () => {

  const CurrentDate = new Date().getFullYear()

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: {
            sm: 'row',
            xs: 'column'
          },
          py: 3,
          '& a': {
            mt: {
              sm: 0,
              xs: 1
            },
            '&:not(:last-child)': {
              mr: {
                sm: 5,
                xs: 0
              }
            }
          }
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          © {`${CurrentDate}`} SpiderWorks
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {links.map((link) => (
          <Link
            color="textSecondary"
            href={link.href}
            key={link.label}
            target="_blank"
            underline="none"
            variant="body2"
          >
            {link.label}
          </Link>
        ))}
      </Container>
    </div>
  );
} 