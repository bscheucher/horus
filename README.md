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
1. **Clone the repository:** git clone https://dev.azure.com/ibisacam/ibosNG/_git/tn-portal
2. **Change to the project folder:** cd tn-portal
3. **Install dependencies:** npm install or npm i

### Development
- **Start the development server:** npm run dev<br>
- The application will be available at `http://localhost:3000`

# Build and Test
### Building for Production
- **Create an optimized production build:** npm run build<br>
- **Preview the production build locally:** npm run preview

### Testing
- **Run Tests:** npm test
- **Run tests in watch mode:** npm run test:watch
- **Generate coverage report:** npm run test:coverage

# Software Dependencies

## Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

## Core Dependencies

**UI Framework & State Management:**
- `react` (19.2.3) - Core React library with latest features
- `react-dom` (19.2.3) - React DOM rendering
- `@tanstack/react-router` - Type-safe routing solution
- `@tanstack/react-query` - Server state management and data fetching
- `@tanstack/react-form` - Performant form state management
- `zod` - TypeScript-first schema validation

**Styling:**
- `tailwindcss` (v4) - Utility-first CSS framework
- `daisyui` - Tailwind CSS component library
- `postcss` & `autoprefixer` - CSS processing tools

## Development Dependencies

**Build & Tooling:**
- `@rsbuild/core` - Fast Rspack-based build tool
- `@rsbuild/plugin-react` - React support for Rsbuild
- `typescript` - Static type checking

**Code Quality:**
- `@biomejs/biome` - Fast linter and formatter

**Testing:**
- `jest` - JavaScript testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM
- `@testing-library/user-event` - User interaction simulation
- `jest-environment-jsdom` - DOM environment for tests
- `@swc/jest` - Fast test transformation

All dependencies are managed through npm and can be installed with `npm install`.

## External Integrations
- **ibosNG** - Enterprise management system
- **EntraID (Azure AD)** - Authentication provider
- **Natif** - Data retrieval service
- **Sharepoint** - Document management system

# Latest Releases
- no release yet

# API References

### Authentication
Authentication is handled via **EntraID (Azure Active Directory)** using the organization's existing credentials.

### External Integrations
- **ibosNG API** - Participant data, seminar management, absence tracking: https://dev.azure.com/ibisacam/ibosNG/_git/ibosng-backend?path=/CONFIGURATION.md&version=GBmain&_a=preview
- **Natif API** - Data synchronization service: https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/84/%F0%9F%93%91-Natif-integration
- **Sharepoint REST API** - Document storage and retrieval

### Portal API Endpoints
*The portal's REST API is currently in development. Detailed endpoint documentation will be added as features are implemented.*

# Contribute

Please check the version control workflow documentation: https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/8/%F0%9F%AA%B4-Version-Control-Workflow

We follow a structured Git workflow to maintain code quality and traceability. All contributions must go through peer review via pull requests.

### Development Workflow

1. **Create a Feature Branch**
   - Always branch from `main`
   - Use the naming convention: `<user-story-id>-<short-description>`
   - Example: `23-absence-upload-form`

2. **Develop and Commit**
   - Make your changes and commit regularly
   - Include the work item ID in commit messages using `#ID`
   - Example: `#42 Added Zod validation for document upload`

3. **Keep Your Branch Updated**
   - Use rebase (not merge) when pulling changes from main

4. **Create a Pull Request**
   - Push your branch to the remote repository
   - Create a PR in Azure DevOps targeting the `main` branch
   - Assign at least one reviewer
   - Link the related work item

5. **PR Review Process**<br>
   The reviewer will verify:
   - Implementation covers all requirements in the work item
   - Code meets quality standards and follows project style
   - Documentation is updated
   - Tests are added/updated and all tests pass
   - Application builds successfully
   - Work items in Azure DevOps are up to date

6. **Merge and Cleanup**
   - After approval, merge the PR
   - Delete the source branch to keep the repository clean


### Branch Protection Rules

**Important:** The `main` branch is protected
- Direct pushes to `main` are **not allowed**
- All changes must go through reviewed pull requests
- The `main` branch must always contain a buildable version

### Code Standards

- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use Tailwind CSS utility classes for styling
- Ensure all tests pass: `npm test`
- Validate code quality: `npm run check`
- Keep commits focused and atomic

### Commit Message Format
```
#<work-item-id> <brief description>
```

Examples:
- `#123 Updated documentation in README.md`
- `#456 Fixed absence date validation bug`
- `#789 Added unit tests for document upload`

### Need Help?

- Check the [ibosNG development wiki](https://dev.azure.com/ibisacam/ibosNG/_wiki/wikis/ibosNG.wiki/1/%F0%9F%A7%A0-iBOS_nG-Wiki) for detailed documentation
- Contact the development team for questions about work items or implementation details

