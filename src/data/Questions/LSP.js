const LSP_Question = `UML Modelling Question – Liskov Substitution Principle

Liskov Substitution Principle (LSP):
Subtypes must be substitutable for their base types without altering correct program behavior.

A ride-sharing platform models different types of vehicles that can be assigned to trips. Every vehicle is expected to be able to start a trip, calculate fare, and report its availability. Some vehicles, however, operate under special constraints due to regulations or physical limitations.

The system relies on a common vehicle abstraction when assigning and managing trips, and new vehicle types are expected to be added in the future.

Task

Design a UML class diagram that models this system while correctly applying the Liskov Substitution Principle.
Your design should ensure that any specific vehicle type can replace the base vehicle abstraction without violating expected behavior, using appropriate UML constructs and relationships.`
