#include <stdio.h>
#include <string.h>
#include <ctype.h>

/* ---- Grade point lookup (simple switch on single char) ---- */
int gradeToPoint(char g) {
    switch (g) {
        case 'S': case 's': return 10;
        case 'A': case 'a': return 9;
        case 'B': case 'b': return 8;
        case 'C': case 'c': return 7;
        case 'D': case 'd': return 6;
        case 'E': case 'e': return 5;
        case 'F': case 'f': return 0;
        default:            return -1;
    }
}

/* ---- Print grade scale reference ---- */
void printGradeScale() {
    printf("\n  Grade Scale: S=10 | A=9 | B=8 | C=7 | D=6 | E=5 | F=0\n\n");
}

/* ---- Generic SGPA calculator for a semester ---- */
float calculateSGPA(char subjects[][60], int credits[], int numSubjects) {
    char grade;
    int  gp;
    int  totalCredits = 0;   /* Step 3: sum of all credits        */
    int  totalPoints  = 0;   /* Step 2: sum of (credit x GP)      */

    printGradeScale();

    /* Step 1: get grade for each subject */
    for (int i = 0; i < numSubjects; i++) {
        printf("  %d. %vc-40s (Credits: %d)  Grade: ",
               i + 1, subjects[i], credits[i]);

        do {
            scanf(" %c", &grade);          /* read single character */
            gp = gradeToPoint(grade);
            if (gp == -1)
                printf("  [!] Invalid! Enter S/A/B/C/D/E/F: ");
        } while (gp == -1);

        /* Step 2: credit x grade point */
        totalPoints  += credits[i] * gp;

        /* Step 3: add to total credits */
        totalCredits += credits[i];
    }

    /* Step 4: SGPA = Total Credit Points / Total Credits */
    float sgpa = (float)totalPoints / totalCredits;

    printf("\n  Total Credit Points : %d", totalPoints);
    printf("\n  Total Credits       : %d", totalCredits);
    printf("\n  *** SGPA = %d / %d = %.2f ***\n", totalPoints, totalCredits, sgpa);

    return sgpa;
}

float semester1() {
    printf("\n========================================\n");
    printf("  SEMESTER 1 - First Year (Common)\n");
    printf("========================================\n");

    char subjects[7][60] = {
        "Communicative English",
        "Mathematics - I",
        "Physics",
        "Applied Chemistry",
        "Engineering Graphics",
        "Introduction to IT Systems (Lab)",
        "Sports and Yoga"
    };
    int credits[7] = {3, 4, 3, 3, 3, 1, 1};

    return calculateSGPA(subjects, credits, 7);
}

float semester2() {
    printf("\n========================================\n");
    printf("  SEMESTER 2 - First Year (Common)\n");
    printf("========================================\n");

    char subjects[9][60] = {
        "Mathematics - II",
        "Physics - II",
        "Environmental Science",
        "Fundamentals of Elec. & Electronics Engg.",
        "Problem Solving and Programming",
        "Communicative English (Lab)",
        "Applied Physics (Lab)",
        "Elec. & Electronics Engg. (Lab)",
        "Problem Solving & Programming (Lab)"
    };
    int credits[9] = {4, 3, 3, 3, 3, 1, 1, 1, 1};

    return calculateSGPA(subjects, credits, 9);
}

float semester3() {
    printf("\n=================================================\n");
    printf("  SEMESTER 3 - Computer Engineering (2nd Year)\n");
    printf("=================================================\n");

    char subjects[8][60] = {
        "Data Structures using C",
        "Digital Techniques",
        "Computer Organization and Architecture",
        "Object Oriented Programming (C++)",
        "Discrete Mathematics",
        "Data Structures Lab",
        "Digital Techniques Lab",
        "OOP Lab"
    };
    int credits[8] = {4, 3, 3, 4, 3, 2, 1, 2};

    return calculateSGPA(subjects, credits, 8);
}

float semester4() {
    printf("\n=================================================\n");
    printf("  SEMESTER 4 - Computer Engineering (2nd Year)\n");
    printf("=================================================\n");

    char subjects[8][60] = {
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Microprocessor & Microcontroller",
        "Software Engineering",
        "DBMS Lab",
        "OS Lab",
        "Microprocessor Lab"
    };
    int credits[8] = {4, 4, 3, 3, 3, 2, 1, 2};

    return calculateSGPA(subjects, credits, 8);
}

