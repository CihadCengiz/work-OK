import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

function FetchData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [jobCount, setJobCount] = useState();
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(5),
        justifyContent:"center",
        display:'flex',
        marginBottom: theme.spacing(5)
      },
    },
  }));

  const handleChange = (event, value) => {
    setPage(value-1);
  };
  
  const classes = useStyles();

  // useEffect(() => {
  //   axios.get("http://localhost:3001/jobs").then((items) => {
  //     console.log(items.data.content);
  //     setJobs(items.data.content);
  //   });
  // }, []);
  useEffect(() => {
    axios.get(`http://localhost:3001/jobs?page=${page}`).then((items) => {
      console.log(items.data.content);
      setJobs(items.data.content);
      setTotalPages(items.data.totalPages)
      setJobCount(items.data.totalJobs)
    });
  }, [page]);

  const [dropDownState, setDropDownState] = useState("");

  useEffect((text) => {
    setDropDownState(text);
  }, []);


  return (
    <Container>
      <Typography className="job" variant="h3" component="h1">
        Find Your Internship
      </Typography>
      <Typography variant="h6" component="h2">
        Found {jobCount} Internship Offers
      </Typography>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="secondary"
          title={dropDownState ? dropDownState : "Select search type"}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item eventKey="option-1" href="#">
            <div onClick={(e) => setDropDownState(e.target.textContent)}>
              Title
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="option-2" href="#">
            <div onClick={(e) => setDropDownState(e.target.textContent)}>
              Country
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="option-3" href="#">
            <div onClick={(e) => setDropDownState(e.target.textContent)}>
              Field
            </div>
          </Dropdown.Item>
        </DropdownButton>
        <FormControl
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Search"
          aria-label="Text input with dropdown button"
        />
      </InputGroup>
      <div>
        {
          // .filter((val) => {
          //   if(!dropDownState){
          //     return val;
          //   }
          //   else if(dropDownState === 'Title') {
          //     if (searchTerm === "") {
          //       return val;
          //     } else if (
          //       val.title.toLowerCase().includes(searchTerm.toLowerCase())
          //       ) {
          //         return val;
          //       }
          //     }
          //   // else if(dropDownState === "Country") {
          //   //   if (searchTerm === "") {
          //   //     return val;
          //   //   } else if (
          //   //     val.location.toLowerCase().includes(searchTerm.toLowerCase())
          //   //     ) {
          //   //       return val;
          //   //     }
          //   // }
          // })
          jobs
            .map((val, id) => {
              return (
                <Container key={id}>
                  <Row>
                    <Col md="auto">
                      <a href={val.redirect}>
                        <img src={val.logo} alt={val.title}></img>
                      </a>
                    </Col>
                    <Col>
                      <p>
                        <a href={val.redirect}>{val.title}</a>
                      </p>
                      {val.company}
                      <p>{val.location}</p>
                      <Moment format="DD/MM/YYYY">{val.postdate}</Moment>
                    </Col>
                    <Col md="auto">
                      <a href={val.redirect}>
                        <img src={val.logo} alt={val.title}></img>
                      </a>
                    </Col>
                    <Col>
                      <p>
                        <a href={val.redirect}>{val.title}</a>
                      </p>
                      {val.company}
                      <p>{val.location}</p>
                      <Moment format="DD/MM/YYYY">{val.postdate}</Moment>
                    </Col>
                  </Row>
                </Container>
              );
            })
          /* {jobs.map((items) => (
          <ul key={items.id}>
            <a href={items.redirect}><img src={items.logo} alt={items.title}></img></a>
            <a href={items.redirect}>{items.title}</a>
            <br />
            <Moment format="DD/MM/YYYY">{items.postdate}</Moment>
            <br />
            {items.location}
            <br />
            {items.company}
          </ul>
        ))} */
        }
      </div>
      <div className={classes.root}>
        <Pagination onChange={handleChange} count={totalPages} variant="outlined" shape="rounded" />
      </div>
    </Container>
  );
}

export default FetchData;
