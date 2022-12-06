import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/home.css";

export default function Table() {
    const [buku, setBuku] = useState([]); 
    
    const getAll = () => {
        axios
        .get("http://localhost:8000/daftarBuku")
        .then((res) => {
            setBuku(res.data); 
        }).catch((error) => {
            alert("terjadi kesalahan" + error);
        });
    };

    const deleteUser = async (id) => {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        alert("user berhasil di hapus");
        getAll();
        window.location.reload();
    };

    useEffect(() => {
        getAll();  
      }, []);
    

  return (
    <div>
      <div className="container my-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Tahun terbit</th>
              <th>Pengarang</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buku.map((book, index) => {
              return (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.judul}</td>
                  <td>{book.deskripsi}</td>
                  <td>{book.tahunTerbit}</td>
                  <td>{book.pengarang}</td>
                  <td className="action">
                    <a href={"/edit/" + book.id}>
                    <button variant="warning"  style={{backgroundColor:"orange", border:"none", color: "white"}} className="mx-1">edit</button> 
                    </a>||
                    <button variant="danger" style={{backgroundColor:"red", border:"none", color: "white"}}
                      className="mx-1"
                      onClick={() => deleteUser(book.id)}
                    >
                      hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
