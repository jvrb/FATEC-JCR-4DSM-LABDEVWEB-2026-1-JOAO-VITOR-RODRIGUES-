import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  const [selected, setSelected] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const courses = [...new Set(books.map(book => book.course))];
  const semesters = [...new Set(books.map(book => book.semester))];

const filteredBooks = books.filter(b =>
    (selected === "" || b.course === selected) &&
    (selectedSemester === "" || b.semester.toString() === selectedSemester.toString())
  );

  return (
    <>
      <Typography variant="h5">Filtrar por Disciplina e Semestre</Typography>

      <Select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Todas</MenuItem>

        {courses.map(course => (
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </Select>

       <Select
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Todos os semestres</MenuItem>
        {semesters.map(sem => (
          <MenuItem key={sem} value={sem}>
            {sem}º semestre
          </MenuItem>
        ))}
      </Select>


      {filteredBooks.map((book, idx) => (
        <Typography key={idx}>
          {book.title} - {book.course}
        </Typography>
      ))}
    </>
  );
}