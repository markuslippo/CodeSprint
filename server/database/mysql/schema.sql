CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coding_tasks (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    language VARCHAR(50) NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO coding_tasks (language, difficulty, content)
VALUES ('python', 'easy', 
'num1 = int(input("Enter first number: "))\nnum2 = int(input("Enter second number: "))\nprint("Sum:", num1 + num2)\nprint("Difference:", num1 - num2)\nprint("Product:", num1 * num2)\nprint("Quotient:", num1 / num2)');
