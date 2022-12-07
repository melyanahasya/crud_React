import axios from "axios";
import React, { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "../style/edit.css"; // memanggil file css
import Swal from "sweetalert2";

function Edit() {
  const param = useParams(); // mengambil nilai parameter yg ada di URL browser
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarBuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setTahunTerbit(newBook.tahunTerbit);
        setPengarang(newBook.pengarang);
      })
      .catch((error) => {
        alert("terjadi kesalahan sir" + error);
      });
  }, []);

  const submitActionHandler = async (event) => {
    event.preventDefault(); // untuk melakukan reload (hanya dalam 1 file saja)
    await Swal.fire({
      title: "Are you sure?",
      text: "if true you can click Ok",
      icon: "question",
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put("http://localhost:8000/daftarBuku/" + param.id, {
            judul: judul,
            deskripsi: deskripsi,
            tahunTerbit: tahunTerbit,
            pengarang: pengarang,
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.reload();
        }
      })
      .then(() => {
        history.push("/");
        window.location.reload(); // melakukan reload
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  return (
    <div className="edit mx-5">
      <div className="container my-5">
        <Form onSubmit={submitActionHandler}>
          <div className="name mb-3">
            <Form.Label>
              <strong>Judul</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="place-of-birth mb-3">
            <Form.Label>
              <strong>Deskripsi</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
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
                placeholder="TahunTerbit"
                value={tahunTerbit}
                onChange={(e) => setTahunTerbit(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="birth date mb-3">
            <Form.Label>
              <strong>Pengarang</strong>
            </Form.Label>
            <div className="d-flex gap-3">
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="text"
                  value={pengarang}
                  onChange={(e) => setPengarang(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center mt-2">
            {/* button untuk meng submit */}
            <button className="buton btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Edit;
