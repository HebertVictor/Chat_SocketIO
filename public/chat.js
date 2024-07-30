const room = window.location.pathname.replace(/\//g, "");
const socket = io(`http://localhost:3000/${room}`);

let user = null;

socket.on("update_messages", (messages) => {
  updateMessagesOnScreen(messages);
});

function updateMessagesOnScreen(messages) {
  console.log(messages);
  const div_messages = document.querySelector("#messages");
  let message_list = `<ul>`;
  messages.forEach((message) => {
    message_list += `<li style="color:${message.color};">${message.user}: ${message.msg}</l1>`;
  });

  message_list += `</ul>`;

  div_messages.innerHTML = message_list;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#message_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!user) {
      alert("define a user");
      return;
    }

    const message = document.forms["message_form_name"]["msg"].value;
    document.forms["message_form_name"]["msg"].value = "";

    socket.emit("new_message", {
      user: user,
      msg: message,
      color: color,
    });
  });

  const userForm = document.querySelector("#user_form");
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    user = document.forms["user_form_name"]["user"].value;
    color = randomColor();

    userForm.parentNode.removeChild(userForm);
  });
});

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
