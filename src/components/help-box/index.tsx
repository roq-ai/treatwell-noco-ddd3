import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Salon Owner'];
  const roles = ['Salon Owner', 'Stylist', 'Receptionist'];
  const applicationName = 'Treatwell NoCo';
  const tenantName = 'Salon';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Salon Owner:
1. As a salon owner, I want to be able to create an account for my salon so that I can manage my business using the SaaS application.
2. As a salon owner, I want to be able to add and edit information about my salon, such as name, address, and services offered, so that potential customers can find accurate information about my salon.
3. As a salon owner, I want to be able to invite stylists and receptionists to join the application so that they can manage their work and appointments.
4. As a salon owner, I want to be able to view and manage appointments for my salon so that I can ensure smooth operations and customer satisfaction.
5. As a salon owner, I want to be able to view and manage customer information, such as contact details and appointment history, so that I can provide personalized service and maintain customer relationships.

Stylist:
1. As a stylist, I want to be able to create an account and join a salon so that I can manage my work and appointments using the SaaS application.
2. As a stylist, I want to be able to view and manage my appointments so that I can plan my schedule and provide timely service to customers.
3. As a stylist, I want to be able to view customer information, such as contact details and appointment history, so that I can provide personalized service and maintain customer relationships.
4. As a stylist, I want to be able to update my availability and schedule so that the salon owner and receptionist can book appointments for me accordingly.

Receptionist:
1. As a receptionist, I want to be able to create an account and join a salon so that I can manage appointments and customer information using the SaaS application.
2. As a receptionist, I want to be able to view and manage appointments for the salon so that I can ensure smooth operations and customer satisfaction.
3. As a receptionist, I want to be able to view and manage customer information, such as contact details and appointment history, so that I can provide personalized service and maintain customer relationships.
4. As a receptionist, I want to be able to view stylists' availability and schedules so that I can book appointments for customers accordingly.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
