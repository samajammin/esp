import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageMetadata, ThankYouBody } from '../../../components/UI';

const CommunityEventsThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Thank you'
        description='Thank you for applying to Community Events grants.'
      />
      <Head>
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 20, lg: 24, xl: 72 }}>
        <ThankYouBody grantType='Community Events' />
      </Box>
    </>
  );
};

export default CommunityEventsThankYou;
