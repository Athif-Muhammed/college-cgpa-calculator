#include <stdio.h>
#include <ctype.h>

/* Grade to Point conversion (S=10, A=9, B=8, C=7, D=6, E=5, F=0) */
int gradeToPoint(char grade) {
    switch (toupper(grade)) {
        case 'S': return 10;
        case 'A': return 9;
        case 'B': return 8;
        case 'C': return 7;
        case 'D': return 6;
        case 'E': return 5;
        case 'F': return 0;
        default:  return -1;
    }
}

/* Print grade scale */
void printGradeScale() {
    printf("\n  Grade Scale: S=10 | A=9 | B=8 | C=7 | D=6 | E=5 | F=0 (Fail)\n\n");
}

/* Performance remark based on GPA */
void printPerformance(float gpa) {
    printf("  Performance    : ");
    if (gpa >= 8.5) {
        printf("First Class with Distinction\n");
    } else if (gpa >= 6.75) {
        printf("First Class\n");
    } else if (gpa >= 5.5) {
        printf("Second Class\n");
    } else if (gpa >= 5.0) {
        printf("Pass Class\n");
    } else {
        printf("Fail / Needs Improvement\n");
    }
}

/* Generic SGPA Calculator */
float calculateSGPA(char subjects[][60], float credits[], int numSubjects) {
    char grade;
    int point;
    float totalPoints = 0.0;
    float totalCredits = 0.0;

    printGradeScale();

    for (int i = 0; i < numSubjects; i++) {
        printf("  %d. %-45s (Credits: %.1f) -> Enter Grade: ", 
               i + 1, subjects[i], credits[i]);

        do {
            scanf(" %c", &grade);
            point = gradeToPoint(grade);
            if (point == -1) {
                printf("     Invalid! Enter S, A, B, C, D, E, or F: ");
            }
        } while (point == -1);

        totalPoints += credits[i] * point;
        totalCredits += credits[i];
    }

    float sgpa = totalPoints / totalCredits;
    float percentage = sgpa * 9.5;

    printf("\n  --------------------------------------------------");
    printf("\n  Total Credit Points : %.2f", totalPoints);
    printf("\n  Total Credits       : %.1f", totalCredits);
    printf("\n  SGPA                : %.2f / 10.00", sgpa);
    printf("\n  Percentage          : %.2f%%", percentage);
    printf("\n");
    printPerformance(sgpa);
    printf("  --------------------------------------------------\n");

    return sgpa;
}

/* Semester 1 */
float semester1() {
    printf("\n==================================================\n");
    printf("  SEMESTER 1 - First Year (Revision 2021)\n");
    printf("==================================================\n");

    char subjects[8][60] = {
        "Communication Skills in English",
        "Mathematics I",
        "Applied Physics I",
        "Applied Chemistry",
        "Engineering Graphics",
        "Applied Chemistry Lab",
        "Introduction to IT Systems Lab",
        "Sports and Yoga"
    };
    float credits[8] = {4.0, 5.0, 3.0, 3.0, 1.5, 1.0, 2.0, 1.0};

    return calculateSGPA(subjects, credits, 8);
}

/* Semester 2 */
float semester2() {
    printf("\n==================================================\n");
    printf("  SEMESTER 2 - First Year (Revision 2021)\n");
    printf("==================================================\n");

    char subjects[8][60] = {
        "Mathematics II",
        "Applied Physics II",
        "Fundamentals of Electrical & Electronics Engg",
        "Problem Solving and Programming",
        "Communication Skills in English Lab",
        "Applied Physics Lab",
        "Engineering Workshop Practice",
        "Summer Internship I"
    };
    float credits[8] = {4.0, 3.0, 3.0, 3.0, 1.5, 1.0, 1.5, 2.0};

    return calculateSGPA(subjects, credits, 8);
}

/* Semester 3 */
float semester3() {
    printf("\n==================================================\n");
    printf("  SEMESTER 3 - Computer Engineering\n");
    printf("==================================================\n");

    char subjects[8][60] = {
        "Computer Organisation",
        "Programming in C",
        "Database Management Systems",
        "Digital Computer Fundamentals",
        "Programming in C Lab",
        "Database Management System Lab",
        "Digital Computer Fundamentals Lab",
        "Web Technology Lab"
    };
    float credits[8] = {4.0, 3.0, 3.0, 3.0, 1.5, 1.5, 1.5, 2.5};

    return calculateSGPA(subjects, credits, 8);
}

