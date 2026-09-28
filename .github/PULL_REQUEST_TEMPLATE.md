name: Pull Request
description: Submit a pull request
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: What does this PR do?
    validations:
      required: true
  - type: textarea
    id: checklist
    attributes:
      label: Checklist
      description: |
        - [ ] Code follows existing style
        - [ ] `npm run lint` passes
        - [ ] i18n keys added to all 5 languages
        - [ ] Tested locally with `npx serve public`
