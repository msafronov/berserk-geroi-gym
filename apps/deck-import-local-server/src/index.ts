import express from "express";
import cors from 'cors';

import { deckImport } from "./deck-import";

const app = express();

app.use(cors({
  allowedHeaders: ["Content-Type"],
  exposedHeaders: [],
  origin: 'http://localhost:5173',
  methods: "GET,HEAD",
  preflightContinue: false,
}));

deckImport(app);

app.listen(3000, () => {
  console.log('[+] server started')
});
