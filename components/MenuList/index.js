import React, {useState, useEffect} from "react"
import Router, {useRouter} from "next/router"
import {Container, Row, Card, Button, Jumbotron, Col} from 'react-bootstrap'

const UserList = ({userData}) => {
    const [users, setUsers] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    // Set up user data
    useEffect(() => {
        if (userData) {
            // Error check
            if (userData.error) {
                // Handle error
            } else {
                userData.latestData = false;

                if(userData.data.length < 5){
                    userData.latestData = true;
                    setLoading(false)
                }


                if(users.data){
                    userData.data = users.data.concat(userData.data)
                }

                if(userData.data.length > 0){
                    setUsers(userData)
                }

            }
        }
    }, [userData])
    // Router event handler
    useEffect(() => {
        Router.events.on("routeChangeStart", startLoading)
        Router.events.on("routeChangeComplete", stopLoading)
        return () => {
            Router.events.off("routeChangeStart", startLoading)
            Router.events.off("routeChangeComplete", stopLoading)
        }
    }, [])

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    const handleScroll = () => {
        // To get page offset of last user
        const lastUserLoaded = document.querySelector(
            ".user-list > .user:last-child"
        )

        if (lastUserLoaded) {
            const lastUserLoadedOffset =
                lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight

            if (pageOffset > lastUserLoadedOffset) {
                // Stops loading
                /* IMPORTANT: Add !loading  */
                if (!userData.latestData && !loading) {
                    // Trigger fetch
                    const query = router.query
                    query.page = parseInt(userData.page) + 1
                    router.push({
                        pathname: router.pathname,
                        query: query,
                    })
                }
            }
        }
    }
    return (
        <>
            <Row className="user-list">
                {users.data && users.data.length > 0 &&
                users.data.map((user, i) => {
                    return (
                        <Col md={4} className="user" >
                            <Card className="mb-4 shadow" style={{ height: '420px' }}>
                                <Card.Img variant="top" src={user.image} style={{ height: '225px' }} />
                                <Card.Body>
                                    <Card.Title>{user.title}</Card.Title>
                                    <Card.Text>
                                        {user.description}
                                    </Card.Text>
                                    <Button variant="primary">Buy</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            {loading && <h1>Loading ...</h1>}
        </>
    )
}
export default UserList
