// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript loaded.");

    // --- Contact Form Handling ---
    // Get the Send Message button
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    if (sendMessageBtn) {
        // Add click event listener
        sendMessageBtn.addEventListener('click', () => {
            // Get form values
            const fullname = document.getElementById('fullname')?.value || "Anonymous";
            const email = document.getElementById('email')?.value || "No email provided";
            const message = document.getElementById('message')?.value || "No message provided";

            // Construct the mailto link
            const mailtoLink = `mailto:ismail.ben.hamad2019@gmail.com?subject=Message from ${encodeURIComponent(fullname)}&body=Email: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;

            // Open the email client
            window.location.href = mailtoLink;
        });
    } else {
        console.error("Send Message button not found.");
    }

    // --- Quiz Form Handling ---
    const quizForm = document.getElementById("quizForm");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("result");

    // Correct answers
    const correctAnswers = {
        q1: "B", q2: "B", q3: "A", q4: "B", q5: "A",
        q6: "A", q7: "B", q8: "B", q9: "A", q10: "B"
    };

    const explanations = {
        q1: "HTML stands for Hyper Text Markup Language.",
        q2: "CSS stands for Cascading Style Sheets.",
        q3: "&lt;p&gt; is the correct tag for a paragraph.",
        q4: "The property to change background color is background-color.",
        q5: "The &lt;a&gt; tag defines a hyperlink.",
        q6: "font-size controls the text size.",
        q7: "The style attribute is used for inline styles.",
        q8: "&lt;h1&gt; is the largest heading element.",
        q9: "font-weight is used to make text bold.",
        q10: "CSS comments are written as /* this is a comment */."
    };

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Clear previous results
        scoreDisplay.textContent = "";
        resultDisplay.textContent = "";
        const existingResults = document.querySelector("#quizResults");
        if (existingResults) {
            existingResults.remove();
        }

        // Create a container for results
        const resultSection = document.createElement("div");
        resultSection.id = "quizResults";
        resultSection.innerHTML = "<h3>Your Results:</h3>";
        resultSection.style.marginTop = "20px";

        // Check each question and display results
        for (let question in correctAnswers) {
            const userAnswer = quizForm.elements[question]?.value || "No answer selected";
            const isCorrect = userAnswer === correctAnswers[question];

            if (isCorrect) {
                score++;
            }

            // Create a result item for each question
            const questionResult = document.createElement("div");
            questionResult.innerHTML = `
                <p><strong>Question:</strong> ${quizForm.querySelector(`input[name=${question}]`).parentElement.parentElement.querySelector("h4").innerHTML}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${correctAnswers[question]}</p>
                <p><strong>Explanation:</strong> ${explanations[question]}</p>
                <hr>
            `;
            questionResult.style.color = isCorrect ? "green" : "red";
            resultSection.appendChild(questionResult);
        }

        // Display the total score
        scoreDisplay.textContent = `Score: ${score} / ${totalQuestions}`;
        scoreDisplay.style.fontSize = "1.2rem";
        resultDisplay.textContent = score === totalQuestions ? "Perfect!" : "Keep practicing!";
        resultDisplay.style.marginBottom = "20px";

        // Append the detailed results below the quiz
        quizForm.parentElement.appendChild(resultSection);
    });
});