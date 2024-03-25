
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(()=>{
    let currentTime = new Date();

    hrs.innerHTML = (currentTime.getHours() < 10 ?"0":"") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ?"0":"") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ?"0":"") + currentTime.getSeconds();
},1000)
jQuery(function ($) {
    let books = [];

    function addBook(data) {
        let table = $("#tabledata tbody");
        table.append(`
        <tr id="${data.id}" class="separator-line"> 
            <td style="background-color: #d3d3d3; color: black;">${data.nim}</td>
            <td style="background-color: #d3d3d3; color: black;">${data.nama}</td>
            <td style="background-color: #d3d3d3; color: black;">${data.alamat}</td>
            <td style="background-color: #d3d3d3; color: black;">
                <button class="btn btn-outline-success editBtn"  data-id="${data.nim}" >Edit</button>
                <button class="btn btn-outline-danger deleteBtn" data-id="${data.nim}">Delete</button>
            </td>
        </tr>
    `);
    }

    function clearform() {
        $(".nim").val("");
        $(".nama").val("");
        $(".alamat").val("");
    }

    function generateId() {
        return Math.floor(Math.random() * 1000000);
    }

    $(document).on("click", "#clearBtn", function () {
        clearform();
    });

    $(document).on("click", ".editBtn", function () {
        let bookId = $(this).data("id");
        let bookIndex = books.findIndex((data) => data.nim == bookId);
        let data = books[bookIndex];
    
        $("#editnama").val(data.nama);
        $("#editalamat").val(data.alamat);
        $("#edit").val(data.id);
    
        $("#editModal").modal("show");
    });
    

    $("#bookForm").submit(function (e) {
        e.preventDefault();

        let data = {
            id: generateId(),
            nim: $(".nim").val(),
            nama: $(".nama").val(),
            alamat: $(".alamat").val(),
        };
        alert("Mahasiswa Baru Telah Ditambahkan.")
        books.push(data);
        addBook(data);
        clearform();
    });

    $("#editForm").submit(function (e) {
        e.preventDefault();

        let bookId = $("#edit").val();
        let bookIndex = books.findIndex((data) => data.id == bookId);
        let data = books[bookIndex];

    
        data.nama = $("#editnama").val();
        data.alamat = $("#editalamat").val();

        let row = $(`#${data.id}`);
        row.find("td:eq(0)").text(data.nim);
        row.find("td:eq(1)").text(data.nama);
        row.find("td:eq(2)").text(data.alamat);

        alert("Data Mahasiswa Berhasil Di Perbaharui.")

        $("#editModal").modal("hide");
    });

    $(document).on("click", "#clsBtn", function () {
        
        $("#editModal").modal("hide");
    });

    $(document).on("click", ".deleteBtn", function () {
        let bookId = $(this).data("id");

        let bookIndex = books.findIndex((data) => data.nim == bookId);
        let data = books[bookIndex];

        if(confirm("Are you sure you want to delete this data?")){
            books.splice(bookIndex, 1);
            $(`#${data.id}`).remove();
            alert("Data Mahasiswa berhasil dihapus.")
        }
    });
});



   


  