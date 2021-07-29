import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import UpdateStudents from "./components/UpdateStudents";
import Students from "./components/Students";
import CreateNewStudent from "./components/CreateNewStudent";
import UpdateTitle from "./components/UpdateTitle";

const App = () => {
	const [view, setView] = useState("startPage");
	const [students, setStudents] = useState([]);
	const [specificStudent, setSpecificStudent] = useState({});

	useEffect(() => {
		const fetchUsers = async () => {
			const resp = await fetch("http://localhost:8080/students");
			const fetchedStudents = await resp.json();
			setStudents(fetchedStudents);
		};
		fetchUsers();
	}, []);

	const deleteStudentInEdit = async (studentId) => {
		const response = await fetch(
			`http://localhost:8080/students/${studentId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (response.ok) {
			setStudents((prevStudents) => {
				return prevStudents.filter((prevStudent) => prevStudent !== studentId);
			});
		}
	};

	const updateStudent = async (studentId, name, lastName, age, present) => {
		const response = await fetch(
			`http://localhost:8080/students/${studentId}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name,
					last_name: lastName,
					age: age,
					present: present,
				}),
			}
		);
		if (response.ok) {
			console.log("student successfully changed.");
		}
	};

	switch (view) {
		case "editUpdate":
			return (
				<div className="wrapper">
					<UpdateTitle setView={setView} />
					<UpdateStudents
						setView={setView}
						deleteStudentInEdit={deleteStudentInEdit}
						updateStudent={updateStudent}
						specificStudent={specificStudent}
					/>
				</div>
			);

		default:
			return (
				<div className="wrapper">
					<Title setView={setView} />
					<Students
						students={students}
						setStudents={setStudents}
						setSpecificStudent={setSpecificStudent}
						setView={setView}
					/>
					<CreateNewStudent setStudents={setStudents} />
				</div>
			);
	}
};
export default App;
