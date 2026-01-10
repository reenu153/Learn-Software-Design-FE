export const OCP_Question= `An e-commerce platform includes a Payment Processing System that supports different payment types such as Credit Card and PayPal. The system is expected to support additional payment methods in the future.

Existing UML Design (Violates Open–Closed Principle)

+----------------------------+
|     PaymentProcessor       |
+----------------------------+
| + processPayment(          |
|   type: String,            |
|   amount: double ): void   |
+----------------------------+

The processPayment() method uses conditional logic based on the payment type.

Task:
1. Identify the Open–Closed Principle violation.
2. Redesign the UML class diagram so new payment methods can be added without modifying existing classes.
3. Use appropriate UML constructs (interfaces/abstract classes, inheritance, dependencies).
`;
