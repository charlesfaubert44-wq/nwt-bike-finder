# Security Policy

## Supported Versions

Currently supporting the latest version only during soft launch phase.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of YK Bike Finder seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues by emailing:
- **Email**: [your-security-email@example.com]
- **Subject**: "[SECURITY] YK Bike Finder - Brief Description"

### 📝 What to Include

Please include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (optional)
- Your contact information for follow-up

### ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 14 days
  - Low: 30 days

### 🏆 Recognition

We appreciate security researchers who help keep our community safe. With your permission, we'll acknowledge your contribution in our release notes.

## Security Best Practices for Contributors

### Firebase Security
- Never commit Firebase credentials to version control
- Always use environment variables for sensitive data
- Review security rules before deployment
- Test security rules with Firebase Emulator Suite

### Code Security
- Keep dependencies up to date (`npm audit`)
- Validate all user inputs
- Sanitize data before display
- Use parameterized queries
- Follow principle of least privilege

### Authentication
- Never store passwords in plain text
- Use Firebase Authentication for all auth flows
- Implement proper session management
- Validate tokens server-side

### Data Privacy
- Minimize data collection
- Encrypt sensitive data
- Follow GDPR/PIPEDA guidelines
- Implement proper data retention policies

## Known Security Considerations

### Client-Side AI Processing
- TensorFlow.js runs in the browser
- Image features are sent to Firestore
- Consider privacy implications of image analysis

### Location Data
- Precise bike locations are stored
- Location data is visible to authenticated users
- Consider anonymizing location data

### Chat System
- Messages are stored in Realtime Database
- Only participants can view messages
- Consider implementing end-to-end encryption

## Security Checklist for Deployment

- [ ] All Firebase security rules deployed
- [ ] Environment variables configured
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Firebase App Check enabled (recommended)
- [ ] Regular security audits scheduled
- [ ] Dependency updates automated
- [ ] Error logging configured (without exposing sensitive data)
- [ ] Admin accounts properly secured

## Third-Party Dependencies

We use the following security measures for dependencies:
- Regular `npm audit` checks
- Automated dependency updates via Dependabot
- Review of all dependency updates before merging

## Contact

For security-related questions: [your-security-email@example.com]

For general questions: [your-general-email@example.com]

---

**Last Updated**: October 22, 2025
