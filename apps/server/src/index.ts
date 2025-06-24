import express from "express";
import cors from 'cors';

import { deckImport } from "./deck-import";

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(cors({
  allowedHeaders: ["Content-Type"],
  exposedHeaders: [],
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://msafronov.github.io',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
}));

deckImport(app);

app.listen(process.env.NODE_ENV === 'development' ? 3000 : 80, () => {
  console.log('[+] server started')
});
