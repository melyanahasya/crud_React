import axios from "axios";
import React, { useState } from "react";
import { InputGroup, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useHistory } from "react-router-dom";
import "../style/navbar.css"
import Swal from "sweetalert2";

export default function NavigationNavbar() {
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addUser = async (e) => {
    // untuk menambahkan
    e.preventDefault(); // melakukan reload yg hanya dalam satu file

    const data = {
      judul: judul,
      deskripsi: deskripsi,
      tahunTerbit: tahunTerbit,
      pengarang: pengarang,
    };

    await axios.post("http://localhost:8000/daftarBuku", data);
    Swal.fire("Good job!", "You clicked the button!", "success")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert("terjadi kesalahan" + error);
      });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div className="navbar">
      <Navbar  expand="lg">
        <Container>
          <Navbar.Brand href="#home">Perpustakaan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>

              {localStorage.getItem("id") !== null ? (
                <>
                  <li className="nav-item float right ">
                    <button className="btn" onClick={handleShow}>
                      Tambah 
                    </button>
                  </li>
                  <li>
                    <button className="nav-item float-right border-0 bg-transparent">
                      <a className="btn" onClick={logout}>Logout</a>
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item float-right border-0 bg-transparent">
                  <a className="btn" href="/login">
                    Login
                  </a>
                </li>
              )}

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor: "#CCD6A6"}}>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser} method="POST">
            <div className="mb-3">
              <Form.Label>
                <strong>Judul</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <div className="mb-3">
              <Form.Label>
                <strong>Pengarang</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan pengarang"
                  value={pengarang}
                  onChange={(e) => setPengarang(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <div className="mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <div className="mb-3">
              <Form.Label>
                <strong>Tahun Terbit</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="date"
                  placeholder="Masukkan Tahun Terbit"
                  value={tahunTerbit}
                  onChange={(e) => setTahunTerbit(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <button className="mx-1 button-btl btn" onClick={handleClose}>
              Close
            </button>
            <button
              type="submit"
              className="mx-1 button-btl btn"
              onClick={handleClose}
            >
              save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
