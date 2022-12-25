import express from "express"
import bodyParser from "body-parser"
import {userId} from "./bot.mjs";
import {TOKEN} from "./constants.mjs";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/message', (req, res) => {
    const data = req.body;
    try {
        const message = `задача: ${data.taskName} - ${data.messageStatus}`;
        const botSendMessageUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${userId}&text=${message}`;
        fetch(botSendMessageUrl)
            .then((response) => res.status(200).send(JSON.stringify('OK')).end())
            .catch((err) => res.status(200).send(JSON.stringify('Internal server error')).end())
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
