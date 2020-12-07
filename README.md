# Sounds

A sound generation/track building application for the web tested in Chrome.

This app was created using:

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## What does this app let you do?

- Play notes/drums generated from the browsers apis.
- Build tracks as combinations of notes/drums.
- Save tracks to a local database to be played again in the future.
- Generate random tracks.
- Load tracks from file.
- Export tracks as importable format.

## What needs to be done?

- When clicking a note/drum add that to the track view
- Display the current track view at the bottom
- Allow items to be deleted from the track
- Read all existing tracks into the application from idb
- When a track is changed write the change to idb
- Set up the initial state of the application
- Show how many channels the client can use
- Show how many concurrent sounds the device can play
- If the client only has one channel then remove the panner control

## How the applications logic should flow

1. On initial load the application will have an empty state and a open connection to the database
2. Fire a event to lookup the stored tracks and load them into the state
3. When preforming any action first the database then if successful create a new state from the previous containing the new data
