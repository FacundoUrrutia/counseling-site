import type { Dict } from "@/app/i18n/dictionaries";

const Footer = ({ dict }: { dict: Dict }) => (
  <footer className="max-w-[1100px] mx-auto px-6 pt-8 pb-12 border-t border-ink/10 text-center">
    <p className="text-[13px] text-neutral-700 mb-1.5">
      © {new Date().getFullYear()} {dict.footer.copyrightName}
    </p>
    <a
      href="https://www.psychologytoday.com/uy/psicologos/ignacia-ayala-montevideo-mo/1681181"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-accent-700 hover:text-accent-800 transition-colors"
    >
      {dict.footer.credentialLink}
    </a>
  </footer>
);

export default Footer;
