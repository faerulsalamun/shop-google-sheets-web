import Head from 'next/head'
import {Button, Container, Jumbotron} from 'react-bootstrap'
import MenuList from '../components/MenuList'

export default function Home({userData}) {
    var styles = {
        "height": "500px",
        "width": "100%",
        "backgroundImage": 'url(https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)'
    }

    return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
            <Head>
                <title>Faerul Salamun Shop</title>
                <link rel="icon" href="/favicon-32x32.png"/>
            </Head>

            <Jumbotron className="text-center d-flex align-items-center" style={styles}>
                <Container>
                    <h1 style={{color: "white"}}>Faerul Salamun Shop!</h1>
                    <p style={{color: "white"}}>
                        This is a faerul salamun shop
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Container>
            </Jumbotron>

            <Container>
                <MenuList userData={userData}/>
            </Container>


            <footer className="cntr-footer">
            </footer>
        </Container>
    )
}

export const getStaticProps = async ({query}) => {
    // Fetch the first page as default
    const page = 0
    let userData = null
    // Fetch data from external API
    try {
        const res = await fetch(`https://e8288a140e99.ngrok.io/api/v1/webs?offset=${page}`)

        if (res.status !== 200) {
            throw new Error("Failed to fetch")
        }
        userData = {
            data: await res.json(),
            page: page,
        }
    } catch (err) {
        userData = {error: {message: err.message}}
    }
    // Pass data to the page via props
    return {props: {userData}}
}

