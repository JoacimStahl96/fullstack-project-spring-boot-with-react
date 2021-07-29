import React, { useState } from "react";

const CreateNewStudent = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState(5);
	const [present, setPresent] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();

		const postStudents = async () => {
			const resp = await fetch("http://localhost:8080/students", {
				method: "POST",
				mode: "cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: firstName,
					last_name: lastName,
					age: age,
					present: present,
				}),
			});
			if (resp.status !== 201) {
				alert("Please give proper information");
			}

			const createdStudent = await resp.json();
			console.log(createdStudent);
			props.setStudents((prevStudentList) => [
				...prevStudentList,
				createdStudent,
			]);
			// simple but good way to reset the input fields after a student is created
			setFirstName("");
			setLastName("");
			setAge(5);
			setPresent(false);
		};
		postStudents();
	};

	return (
		<form onSubmit={submitHandler}>
			<h3 className="form-title">Add a new student</h3>
			<div className="divCreateStudent">
				<label>Name</label>
				<input
					id="fName"
					placeholder="First name"
					required="required"
					type="text"
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
				></input>
			</div>

			<div className="divCreateStudent">
				<label>Lastname</label>
				<input
					id="lName"
					placeholder="Lastname"
					required="required"
					type="text"
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
				></input>
			</div>

			<div className="divCreateStudent">
				<label>Age</label>
				<input
					id="age"
					placeholder="age"
					required="required"
					type="number"
					min="5"
					onChange={(e) => setAge(e.target.value)}
					value={age}
				></input>
			</div>

			<label>Present</label>
			<input
				id="present"
				type="checkbox"
				defaultChecked={present}
				onChange={() => setPresent(!present)}
			></input>
			<button type="submit">Create</button>
		</form>
	);
};

export default CreateNewStudent;
