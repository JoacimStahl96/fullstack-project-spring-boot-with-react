package students.courses.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

/*
    Creates the student table a.k.a. O.R.M class
 */

@Entity(name = "students")
public class StudentEntity {

    @Id
    @GeneratedValue
    @JsonIgnore
    private long id;

    @JsonProperty("student_id")
    @Column(length = 100, nullable = false, unique = true)
    private String studentId;

    @Column(length = 100, nullable = false)
    @Size(min = 2, max = 100)
    private String name;

    @JsonProperty("last_name")
    @Column(length = 100, nullable = false)
    @Size(min = 2, max = 100)
    private String lastName;

    @Column
    @Min(1)
    private Integer age;

    @Column(nullable = false)
    private boolean present = false;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }
}
