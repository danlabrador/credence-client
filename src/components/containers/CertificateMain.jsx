import { useState, useEffect } from 'react';
import { Box, Typography, Divider, Paper, Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import icon from '../../assets/icon.svg'
import upliftLogo from '../../assets/uplift-logo.png';
import useDataUser from '../../hooks/useDataUser';
import { formatDate } from '../../utils/date-formatter';

const CertificateMain = ({ certId }) => {
  const [certificationData, setCertificationData] = useState(null);
  const [name, setName] = useState('');
  const [certificateName, setCertificateName] = useState('');
  const [certificateDesc, setCertificateDesc] = useState('');
  const [skills, setSkills] = useState([]);
  const [certificateCriteria, setCertificateCriteria] = useState([]);
  const [issuedAt, setIssuedAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [grade, setGrade] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const theme = useTheme();
  const { handleGetCertification } = useDataUser();

  const loadAllData = async () => {
    const certification = await handleGetCertification(certId);
    setCertificationData(certification);
    if (certification && certification.data) {
      const { certificate, user, issuedAt, expiredAt, grade } = certification.data;
      setName(certificate.name);
      setCertificateName(certificate.name);
      setCertificateDesc(certificate.description);
      setSkills(certificate.skills);
      setCertificateCriteria(certificate.criteria);
      setIssuedAt(issuedAt);
      setExpiredAt(expiredAt);
      setGrade(grade);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setProfilePic(user.profilePic);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [certId]);

  return (
    <Box
      sx={{
        width: '50vw',
        marginTop: 5,
        marginRight: 2,
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 2,
      }}
    >
      {certificationData ? (
        <>
          <Typography variant="h3" sx={{ color: theme.palette.texts.main, mb: 2 }}>{certificateName}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar alt="Org Avatar" src={upliftLogo} sx={{ mr: 2 }} />
            <Typography variant="body1" sx={{ color: theme.palette.texts.main }}>Issued by Uplift Code Camp</Typography>
          </Box>
          <Paper
            elevation={2}
            sx={{
              padding: 2,
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 3 }}>
              <img
                src={profilePic.path || `https://ui-avatars.com/api/?background=4208de&color=fff&name=${user.firstName && user.lastName ? `${user.firstName}+${user.lastName}` : user.email}`}
                style={{ width: 'auto', height: '100px', borderRadius: '50%' }}
                alt="Logo"
              />
              <Box>
                <Typography variant="h5" sx={{ color: theme.palette.texts.main, fontWeight: 'bold' }}>
                  {`Issued to ${firstName} ${lastName}`}
                </Typography>
                {expiredAt && <Typography variant="body1" sx={{ color: theme.palette.texts.main }}>
                  {`Expires on ${formatDate(expiredAt)}`}
                </Typography>}
                <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>
                  {formatDate(issuedAt)}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>
                  {`Grade Achieved: ${grade}%`}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.texts.main, marginTop: '1rem' }}>
                  {`${firstName}'s account is verified. Credence awards ${certificateName} certification.`}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Typography variant="body1" sx={{ color: theme.palette.texts.main, mb: 2 }}>
            {certificateDesc}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: theme.palette.texts.main, mb: 1 }}>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {skills?.map(skill => (
              <Chip key={skill} label={skill} />
            ))}
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: theme.palette.texts.main, mb: 1 }}>
            Earning Criteria:
            {certificateCriteria?.map((criteria, index) => (
              <Typography key={index} variant="body1" sx={{ color: theme.palette.texts.main }}>
                {`${index + 1}. ${criteria}`}
              </Typography>
            ))}
          </Typography>
        </>
      ) : (
        <Typography variant="h3" sx={{ color: theme.palette.texts.main, mb: 2 }}>
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default CertificateMain;
