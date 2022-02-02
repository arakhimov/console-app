const list = document.querySelector(".list-group");
list.addEventListener("click", ({ target }) => {
  const id = target.dataset.id;
  if (target.dataset.type === "remove") {
    remove(id);
    target.closest(".list-group-item").remove();
  } else if (target.dataset.type === "edit") {
    const $note = target
      .closest(".list-group-item")
      .querySelector(".note-text");
    const editNote = prompt("Введите текст заметки");
    const title = editNote || $note.textContent;
    edit(title, id).then(() => ($note.textContent = title));
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(title, id) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ title, id })
  });
}
