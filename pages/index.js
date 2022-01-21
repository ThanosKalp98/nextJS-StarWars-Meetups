import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';


import MeetupList from '../components/meetups/MeetupList';



function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>StarWars Meetups</title>
                <meta 
                    name="description" 
                    content="Browse a list of Star Wars meetups!" 
                />
            </Head>
            <MeetupList meetups = {props.meetups} />
        </Fragment>
    );
}

// This code is executed during the build process NOT on the client side.
// This code never reached the client side 
export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://ThanosKalp:ODBqyDBG8Y0JlRWe@nextjscc.phmzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');    

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    
    // Always need to return an object
    return {
        // These DUMMY_MEETUPS are being setted as props for my -> HomePage(props)
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        // For Incremental Static Generation. Making sure the page
        // is frequently updated after depoloyment
        revalidate: 1
    };
}

//* Runs always on the server, after deployment
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//      // I can fetch data from an API or a DB

//      // Always need to return an object
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export default HomePage;