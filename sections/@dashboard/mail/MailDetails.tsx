// next
import { useRouter } from 'next/router';
//
import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '@/_global/redux/store';
import { getMail } from '@/_global/redux/slices/mail';
//
import Markdown from '@/_global/components/Markdown';
import Scrollbar from '@/_global/components/Scrollbar';
//
import MailDetailsToolbar from './MailDetailsToolbar';
import MailDetailsReplyInput from './MailDetailsReplyInput';
import MailDetailsAttachments from './MailDetailsAttachments';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function MailDetails() {
  const { query } = useRouter();

  const { mailId = '' } = query;

  const dispatch = useDispatch();

  const mail = useSelector((state: RootState) => state.mail.mails.byId[`${mailId}`]);

  const isAttached = mail && mail.files.length > 0;

  useEffect(() => {
    dispatch(getMail(`${mailId}`));
  }, [dispatch, mailId]);

  if (!mail) {
    return null;
  }

  return (
    <RootStyle>
      <MailDetailsToolbar mail={mail} />

      <Divider />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {mail.subject}
          </Typography>
          <MarkdownWrapperStyle>
            <Markdown children={mail.message} />
          </MarkdownWrapperStyle>
        </Box>
      </Scrollbar>

      {isAttached && <MailDetailsAttachments mail={mail} />}

      <Divider />

      <MailDetailsReplyInput />
    </RootStyle>
  );
}
