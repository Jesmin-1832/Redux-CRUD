import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adddata, deleterecord, initializeData, updateRecord } from "../Redux/Action/PersonAction";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';


function Person() {

    let PersonData = useSelector(state => state.PersonRecord.person);
    let [person, setPerson] = useState({});
    let dispatch = useDispatch();
    let [active, setActive] = useState(false);
    let [id, setId] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('Person'));
        if (localData) {
            dispatch(initializeData(localData));
        }
    }, [dispatch]);

    const submitData = (e) => {
        e.preventDefault();
        if (!person.title) {
            alert("Please Enter Title");
            return;
        }
        else if (person.title.length < 3) {
            alert("Title must be at least 3  characters long.");
        }
        else if (!person.price || !person.old_price) {
            alert("Price and Old is required..")
        }
        else if (isNaN(person.price) || isNaN(person.old_price)) {
            alert("Enter Only Number value in Price and Old Price.")
        }
        else if (!person.image) {
            alert("Image Path is required")
        }
        else if (!/^https?:\/\/\S+\.\S+/.test(person.image)) {
            alert("Please enter a valid URL for the image path.");
        }
        else if (!person.description) {
            alert("Description is Required!");
        }
        else if (person.description.length < 8) {
            alert("Description must be at least 8 characters long.");
        }
        else {
            if (active) {
                dispatch(updateRecord(id, person));
                const updatedData = PersonData.map((item) => item.id === id ? person : item);
                localStorage.setItem('Person', JSON.stringify(updatedData));
            }
            else {
                person.id = Math.round(Math.random() * 10000);
                dispatch(adddata(person));
                const updatedData = [...PersonData, person];
                localStorage.setItem('Person', JSON.stringify(updatedData));
            }
            setPerson({});
            setActive(false);
            alert("Data Submit Successfully..!")
        }
    };


    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let newOb = { ...person, [name]: value };
        setPerson(newOb);
    }

    const deleterecord1 = (id) => {
        dispatch(deleterecord(id));
        const updatedData = PersonData.filter(item => item.id !== id);
        localStorage.setItem('Person', JSON.stringify(updatedData));
    };

    const updaterecord = (id) => {
        const selectedPerson = PersonData.find((person) => person.id === id);
        if (selectedPerson) {
            setPerson(selectedPerson);
            setActive(true);
            setId(id);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortName = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    let filteredData = PersonData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredData = filteredData.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return sortOrder === "asc" ? comparison : comparison * -1;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <h2 className="m-3">◂ Add Data ▸</h2>
            <form method="post" onSubmit={(e) => submitData(e)}>
                <Table striped bordered hover variant="warning" className="w-50 mx-auto">
                    <tbody>
                        <tr>
                            <td>Enter Title : </td>
                            <td><input type="text" name="title" placeholder="Enter Product Title.." value={person.title ? person.title : ""} onChange={(e) => getInputValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Enter Price : </td>
                            <td><input type="text" name="price" placeholder="Enter Product Price.." value={person.price ? person.price : ""} onChange={(e) => getInputValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Enter Old Price : </td>
                            <td><input type="text" name="old_price" placeholder="Enter Product Old Price.." value={person.old_price ? person.old_price : ""} onChange={(e) => getInputValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Enter Image Link : </td>
                            <td><input type="text" name="image" placeholder="Enter Product Image Link.." value={person.image ? person.image : ""} onChange={(e) => getInputValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Enter Description : </td>
                            <td><textarea name="description" className="px-2  p-1" placeholder="Enter Product Description.." cols={40} value={person.description ? person.description : ""} onChange={(e) => getInputValue(e)} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" className="btn btn-primary w-25 " value={active ? "Edit Data" : "Add Data"} name="submit" /></td>
                        </tr>
                    </tbody>
                </Table>

            </form>
            <br />
            <h2>◂ View Data ▸</h2><br />
            <Container>
                <div className="d-flex justify-content-evenly align-items-center mb-4">
                    <div>
                        <input type="text" placeholder="Search Product By Title.." className="p-2 border-warning rounded w-100" value={searchQuery} onChange={handleSearch} />
                    </div>
                    <div>
                        <Button className="bg-warning-subtle text-dark" onClick={handleSortName}> {sortOrder === "asc" ? "⇅" : "⇵"} Sort By Name</Button>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly">
                    {currentData.map((v, i) => {
                        return (
                            <Card style={{ width: '300px', height: "450px" }} className="bg-warning-subtle mb-5 p-1">
                                <Card.Img variant="top" src={v.image} className="w-100 h-50 p-1  object-fit-contain" />
                                <Card.Body>
                                    <Card.Title className="text-capitalize"><b>{v.title}</b></Card.Title>
                                    <Card.Text>₹.{v.price}/- (<del>{v.old_price}</del>) </Card.Text>
                                    <Card.Text style={{ height: "50px", overflow: "scroll" }}>{v.description}</Card.Text>
                                    <Button variant="success" className="mx-2" onClick={(e) => updaterecord(v.id)}>Update</Button>
                                    <Button variant="danger" className="mx-2" onClick={(e) => deleterecord1(v.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                <Pagination className="justify-content-center mt-3">
                    {pageNumbers.map(number => (
                        <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </div >
    )
}

export default Person;