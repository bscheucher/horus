# Introduction 
`Teilnehmer-Portal` is a modern React-based web application that enables course participants at ibis acam to efficiently manage their absences. Participants can register various types of absences—including sick leave, job interviews, and official appointments—directly through the portal and upload supporting documentation for verification.

**Key Features**
- **Secure Authentication**: Participants log in using their existing EntraID credentials
- **Absence Management**: Register and track absences with document upload capabilities
- **Integration with ibosNG**: Trainers, administrators, and project managers can view and manage absence confirmations through ibosNG
- **Document Integration**: Seamless integration with Natif for data retrieval and Sharepoint for document storage

The portal integrates seamlessly with the existing ibosNG enterprise management ecosystem, providing a streamlined experience for both participants and administrative staff.

# Getting Started
### Installation
**Clone the repository and run npm install: https://dev.azure.com/ibisacam/ibosNG/_git/tn-portal

### Development
- **Start the development server:** npm run dev<br>
- The application will be available at `http://localhost:3000`

# Build and Test
- See package.json for available scripts

## External Integrations
- **ibosNG** - Enterprise management system
- **EntraID (Azure AD)** - Authentication provider
- **Natif** - Data retrieval service
- **Sharepoint** - Document management system

# Latest Releases
- Look for releases in AzureDevOps: https://dev.azure.com/ibisacam/ibosNG/_release?_a=releases&view=mine&definitionId=4

### Authentication
Authentication is handled via **EntraID (Azure Active Directory)** using the organization's existing credentials.

### External Integrations
- **ibosNG API** - Participant data, seminar management, absence tracking: https://dev.azure.com/ibisacam/ibosNG/_git/ibosng-backend?path=/CONFIGURATION.md&version=GBmain&_a=preview
- **Natif API** - Data extraction from uploaded documents: https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/84/%F0%9F%93%91-Natif-integration
- **Sharepoint REST API** - Document storage and retrieval

# Contribute
Please check the version control workflow documentation: https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/8/%F0%9F%AA%B4-Version-Control-Workflow

### Need Help?
- Check the [ibosNG development wiki](https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/1/%F0%9F%A7%A0-iBOS_nG-Wiki) for detailed documentation
- Contact the development team for questions about work items or implementation details

