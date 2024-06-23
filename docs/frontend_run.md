### how to run frontend for development

1. install git and nodejs (with corepack)
2. open vscode
3.

```shell
$ git clone https://github.com/gmankab/galaxy_frontend -b dev
$ cd galaxy_frontend
$ pnpm install --frozen-lockfile
$ pnpm run dev
```

### auto deploy

on each commit frontend automatically deploys on https://gmankab.github.io/galaxy_frontend
