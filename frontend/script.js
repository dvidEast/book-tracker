const API_BASE = 'http://localhost:3001/books'; 

document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent refreshing page after submitting form (handle it in js)

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    // POST request to [/books] to create a new book in the database
    await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title, author, status}) // body is content in current form (frontend)
    });

    e.target.reset(); // clears all input fields after submissioon
    loadBooks(); // calls seperate function that reloads books from database and displays them on the page
});

// when user selects a new status in the filter dropdown, reloads the book list (filtered by status)
document.getElementById('filter').addEventListener('change', () => {
    loadBooks();
});

async function loadBooks() {
    const status = document.getElementById('filter').value;
    let url = API_BASE;

    if (status) {
        url += `?status=${status}`;
    }

    const res = await fetch(url);
    const books = await res.json();

    const list = document.getElementById('book-list');
    list.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${book.title}</strong> by ${book.author || 'Unknown'} (${book.status})
            </div>

            <button onclick="deleteBook(${book.id})>❌</button>
        `;
        list.appendChild(li);
    });
};

async function deleteBook(id) {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}

// initial load
loadBooks();