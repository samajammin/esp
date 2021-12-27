import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  height: string;
  width: string;
}

export const PlaceholderImage: FC<Props> = ({ height, width }) => {
  return (
    <Flex
      alignItems='center'
      alignSelf='center'
      justifyContent='center'
      backgroundColor='#e5e5e5'
      borderRadius='100%'
      h={height}
      w={width}
    >
      image here
    </Flex>
  );
};
