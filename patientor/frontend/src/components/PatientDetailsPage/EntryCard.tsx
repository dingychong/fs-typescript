import { Box, Paper } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const entryIcons = {
  HealthCheck: <MedicalServicesIcon fontSize="small" />,
  OccupationalHealthcare: <WorkIcon fontSize="small" />,
  Hospital: <LocalHospitalIcon fontSize="small" />,
};

type EntryCardProps = {
  entry: any;
  children: React.ReactNode;
};

const EntryCard = ({ entry, children }: EntryCardProps) => (
  <Paper
    elevation={0}
    sx={{
      position: 'relative',
      p: 2,
      my: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: '#fff',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        left: 12,
        width: 32,
        height: 32,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {entryIcons[entry.type as keyof typeof entryIcons] ?? <MedicalServicesIcon fontSize="small" />}
    </Box>

    <Box sx={{ pl: 5 }}>{children}</Box>
  </Paper>
);

export default EntryCard;