/* Semester 4 */
float semester4() {
    printf("\n==================================================\n");
    printf("  SEMESTER 4 - Computer Engineering\n");
    printf("==================================================\n");

    char subjects[8][60] = {
        "Object Oriented Programming",
        "Computer Communication and Networks",
        "Data Structures",
        "Object Oriented Programming Lab",
        "Web Programming Lab",
        "Data Structures Lab",
        "Minor Project",
        "Summer Internship II"
    };
    float credits[8] = {4.0, 3.0, 4.0, 1.5, 2.5, 1.5, 2.0, 3.0};

    return calculateSGPA(subjects, credits, 8);
}

/* Semester 5 */
float semester5() {
    printf("\n==================================================\n");
    printf("  SEMESTER 5 - Computer Engineering\n");
    printf("==================================================\n");

    char subjects[7][60] = {
        "Embedded System and Real Time OS",
        "Operating System",
        "Virtualisation Technology & Cloud Computing",
        "Embedded Systems and Real Time OS Lab",
        "System Administration Lab",
        "Virtualisation Technology & Cloud Computing Lab",
        "Seminar"
    };
    float credits[7] = {4.0, 4.0, 4.0, 1.5, 1.5, 1.5, 1.0};

    return calculateSGPA(subjects, credits, 7);
}

/* Semester 6 */
float semester6() {
    printf("\n==================================================\n");
    printf("  SEMESTER 6 - Computer Engineering\n");
    printf("==================================================\n");

    char subjects[7][60] = {
        "Entrepreneurship and Startup",
        "Internet of Things",
        "Open Elective",
        "Computer Network Engineering Lab",
        "Smart Device Programming Lab",
        "Internet of Things Lab",
        "Major Project"
    };
    float credits[7] = {4.0, 4.0, 4.0, 2.5, 1.5, 1.5, 4.0};

    return calculateSGPA(subjects, credits, 7);
}

/* CGPA Calculator */
void calculateCGPA() {
    int numSems;
    float sgpa;
    float totalSGPA = 0.0;

    printf("\n==================================================\n");
    printf("  CGPA CALCULATOR\n");
    printf("==================================================\n");

    printf("How many semesters have you completed? (1 to 6): ");
    scanf("%d", &numSems);

    if (numSems < 1 || numSems > 6) {
        printf("Please enter a number between 1 and 6.\n");
        return;
    }

    printf("\nEnter your SGPA for each semester:\n");
    for (int i = 1; i <= numSems; i++) {
        printf("  Semester %d SGPA: ", i);
        scanf("%f", &sgpa);

        if (sgpa < 0.0 || sgpa > 10.0) {
            printf("  Invalid! SGPA must be between 0 and 10. Try again.\n");
            i--; // repeat current semester
            continue;
        }

        totalSGPA += sgpa;
    }

    float cgpa = totalSGPA / numSems;
    float percentage = cgpa * 9.5;

    printf("\n  --------------------------------------------------");
    printf("\n  Semesters Completed : %d", numSems);
    printf("\n  Cumulative CGPA     : %.2f / 10.00", cgpa);
    printf("\n  Equivalent Percentage: %.2f%%", percentage);
    printf("\n");
    printPerformance(cgpa);
    printf("  --------------------------------------------------\n");
}

/* Main Function */
int main() {
    int choice;

    while (1) {
        printf("\n==================================================\n");
        printf("       POLYCGPA - COMPUTER ENGINEERING           \n");
        printf("==================================================\n");
        printf("  1. Calculate SGPA - Semester 1\n");
        printf("  2. Calculate SGPA - Semester 2\n");
        printf("  3. Calculate SGPA - Semester 3\n");
        printf("  4. Calculate SGPA - Semester 4\n");
        printf("  5. Calculate SGPA - Semester 5\n");
        printf("  6. Calculate SGPA - Semester 6\n");
        printf("  7. Calculate CGPA (All Semesters)\n");
        printf("  0. Exit\n");
        printf("==================================================\n");
        printf("Enter your choice (0-7): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: semester1(); break;
            case 2: semester2(); break;
            case 3: semester3(); break;
            case 4: semester4(); break;
            case 5: semester5(); break;
            case 6: semester6(); break;
            case 7: calculateCGPA(); break;
            case 0:
                printf("\nThank you for using PolyCGPA Calculator! Goodbye!\n\n");
                return 0;
            default:
                printf("\n[!] Invalid choice. Please enter a number between 0 and 7.\n");
        }
    }

    return 0;
}
