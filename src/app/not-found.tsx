import { ButtonLink, Container, Eyebrow, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <Eyebrow>Error 404</Eyebrow>
      <Heading as="h1" className="mt-4">
        Page not found
      </Heading>
      <p className="mx-auto mt-4 max-w-md text-neutral-600">That page does not exist. Try the homepage or message us on WhatsApp.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop iPhones
        </ButtonLink>
      </div>
    </Container>
  );
}
