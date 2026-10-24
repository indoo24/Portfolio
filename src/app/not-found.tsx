import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-28 lg:py-40">
      <p className="label">
        <span className="text-accent">404</span> / Not found
      </p>
      <h1 className="mt-6 font-display text-title font-semibold">This page doesn&apos;t exist.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        The link may be out of date. The projects and contact details are on the home page.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/#work" variant="secondary">
          See selected work
        </ButtonLink>
      </div>
    </Container>
  );
}
