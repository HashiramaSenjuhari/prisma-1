import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
