# 🔐 Security Policy for BJL13.org

Thank you for your interest in keeping BJL13 Enterprise Solutions online presence safe, private, and resilient. Even small sites can have real-world implications, and I take security seriously — especially given the personal and professional content this site hosts.

---

## 🚨 Reporting a Vulnerability

If you believe you've found a **security vulnerability** — whether in code, deployment, or linked services — please report it **privately and responsibly**.

### 🔒 Preferred Contact

- Email: [security@bjl13.org](mailto:security@bjl13.org)
- GPG Key (optional): _[50D5 FA68 0553 46AC 2A4E  9322 B0D9 AA75 322A 6F7C]_

Please avoid public disclosure (e.g. GitHub issues, social media) until we've had a chance to review and address the concern.

---

## 🧪 What to Report

I'm interested in reports related to:

- Code injection (HTML, JS, shell scripts)
- Unintended information disclosure (metadata leaks, server logs)
- Vulnerable dependencies or CVEs
- Insecure headers or TLS configuration
- Misconfigurations in GitHub Actions or deployment workflows
- Subdomain takeover or DNS configuration flaws

You do **not** need to prove exploitability. A well-documented concern is enough.

---

## ⏱ Response Timeline

I aim to respond to initial reports within **5 business days**, and to resolve verified issues as quickly as possible depending on severity.

For critical vulnerabilities:
- You will be kept updated through email
- Fixes will be prioritized over feature development
- Public disclosure will only occur once a patch is live, unless agreed otherwise

---

## 🏆 Recognition

If you responsibly disclose a valid vulnerability:
- You’ll be credited in the site changelog (if desired)
- You may be eligible for a token of appreciation — even for non-critical issues
- No threat, shame, or hostility will ever be directed toward a good-faith researcher

---

## 🧘 Out of Scope

This is a personal project — the following are **not** considered security issues unless they cause harm or data leakage:

- "Clickjacking" or lack of CSP on static pages
- Missing `X-Frame-Options` on non-auth content
- Version disclosures (unless linked to known exploits)
- Lack of CAPTCHA or rate-limiting on non-existent forms

---

## ⚙️ Deployment Notes

- Hosted on [GitHub Pages / Netlify / etc. — to be updated]
- CI/CD via GitHub Actions
- No user authentication, no database, no third-party scripts (by design)
- Static-first architecture with limited attack surface

---

## 🔚 Final Notes

All security inquiries are reviewed personally by:

**Brian J. London**  
Founder, BJL13 Enterprise Solutions  
[security@bjl13.org](mailto:security@bjl13.org)

Ethical hackers, researchers, students, and curious professionals are welcome here. Your efforts make the web safer.
