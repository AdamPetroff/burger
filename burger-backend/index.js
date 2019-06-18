import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient, ObjectId} from 'mongodb';
import uuid from 'uuid';
import bcrypt from 'bcryptjs';
import path from 'path';

const app = express();

app.use(bodyParser.json());


const url = 'mongodb://root:password@mongo:27017';
const dbName = 'burger';

MongoClient.connect(url, {useNewUrlParser: true}).then(client => {
    console.log('Connected successfully to db');

    const db = client.db(dbName);

    // Enable CORS for development purposes
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');

        next();
    });

    app.use(express.static(path.join(__dirname, '..', 'burger-frontend', 'build')));

    app.post('/resource/:resource', async (req, res) => {
        const resourceName = req.params['resource'];

        const collection = db.collection(resourceName);
        const result = await collection.insertOne(req.body);

        res.send(result.ops[0]);
    });

    app.get('/resource/:resource', async (req, res) => {
        const resourceName = req.params['resource'];

        const collection = db.collection(resourceName);
        const result = await collection.find().toArray();

        if (!result) return res.sendStatus(404);

        res.send(result);
    });

    app.get('/resource/:resource/:resourceId', async (req, res) => {
        const resourceName = req.params['resource'];
        const resourceId = req.params['resourceId'];

        const collection = db.collection(resourceName);
        const result = await collection.findOne({_id: ObjectId(resourceId)});

        if (!result) return res.sendStatus(404);
        res.send(result);
    });

    app.delete('/resource/:resource/:resourceId', async (req, res) => {
        const resourceName = req.params['resource'];
        const resourceId = req.params['resourceId'];

        const collection = db.collection(resourceName);
        const result = await collection.findOneAndDelete({_id: ObjectId(resourceId)});

        res.send(result);
    });

    app.put('/resource/:resource/:resourceId', async (req, res) => {
        const resourceName = req.params['resource'];
        const resourceId = req.params['resourceId'];

        const collection = db.collection(resourceName);
        try{
            const result = await collection.findOneAndUpdate({_id: ObjectId(resourceId)}, {$set: req.body});

            res.send(result);
        } catch (e) {
            console.log(e);

            res.sendStatus(400);
        }
    });

    app.post('/auth/sign-up', async (req, res) => {
        const token = uuid.v1();

        const collection = db.collection('user');

        try {
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const result = await collection.insertOne({
                email: req.body.email,
                password: hashedPassword,
                token: token
            });

            setTimeout(() => {
                res.send({
                    token: token,
                    user: result.ops
                });
            }, 2000);


        } catch (err) {
            if(err.name === 'MongoError' && err.code === 11000) {
                res.sendStatus(409);
            } else {
                console.log(err);
            }
        }
    });

    app.post('/auth/sign-in', async (req, res) => {
        const collection = db.collection('user');

        try {

            let result = await collection.findOne({
                email: req.body.email
            });

            if(!req.body.password) {
                res.status(400);
                return res.send({message: 'no password provided'}, 400);
            }

            if(!result) {
                return res.sendStatus(401);
            }

            if(bcrypt.compareSync(req.body.password, result.password)) {
                return res.send({token: result.token});
            }

            return res.sendStatus(401);
        } catch (err) {
            if(err.name === 'MongoError' && err.code === 11000) {
                res.sendStatus(409);
            } else {
                console.log(err);
            }
        }
    });

    app.listen(3000, () => {
        console.log('Listening on 3000');
    });
}).catch((e) => {
    console.log('Database connection error', e);
});