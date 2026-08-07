import { getCollection } from "astro:content";

export async function getBooks() {
    return await getCollection("engineering-books");
}

export async function getCurrentlyReading() {
    const books = await getBooks();

    return books.filter(
        (book) =>
            book.data.started &&
            !book.data.finished
    );
}

export async function getReadingList() {
    const books = await getBooks();

    return books.filter(
        (book) => !book.data.started
    );
}

export async function getReadBooks() {
    const books = await getBooks();

    return books
        .filter((book) => book.data.finished)
        .sort(
            (a, b) =>
                b.data.finished!.getTime() -
                a.data.finished!.getTime()
        );
}
