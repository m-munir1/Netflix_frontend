import { useEffect, useState } from "react";
import Featured from "../components/Featured";
import List from "../components/List";
import Navbar from "../components/Navbar";
import axiosconfig from "../config/axiosconfig";
import PlayerOverlay from "../components/PlayerOverlay";
import PlayerVideo from "../components/PlayerVideo";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, Container } from "react-bootstrap";
function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosconfig.get("movies");
        setLists(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, []);

  return (
    <>
      <div className="home">
        <Navbar />
        <Featured />
      </div>
      <div style={{ height: "30px" }}></div>
      <Container>
        <Row>
          {lists?.map((list) => (
            <>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={list?.thumbnail} />
                  <Card.Body>
                    <Card.Title>{list.title}</Card.Title>
                    <Card.Text>Publisher:{list?.publisher}</Card.Text>
                    <Card.Text>Producer:{list?.producer}</Card.Text>
                    <Card.Text>Genre:{list?.genre}</Card.Text>
                    <Card.Text>{list?.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => setShowPlayer(true)}
                    >
                      Play
                    </Button>
                    {showPlayer ? (
                      <PlayerOverlay onClick={() => setShowPlayer(false)}>
                        <PlayerVideo src={list.movie} type="video/mp4" />
                      </PlayerOverlay>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </Container>
      <div
        style={{ backgroundColor: "#000", width: "100px", height: "100%" }}
      ></div>
    </>
  );
}

export default Home;