float semester5() {
    printf("\n=================================================\n");
    printf("  SEMESTER 5 - Computer Engineering (3rd Year)\n");
    printf("=================================================\n");

    char subjects[8][60] = {
        "Web Technology",
        "Artificial Intelligence",
        "Computer Graphics & Animation",
        "Mobile Computing",
        "Advanced Java Programming",
        "Web Technology Lab",
        "AI Lab",
        "Advanced Java Lab"
    };
    int credits[8] = {4, 3, 3, 3, 3, 2, 1, 2};

    return calculateSGPA(subjects, credits, 8);
}
float semester6() {
    printf("\n=================================================\n");
    printf("  SEMESTER 6 - Computer Engineering (3rd Year)\n");
    printf("=================================================\n");

    char subjects[7][60] = {
        "Cloud Computing",
        "Cyber Security",
        "Machine Learning",
        "Internet of Things (IoT)",
        "Project Work",
        "Cloud Computing Lab",
        "ML / IoT Lab"
    };
    int credits[7] = {4, 3, 3, 3, 4, 1, 2};

    return calculateSGPA(subjects, credits, 7);
}
void calculateCGPA() {

    /* --- Step 1: variables we need --- */
    int   numSems;          /* how many semesters completed     */
    float sgpa;             /* SGPA entered for one semester    */
    float totalSGPA = 0;    /* running sum of all SGPAs         */
    float cgpa;             /* final CGPA answer                */

    printf("\n--- CGPA CALCULATOR ---\n");

    /* --- Step 2: ask how many semesters --- */
    printf("How many semesters have you completed? (1 to 6): ");
    scanf("%d", &numSems);

    /* basic check */
    if (numSems < 1 || numSems > 6) {
        printf("Please enter a number between 1 and 6.\n");
        return;
    }

    /* --- Step 3: take SGPA for each semester and add them --- */
    printf("\nEnter your SGPA for each semester:\n");

    for (int i = 1; i <= numSems; i++) {

        printf("  Semester %d SGPA: ", i);
        scanf("%f", &sgpa);

        /* make sure SGPA is valid */
        if (sgpa < 0 || sgpa > 10) {
            printf("  Invalid! SGPA must be 0 to 10. Try again.\n");
            i--;          /* repeat this semester */
            continue;
        }

        totalSGPA = totalSGPA + sgpa;   /* add to total */
    }

    /* --- Step 4: calculate CGPA --- */
    cgpa = totalSGPA / numSems;

    /* --- Show the result --- */
    printf("\n-----------------------\n");
    printf("Total SGPA Added : %.2f\n", totalSGPA);
    printf("Semesters Done   : %d\n",   numSems);
    printf("CGPA = %.2f / %d = %.2f\n", totalSGPA, numSems, cgpa);
    printf("-----------------------\n");

    /* --- Performance remark using simple if-else --- */
    printf("Your Grade: ");
    if (cgpa >= 9.0) {
        printf("S  - Superior\n");
    } else if (cgpa >= 8.0) {
        printf("A  - Excellent\n");
    } else if (cgpa >= 7.0) {
        printf("B  - Very Good\n");
    } else if (cgpa >= 6.0) {
        printf("C  - Good\n");
    } else if (cgpa >= 5.0) {
        printf("D  - Pass\n");
    } else {
        printf("F  - Fail. Keep trying!\n");
    }
}

//MAIN
int main() {
    int choice;

    printf("\n");
    printf("  ============================================================\n");
    printf("  |      CGPA CALCULATOR - POLYTECHNIC                      |\n");
    printf("  |      Branch: Computer Engineering                        |\n");
    printf("  |      Standard: MSBTE / DTE Grade System                 |\n");
    printf("  ============================================================\n");

    int running = 1;
    while (running) {
        printf("\n  ┌─────────────────────────────────────────┐\n");
        printf("  │            MAIN MENU                    │\n");
        printf("  ├─────────────────────────────────────────┤\n");
        printf("  │  1. Calculate SGPA - Semester 1         │\n");
        printf("  │  2. Calculate SGPA - Semester 2         │\n");
        printf("  │  3. Calculate SGPA - Semester 3         │\n");
        printf("  │  4. Calculate SGPA - Semester 4         │\n");
        printf("  │  5. Calculate SGPA - Semester 5         │\n");
        printf("  │  6. Calculate SGPA - Semester 6         │\n");
        printf("  │  7. Calculate CGPA (All Semesters)      │\n");
        printf("  │  0. Exit                                │\n");
        printf("  └─────────────────────────────────────────┘\n");
        printf("  Enter your choice: ");
        scanf("%d", &choice);

        float sgpa = 0;
        switch (choice) {
            case 1: sgpa = semester1(); break;
            case 2: sgpa = semester2(); break;
            case 3: sgpa = semester3(); break;
            case 4: sgpa = semester4(); break;
            case 5: sgpa = semester5(); break;
            case 6: sgpa = semester6(); break;
            case 7: calculateCGPA();   break;
            case 0:
                printf("\n  Thank you for using CGPA Calculator! Good luck!\n\n");
                running = 0;
                break;
            default:
                printf("\n  [!] Invalid choice. Please select 0-7.\n");
        }

        if (choice >= 1 && choice <= 6 && sgpa > 0) {
            printf("\n  Would you like to calculate CGPA now? (1=Yes / 0=No): ");
            int opt;
            scanf("%d", &opt);
            if (opt == 1) calculateCGPA();
        }
    }

    return 0;
}
