package com.kipngeno.StudeApp.service;

import com.kipngeno.StudeApp.model.Student;
import com.kipngeno.StudeApp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

   private final StudentRepository studentRepository;

   public StudentServiceImpl(StudentRepository studentRepository) {
       this.studentRepository = studentRepository;
   }

    @Override
    public Student saveStudent(Student student) {
         return studentRepository.save(student);
    }
}
