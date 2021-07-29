import React, { useState } from "react";

const UpdateStudents = (props) => {
	const { name, last_name, age, present, student_id } = props.specificStudent;

	const [studentName, setStudentName] = useState(name);
	const [studentlastName, setStudentLastName] = useState(last_name);
	const [studentAge, setStudentAge] = useState(age);
	const [studentPresent, setStudentPresent] = useState(present);
	const studentId = student_id;

	const clickHandler = () => {
		props.setView("startPage");
	};
	const editHandler = () => {
		props.updateStudent(
			studentId,
			studentName,
			studentlastName,
			studentAge,
			studentPresent
		);
	};
	return (
		<div className="wrapper">
			<form onSubmit={() => editHandler()}>
				<h2 id="updateText" onClick={() => clickHandler()}>
					Edit or delete Student
				</h2>
				<div className="divCreateStudent">
					<label>
						Name{" "}
						<input
							id="editName"
							type="text"
							placeholder="Name"
							onChange={(e) => setStudentName(e.target.value)}
							value={studentName}
						/>
					</label>
				</div>
				<div className="divCreateStudent">
					<label>
						Last name{" "}
						<input
							id="editlastName"
							type="text"
							placeholder="Last name"
							onChange={(e) => setStudentLastName(e.target.value)}
							value={studentlastName}
						/>
					</label>
				</div>
				<div className="divCreateStudent">
					<label>
						Age{" "}
						<input
							id="editlastName"
							type="number"
							min="5"
							onChange={(e) => setStudentAge(e.target.value)}
							value={studentAge}
						/>
					</label>
				</div>
				<label htmlFor="present">
					<input
						type="checkbox"
						id="present"
						name="present"
						onChange={() => setStudentPresent(!studentPresent)}
						defaultChecked={studentPresent}
					></input>
					Present
				</label>
				<button className="btn" id="editBtn" type="submit">
					Edit
				</button>
				<button
					className="btn"
					id="deleteBtn"
					onClick={() => props.deleteStudentInEdit(studentId)}
				>
					Delete
				</button>
			</form>
		</div>
	);
};

export default UpdateStudents;
