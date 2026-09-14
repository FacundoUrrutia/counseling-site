import type { SiteSettings } from "@/sanity/lib/queries";

const Footer = ({ siteSettings }: { siteSettings: SiteSettings }) => (
  <footer className="max-w-[1100px] mx-auto px-6 pt-8 pb-12 border-t border-ink/10 text-center">
    <p className="text-[13px] text-neutral-700 mb-1.5">
      © {new Date().getFullYear()} {siteSettings.footerCopyrightName}
    </p>
    {siteSettings.footerCredentialUrl && siteSettings.footerCredentialLabel && (
      <a
        href={siteSettings.footerCredentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-accent-700 hover:text-accent-800 transition-colors"
      >
        {siteSettings.footerCredentialLabel}
      </a>
    )}
  </footer>
);

export default Footer;
