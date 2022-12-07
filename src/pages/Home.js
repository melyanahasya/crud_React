import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/home.css"; // mengimport file css
import Swal from "sweetalert2";

export default function Table() {
    const [buku, setBuku] = useState([]); // State berfungsi untuk menyimpan data sementara
    

    const getAll = () => {
        axios // axios berfungsi untuk request data melalui http
        .get("http://localhost:8000/daftarBuku") // mengambil data dari link tersebut
        .then((res) => {  
            setBuku(res.data); 
        }).catch((error) => {
            alert("terjadi kesalahan" + error);
        });
    };

    const deleteUser = async (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8000/daftarBuku/" + id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          window.location.reload();
        }
      })
        getAll();
    };

    useEffect(() => {
        getAll(); // mengambil dari const getAll 
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
              {localStorage.getItem("id") !== null ? <th>Action</th> : <></>} 
            </tr>
          </thead>
          <tbody>
            {buku.map((book, index) => { //map digunakan untuk proses looping
              return (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.judul}</td>
                  <td>{book.deskripsi}</td>
                  <td>{book.tahunTerbit}</td>
                  <td>{book.pengarang}</td>
                  {localStorage.getItem("id") !== null ? (
                  <td className="action">
                    <a href={"/edit/" + book.id}>
                    <button variant="warning"  style={{backgroundColor:"#8EC3B0", border:"none", color: "white"}} className="mx-1">edit</button> 
                    </a>||
                    <button variant="danger" style={{backgroundColor:"#FC3C3C", border:"none", color: "white"}}
                      className="mx-1"
                      onClick={() => deleteUser(book.id)}
                    >
                      hapus
                    </button>
                  </td>
                  ) : ( 
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
