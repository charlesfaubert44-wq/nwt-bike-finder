# Contributing to YK Bike Finder

First off, thank you for considering contributing to YK Bike Finder! 🎉 This project aims to help reunite stolen bikes with their owners in Yellowknife and across the Northwest Territories.

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive. This is a community project aimed at helping people recover their stolen bikes.

## 🚀 Quick Start for Contributors

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nwt-bike-finder.git
   cd nwt-bike-finder
   ```
3. **Run setup script**:
   ```bash
   # Windows
   .\setup.ps1
   
   # Mac/Linux
   chmod +x setup.sh
   ./setup.sh
   ```
4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes**
6. **Test thoroughly**
7. **Submit a pull request**

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Code is automatically formatted (ESLint configured)
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic

### File Structure

```
src/
├── app/          # Next.js pages (App Router)
├── components/   # React components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and services
└── types/        # TypeScript type definitions
```

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props

Example:
```typescript
interface BikeCardProps {
  bike: StolenBike | FoundBike;
  onClick: () => void;
}

export function BikeCard({ bike, onClick }: BikeCardProps) {
  // Component implementation
}
```

### Firebase Guidelines

- **Never query without auth checks**: Always verify `request.auth != null`
- **Test security rules**: Use Firebase Emulator Suite
- **Optimize queries**: Use indexes for compound queries
- **Handle errors**: Always add error handling for Firebase operations

### State Management

- Use React hooks (`useState`, `useEffect`, `useContext`)
- Custom hooks in `src/hooks/` for complex state
- Keep state as local as possible

## 🧪 Testing

### Before Submitting

- [ ] Code builds without errors: `npm run build`
- [ ] ESLint passes: `npm run lint`
- [ ] Test all affected features manually
- [ ] Test on mobile devices (responsive)
- [ ] Check browser console for errors

### Manual Testing Checklist

- [ ] User authentication (login/signup/logout)
- [ ] Report stolen bike
- [ ] Report found bike
- [ ] Image upload and preview
- [ ] AI matching functionality
- [ ] Chat messaging
- [ ] Map view
- [ ] Mobile responsiveness

## 🐛 Bug Reports

### Before Reporting

1. Check if the bug is already reported in Issues
2. Try to reproduce the bug consistently
3. Test in incognito/private mode

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 11, macOS 13]
- Browser: [e.g., Chrome 120, Safari 17]
- Device: [e.g., iPhone 14, Desktop]
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Problem Statement**
Describe the problem or need.

**Proposed Solution**
Describe your proposed solution.

**Alternatives Considered**
List alternative solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## 🔄 Pull Request Process

### PR Checklist

- [ ] Branch is up to date with `main`
- [ ] Code follows project style guidelines
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] All features tested manually
- [ ] No console errors or warnings
- [ ] Security rules updated (if needed)
- [ ] Documentation updated (if needed)

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code builds successfully
- [ ] Lint passes
- [ ] Tested on mobile
- [ ] No security issues introduced
```

## 🎯 Priority Areas for Contribution

### High Priority
- 🔒 Security improvements
- 🐛 Bug fixes
- 📱 Mobile UX improvements
- ⚡ Performance optimizations
- ♿ Accessibility improvements

### Medium Priority
- ✨ New features (after soft launch)
- 📊 Analytics and insights
- 🌐 Multi-language support (French, Indigenous languages)
- 🎨 UI/UX enhancements

### Nice to Have
- 📝 Documentation improvements
- 🧪 Test coverage
- 🎨 Design system improvements

## 📂 Common Tasks

### Adding a New Page

1. Create file in `src/app/your-route/page.tsx`
2. Add route to navbar (if needed)
3. Update types in `src/types/index.ts` (if needed)
4. Test navigation and mobile view

### Adding a New Component

1. Create file in `src/components/YourComponent.tsx`
2. Export from component file
3. Add TypeScript interface for props
4. Document complex props with JSDoc
5. Test in different scenarios

### Adding Firebase Collection

1. Update `src/types/index.ts` with type definitions
2. Update `firestore.rules` with security rules
3. Add indexes to `firestore.indexes.json` (if needed)
4. Create helper functions in `src/lib/db.ts`
5. Test CRUD operations
6. Deploy rules: `firebase deploy --only firestore:rules`

### Modifying AI Matching

AI matching code is in `src/lib/imageMatching.ts`:
- Uses TensorFlow.js with MobileNet v2
- Extracts features from images
- Calculates cosine similarity
- Returns ranked matches

Consider:
- Model size vs accuracy tradeoffs
- Client-side performance
- Privacy implications

## 🔐 Security

- **Never commit secrets**: Use environment variables
- **Review security rules**: Test with Firebase Emulator
- **Validate inputs**: Always validate user inputs
- **Report vulnerabilities**: See SECURITY.md

## 📖 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [TensorFlow.js Docs](https://js.tensorflow.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Project Docs
- `README.md` - Project overview
- `QUICKSTART.md` - 5-minute setup
- `DEPLOYMENT.md` - Deployment guide
- `SECURITY.md` - Security policy

## 🌟 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (when launched)

## 📞 Questions?

- Open a GitHub Discussion
- Check existing Issues
- Review documentation first

## 🙏 Thank You!

Every contribution, no matter how small, helps make YK Bike Finder better and helps reunite bikes with their owners. Thank you for being part of this community project! 🚲

---

**Happy Contributing!** 🎉
