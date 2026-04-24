const SRP_question = `UML Modelling Question – Single Responsibility Principle

Single Responsibility Principle (SRP):
A class should have only one reason to change.

An online learning platform manages student enrollments, grading, and report generation. The system was designed quickly to meet early delivery requirements and is now becoming difficult to maintain as features evolve.

Existing UML Design
+--------------------------------+
|        StudentManager          |
+--------------------------------+
| - studentId                    |
| - studentName                  |
| - grades                       |
+--------------------------------+
| + enrollStudent()              |
| + calculateGrade()             |
| + generateReport()             |
| + saveToDatabase()             |
| + sendEmailNotification()      |
+--------------------------------+


The StudentManager class is responsible for handling student data, academic logic, persistence, and communication.

Task

Redesign the UML class diagram to better align with the Single Responsibility Principle.
Your design should reorganize responsibilities into appropriate classes and clearly show relationships using UML constructs.`
