import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ServiceSection, ProcessSection, AboutSection } from "@/components/content-sections"
import { ShowcaseSection } from "@/components/showcase"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return <><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content"><Hero /><ServiceSection /><ShowcaseSection /><ProcessSection /><AboutSection /><FaqSection /><ContactSection /></main><SiteFooter /></>
}
