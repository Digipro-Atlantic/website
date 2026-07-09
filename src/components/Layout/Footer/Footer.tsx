import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { footerNav } from '@/data/nav'
import { site } from '@/data/site'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer id="company">
            <div className="wrap">
                <div className="foot-top">
                    <div>
                        <Logo size="footer" to={false} />
                        <p className="foot-blurb">{site.footerBlurb}</p>
                        <address className="foot-contact">
                            {site.contact.address}
                            <br />
                            <a href={`tel:${site.contact.phone}`}>
                                {site.contact.phoneDisplay}
                            </a>
                            <br />
                            <a href={`mailto:${site.contact.email}`}>
                                {site.contact.email}
                            </a>
                            <br />
                            <a href={`mailto:${site.contact.parentEmail}`}>
                                {site.contact.parentEmail}
                            </a>
                        </address>
                    </div>
                    <div className="foot-col">
                        <h5>Platform</h5>
                        {footerNav.platform.map((link) => (
                            <SiteLink key={link.label} link={link} />
                        ))}
                    </div>
                    <div className="foot-col">
                        <h5>Company</h5>
                        {footerNav.company.map((link) => (
                            <SiteLink key={link.label} link={link} />
                        ))}
                    </div>
                    <div className="foot-col">
                        <h5>Legal</h5>
                        {footerNav.legal.map((link) => (
                            <SiteLink key={link.label} link={link} />
                        ))}
                    </div>
                </div>
                <div className="foot-bottom">
                    <span>
                        &copy; {year} {site.legalName}
                    </span>
                    <span className="rc">{site.footerLine}</span>
                </div>
            </div>
        </footer>
    )
}
