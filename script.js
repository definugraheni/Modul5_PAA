$(document).ready(function () {
  function showSection(sectionId) {
    // Menyembunyikan semua form
    $("#create-form, #read-all, #read-id, #update-form, #delete-form").slideUp();
    // Menampilkan form yang dipilih
    $(sectionId).slideDown();
    $("#alertMessage").hide();
  }

  function showAlert(message, type = "info") {
    $("#alertMessage")
      .removeClass("alert-info alert-success alert-danger")
      .addClass(`alert-${type}`)
      .html(message)
      .slideDown(); // Menampilkan pesan alert dengan animasi slideDown
  }

  // Event handler untuk tombol navigasi
  $("#nav-create").click(function () {
    showSection("#create-form");
  });

  $("#nav-read-all").click(function () {
    showSection("#read-all");
  });

  $("#nav-read-id").click(function () {
    showSection("#read-id");
  });

  $("#nav-update").click(function () {
    showSection("#update-form");
  });

  $("#nav-delete").click(function () {
    showSection("#delete-form");
  });

  // Event handler untuk form create user
  $("#createUserForm").submit(function (event) {
    event.preventDefault();
    const name = $("#createName").val();
    const avatar = $("#createAvatar").val();
    $.ajax({
      url: "https://64fada7acb9c00518f7a4784.mockapi.io/users",
      method: "POST",
      data: { name, avatar },
      success: function (data) {
        showAlert(
          `User created successfully!<br>Name: ${data.name}<br>Avatar: <br><img src="${data.avatar}" class="user-avatar">`,
          "success"
        );
        $("#createUserForm")[0].reset();

        // Menampilkan user yang baru saja ditambahkan
        const newUserHtml = `<li class="list-group-item">ID: ${data.id}, Name: ${data.name}, Avatar: <img src="${data.avatar}" class="user-avatar"></li>`;
        $("#usersContainer").prepend(newUserHtml);
      },
      error: function (error) {
        showAlert("Error creating user: " + error.responseText, "danger");
      },
    });
  });

  // Event handler untuk tombol read all users
  $("#readUsersBtn").click(function () {
    $.ajax({
      url: "https://64fada7acb9c00518f7a4784.mockapi.io/users",
      method: "GET",
      success: function (data) {
        let usersHtml = '<ul class="list-group">';
        data.forEach(function (user) {
          usersHtml += `<li class="list-group-item">ID: ${user.id}, Name: ${user.name}, Avatar: <img src="${user.avatar}" class="user-avatar"></li>`;
        });
        usersHtml += "</ul>";
        $("#usersContainer").html(usersHtml);
        showAlert("Users fetched successfully!", "success");
      },
      error: function (error) {
        showAlert("Error fetching users: " + error.responseText, "danger");
      },
    });
  });

  // Event handler untuk form read user by ID
  $("#readUserForm").submit(function (event) {
    event.preventDefault();
    const id = $("#readId").val();
    $.ajax({
      url: `https://64fada7acb9c00518f7a4784.mockapi.io/users/${id}`,
      method: "GET",
      success: function (data) {
        const userHtml = `<div class="card">
                            <div class="card-body">
                                <h5 class="card-title">ID: ${data.id}</h5>
                                <p class="card-text">Name: ${data.name}</p>
                                <p class="card-text">Avatar: <img src="${data.avatar}" class="user-avatar"></p>
                            </div>
                          </div>`;
        $("#userContainer").html(userHtml);
        showAlert(
          `User fetched successfully!<br>ID: ${data.id}<br>Name: ${data.name}<br>Avatar: <br><img src="${data.avatar}" class="user-avatar">`,
          "success"
        );
      },
      error: function (error) {
        showAlert("Error fetching user: " + error.responseText, "danger");
      },
    });
  });

  // Event handler untuk form update user
  $("#updateUserForm").submit(function (event) {
    event.preventDefault();
    const id = $("#updateId").val();
    const name = $("#updateName").val();
    const avatar = $("#updateAvatar").val();
    $.ajax({
      url: `https://64fada7acb9c00518f7a4784.mockapi.io/users/${id}`,
      method: "PUT",
      data: { name, avatar },
      success: function (data) {
        showAlert(
          `User updated successfully!<br>ID: ${data.id}<br>New Name: ${data.name}<br>New Avatar: <br><img src="${data.avatar}" class="user-avatar">`,
          "success"
        );
        $("#updateUserForm")[0].reset();
      },
      error: function (error) {
        showAlert("Error updating user: " + error.responseText, "danger");
      },
    });
  });

  // Event handler untuk form delete user
  $("#deleteUserForm").submit(function (event) {
    event.preventDefault();
    const id = $("#deleteId").val();
    $.ajax({
      url: `https://64fada7acb9c00518f7a4784.mockapi.io/users/${id}`,
      method: "DELETE",
      success: function (data) {
        showAlert(`User deleted successfully!<br>ID: ${id}`, "success");
        $("#deleteUserForm")[0].reset();
      },
      error: function (error) {
        showAlert("Error deleting user: " + error.responseText, "danger");
      },
    });
  });
});