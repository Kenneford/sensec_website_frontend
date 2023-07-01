import React from "react";
import {
  Html,
  Container,
  Head,
  Tailwind,
  Heading,
  Preview,
  Body,
  Text,
  Section,
  Button,
  Link,
  Img,
  Hr,
} from "@react-email/components";

export default function EmailTemplate({ client, subject, clientEmail }) {
  return (
    <Html
      style={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
        paddingTop: "7rem",
      }}
    >
      <Head />
      <Preview>Senya Senior High School</Preview>
      <Tailwind>
        {/* <Body
          style={{
            backgroundColor: "#fff",
            border: "1px solid #efefef",
            borderRadius: ".4rem",
            height: "70vh",
            width: "70%",
          }}
          className="bg-white  font-sans"
        > */}
        <Container
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: ".4rem",
            padding: "0 2rem",
            //   margin: "auto",
            marginTop: "3rem",
            height: "75vh",
          }}
        >
          <Text
            style={{ fontSize: "1.1rem" }}
            className="text-black text-[14px] leading-[24px]"
          >
            Hello {client},
          </Text>
          <Heading as="h2">
            <strong>{subject}</strong>
          </Heading>
          <Text style={{ fontSize: "1rem" }}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
          <Section
            className="text-center mt-[32px] mb-[32px]"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                width: "15rem",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "green",
                borderRadius: ".4rem",
                color: "#fff",
                margin: "2rem 0",
              }}
              pX={20}
              pY={12}
              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              href={"http://localhost:3000/sensec/homepage"}
            >
              Go to Dashboard
            </Button>
          </Section>{" "}
          <Heading as="h4">Your's Sincerely,</Heading>
          <Text style={{ fontSize: "1rem" }}>Kenneford Annan</Text>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <Text>
            If you were not expecting this invitation, you can ignore this
            email. If you are concerned about your account's safety, please
            reply to this email to get in touch with us.
          </Text>
        </Container>
        {/* </Body> */}
      </Tailwind>
    </Html>
  );
}
