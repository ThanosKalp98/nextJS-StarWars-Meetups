// Function for server-side code
// /api/new-meetup
// ONLY POST /api/new-meetup

// ODBqyDBG8Y0JlRWe

import { MongoClient } from "mongodb";


async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://ThanosKalp:ODBqyDBG8Y0JlRWe@nextjscc.phmzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);
        
        //! Error handling could be aaded here.

        client.close();

        res.status(201).json({message: 'Meetup inserted'});

    }
}

export default handler;
