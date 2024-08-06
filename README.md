## Getting Started

Next.js v13.2.4 required

Node engine for this project is `18.18.0` and NPM is `8.19.2`.
**HINT:**
NVM is your friend If you wish to use multiple version of node:
https://www.npmjs.com/package/nvm

1. Install all project dependencies

```bash
# 1. Install project Dependencies
npm i
npm i --legacy-peer-deps

# 2. Run the development server
npm run dev
```

**Open [http://localhost:3000](http://localhost:8080) with your browser to see the result.**

## Troubleshooting

If React errors, (E.G 'react-jsx' Missing:)
npm i --save-dev @types/react
npm i --save-dev @types/react-dom

**Git actions notes:**

See azure-static-web-apps-....
Docs: https://docs.microsoft.com/en-us/azure/static-web-apps/build-configuration?tabs=github-actions

## VSCode Dev Tips

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting. If you are curious about the configurations, see `.eslintrc.json` and `.prettierrc.json`. It is recommended you install the following VSCode Extensions to help with development:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier-ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

You will also want to update your `settings.json` for VSCode with the following:

```json
{
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

This will re-format your files on save and copy/paste to avoid committing unlinted code and prevent build errors.

### Other Helpful VSCode Extensions

---

- [JS & TS Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) - VS Code extension that enables the nightly build of TypeScript (typescript@next) as VS Code's built-in TypeScript version used to power JavaScript and TypeScript IntelliSense.

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - GitLens supercharges Git inside VS Code and unlocks untapped knowledge within each repository. It helps you to visualize code authorship at a glance via Git blame annotations and CodeLens, seamlessly navigate and explore Git repositories, gain valuable insights via rich visualizations and powerful comparison commands, and so much more.

- [Typescript React Code Snippets](https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript) - This extension contains code snippets for React with Typescript.


Note on tailwind!!
https://tailwindcss.com/docs/installation#post-css-7-compatibility-build