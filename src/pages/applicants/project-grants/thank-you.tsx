import { Box, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PlaceholderImage, ThankYouBody } from '../../../components/UI';

const ProjectGrantsThankYou: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Thank you for applying to Project Grants</title>
        <meta name='description' content='Thank you for applying to Project Grants' />
        <meta name='robots' content='noindex' />
      </Head>

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <ThankYouBody grantType='Project Grants' />

        <Center>
          <PlaceholderImage height='250px' width='360px' />
        </Center>
      </Box>
    </>
  );
};

export default ProjectGrantsThankYou;
