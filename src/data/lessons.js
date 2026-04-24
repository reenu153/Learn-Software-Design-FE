// src/data/lessons.js

import { i } from 'framer-motion/client'
import { OCP_Question } from './Questions/OCP'

export const lessons = [
   {
      id: 'basics',
      type: 'uml',
      title: 'Class Diagram Basics',
      description: 'Learn how to model classes, attributes, and methods.',
      xp: 50,
      unlocked: true,
   },
   {
      type: 'uml',
      id: 'relationships',
      title: 'Relationships',
      description:
         'Practice aggregation, composition, association, inheritance, etc.',
      xp: 50,
      unlocked: false,
   },
   {
      id: 'abstractions',
      type: 'design-principles',
      title: 'Abstraction',
      description:
         'Understand how to simplify complex systems using abstraction.',
      question:
         'You are designing a drawing application. The app supports multiple shapes: Circle, Rectangle, Triangle. All shapes can be drawn on the screen (draw()) and calculate their area (calculateArea()). Design a UML class diagram to represent the system. Organize the classes in a way that avoids repeating the same methods for each shape. Hint: Think about what all shapes have in common and use relationships in UML to reduce duplication.',
      xp: 80,
      unlocked: false,
   },
   {
      id: 'modularity',
      type: 'design-principles',
      title: 'Modularity',
      description: 'Understand how to break systems into manageable modules.',
      xp: 80,
      unlocked: false,
   },
   {
      id: 'low-coupling',
      type: 'design-principles',
      title: 'Low Coupling',
      description: 'Learn techniques to minimize dependencies between modules.',
      xp: 80,
      unlocked: false,
   },
   {
      type: 'design-principles',
      title: 'High Cohesion',
      description:
         'Learn how to keep related functionalities together within modules.',
      xp: 80,
      unlocked: false,
   },
   {
      id: 'srp',
      type: 'solid',
      title: 'Single Responsibility Principle',
      description:
         'Create a correct SRP-compliant design from a real-world scenario.',
      xp: 60,
      // question: SRP_question,
      unlocked: false,
   },

   {
      id: 'ocp',
      type: 'solid',
      title: 'Open Closed Principle',
      description: 'Learn how to extend behavior without modifying classes.',
      xp: 70,
      question: OCP_Question,
      unlocked: false,
   },
   {
      id: 'lsp',
      type: 'solid',
      title: 'Liskov Substitution Principle',
      description:
         'Ensure derived classes can substitute base classes without issues.',
      xp: 70,
      // question: LSP_Question,
      unlocked: false,
   },
   {
      id: 'isp',
      type: 'solid',
      title: 'Interface Segregation Principle',
      description:
         'Design specific interfaces to avoid forcing classes to implement unused methods.',
      xp: 70,
      unlocked: false,
   },
   {
      id: 'dip',
      type: 'solid',
      title: 'Dependency Inversion Principle',
      description:
         'Depend on abstractions rather than concrete implementations.',
      xp: 70,
      unlocked: false,
   },
]
