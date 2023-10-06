# EPIC

EPIC is an Electron Postman/Insomnia Clone. While it currently has minimal functionality, more featurs are planned.

This was created because both Postman and Insomnia are moving/have moved towards requiring accounts and/or paying for the services. These applications are also getting particularly heavy. 


## Planned features

- History: As a user, I would like to be able to see my recent history so that I can re-run an API call withou typing everything in again.
- Tabs: As a user, I would like to have tabs so that I can run multiple API calls without clearing out my current settings.

## To Run

To run a local instance, run the following commands:

```bash
git clone git@github.com:rvehall/epic.git
cd epic
npm install
npm run dev
```

To run publish, run the following commands:

```bash
git clone git@github.com:rvehall/epic.git
cd epic
npm install
npm run electron:build
npm run electron:publish
```

Artifacts are available at `epic/out/make`