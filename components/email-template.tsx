import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ShieldUser } from "lucide-react";

interface VercelInviteUserEmailProps {
  name?: string;
  userImage?: string;
  email?: string;
  verificationLink?: string;
}

export const VerificationEmail = ({
  name,
  email,
  verificationLink,
}: VercelInviteUserEmailProps) => {

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <ShieldUser size={30} className="mx-auto" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-primary">
              <strong>Better Auth Next TS</strong>
            </Heading>
            <Text className="text-[14px] text-primary leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-[14px] text-primary leading-[24px]">
              <strong>{name}</strong> (
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
              ) Verfication your email address
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded-lg bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={verificationLink}
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-[14px] text-primary leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={verificationLink} className="text-blue-600 no-underline">
                {verificationLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
