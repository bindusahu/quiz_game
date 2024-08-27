document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('restartButton').addEventListener('click', restartQuiz);
document.getElementById('nextButton').addEventListener('click', nextQuestion);
document.getElementById('prevButton').addEventListener('click', prevQuestion);
document.getElementById('skipButton').addEventListener('click', skipQuestion);



let timeLeft = 300; // Set timer to 5 minutes (300 seconds)
let score = 0;
let currentQuestion = 0;
let timerInterval;

const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');

const questions = [
    { category: "English", question: " What is the past tense of the verb run?", options: ["Run", "Runned", "Ran", "Running"], correct: 0, image: "https://static.vecteezy.com/system/resources/thumbnails/033/523/120/small/running-boy-illustration-of-a-little-boy-running-in-a-hurry-vector.jpg", answered: false, userAnswer: null },
    { category: "English", question: "Which of the following can negatively affect sleep quality?", options: ["Keeping the bedroom dark and cool", "Exercising regularly", "Drinking alcohol before bedtime", "Reading a book before sleep"], correct: 2, image: "https://t3.ftcdn.net/jpg/07/54/57/44/360_F_754574473_MvPkTLeYiTKDSyfwcuIUJmElyHSWxzxD.jpg", answered: false, userAnswer: null },
    { category: "English", question: "Which of the following is the correct spelling of the word that refers to the large mammal with a trunk?", options: ["Eliphant", "Elephant", "Elefent", "Elifent"], correct: 1, image: "https://t4.ftcdn.net/jpg/01/23/02/59/360_F_123025935_gDLaLyBuvxD4mJwCE0cUdUIhoseolwgH.jpg", answered: false, userAnswer: null },
    { category: "English", question: "What is the man doing?", options: ["Eating", "Reading book", "running", "Talking on the phone"], correct: 1, image: "https://w0.peakpx.com/wallpaper/847/355/HD-wallpaper-reading-book-read-funny-sweet.jpg", answered: false, userAnswer: null },
    { category: "English", question: "Which of the following is a citrus fruit?", options: ["mango", "Banana", "Orange", "Apple"], correct: 2, image: "https://img.freepik.com/premium-photo/cartoon-drawing-fruits-with-one-being-held-by-two-other_662214-133957.jpg", answered: false, userAnswer: null },
    { category: "English", question: "What is the synonym of 'Happy'?", options: ["sad", "Joyful", "Angry", "Tired"], correct: 1, image: "https://www.shutterstock.com/image-vector/image-vibrant-cartoon-illustration-joyful-260nw-2468141479.jpg", answered: false, userAnswer: null },
    { category: "English", question: "What is the plural form of child?", options: ["Childs", "childen", "childes", "childrens"], correct: 1, image: "https://img.freepik.com/free-vector/happy-children-playing-toy-white-background_1308-94725.jpg", answered: false, userAnswer: null },
    { category: "English", question: "Which of these sentences is in the past tense?", options: [" She will go to the market.", " She goes to the market.", "She went to the market.", "She is going to the market"], correct: 1, image: "https://img.freepik.com/premium-vector/flea-market-scene-cartoon-style_1639-37233.jpg", answered: false, userAnswer: null },
    { category: "English", question: "Which sentence is correct?", options: ["I  has a pen.", " I have a pen.", "I am have a pen.", "I haves a pen."], correct: 1, image: "https://media.istockphoto.com/id/518954548/photo/open-moleskin-book-with-fountain-pen-on-wood.jpg?s=612x612&w=0&k=20&c=vFTPdHQlk5OJYuh2ShF8TE33NqdVUqdkYosLrxIm87k=", answered: false, userAnswer: null },
    { category: "English", question: "Complete the analogy: Book is to read as knife is to ___.", options: ["Handle", "Cut", "sharp", "cook"], correct: 1, image: "https://www.shutterstock.com/image-photo/big-kitchen-knife-isolated-on-260nw-2361951719.jpg", answered: false, userAnswer: null },


    { category: "GK", question: " Which river is the lifeline of Chhattisgarh?", options: ["Mahanadi", "Narmada", "Indravati", "Son River"], correct: 0, image: "https://t3.ftcdn.net/jpg/01/13/46/78/360_F_113467839_JA7ZqfYTcIFQWAkwMf3mVmhqXr7ZOgEX.jpg", answered: false, userAnswer: null },
    { category: "GK", question: "Question: Which waterfall is called the Niagara of India?", options: ["Chitrakote Waterfall", "Teerathgarh Waterfall", "Amritdhara Waterfall", "Duduma Waterfall"], correct: 0, image: "https://t3.ftcdn.net/jpg/01/32/14/60/240_F_132146043_8gpJ88Sg0Mwj9yWS0nIDRppGIFPgcF6a.jpg", answered: false, userAnswer: null },
    { category: "GK", question: "Question: Which is the oldest fort in Chhattisgarh?", options: ["Kanker Fort", "Kawardha Fort", "Raipur Fort", "Ratanpur Fort"], correct: 3, image: "https://www.shutterstock.com/image-vector/castle-brick-wall-seamless-background-260nw-2000518598.jpg", answered: false, userAnswer: null },
    { category: "GK", question: "Which national park is part of the Eastern Ghats?", options: ["Kanger Valley National Park", "Indravati National Park", "Achanakmar Wildlife Sanctuary", "Udanti-Sitanadi Wildlife Sanctuary"], correct: 0, image: "https://img.freepik.com/premium-photo/dark-green-leaves-park-background-image_1033579-89664.jpg?semt=ais_hybrid", answered: false, userAnswer: null },
    { category: "GK", question: "What is the traditional tribal dance of the Satnami community?", options: ["Raut Nacha", "Karma Dance", "Panthi Dance", "Gaur Dance"], correct: 2, image: "https://j3k5s6s3.rocketcdn.me/wp-content/uploads/2022/02/Bastar-Art-Latika-Vaishnav-01-1.jpeg", answered: false, userAnswer: null },
    { category: "GK", question: "What is the traditional metalwork art of Chhattisgarh called?", options: ["Bastar Art", "Gond Art", "Warli Art", "Dhokra Art"], correct: 3, image: "https://wp-assets.rooftopapp.com/wp-content/uploads/2023/01/image-5.png", answered: false, userAnswer: null },
    { category: "GK", question: "Which city is known as the Rice Bowl of India?", options: ["Raipur", "Durg", "Bilaspur", "Ambikapur"], correct: 0, image: "https://img.freepik.com/free-photo/green-field_1417-1576.jpg?semt=ais_hybrid", answered: false, userAnswer: null },
    { category: "GK", question: "Which site in Chhattisgarh has ancient Buddhist remains?", options: ["Tala", "Sirpur", "Malhar", "Rajim"], correct: 1, image: "https://www.gosahin.com/go/p/i/t/1563697293_laxman-temple-sirpur1.jpg", answered: false, userAnswer: null },
    { category: "GK", question: "Which festival marks the new agricultural year in Chhattisgarh?", options: ["Pola Festival", "Bastar Dussehra", "Barack Obama", "Hareli Festival"], correct: 3, image: "https://www.pravakta.com/wp-content/uploads/2015/10/festivals.png", answered: false, userAnswer: null },
    { category: "GK", question: "Is there day and night on Earth?", options: [" Due to daily motion", " Due to annual motion", "Due to half-cycle motion", "Due to quarter motion"], correct: 0, image: "https://qph.cf2.quoracdn.net/main-qimg-73a9542e5310538078e97231e12feef4-lq", answered: false, userAnswer: null },

    { category: "Math", question: "What is the value of √144?", options: ["10", "11", "12", "14"], correct: 2, image: "https://i.ytimg.com/vi/dwdGZDSo4m0/hqdefault.jpg", answered: false, userAnswer: null },
    { category: "Math", question: "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?", options: ["20 cm²", "40 cm²", "50 cm²", "60 cm²"], correct: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPlMcL0v-GTpXyD3ulb26D8I2d_NknqJGs8w&s", answered: false, userAnswer: null },
    { category: "Math", question: "What is the sum of the angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1, image: "https://i.ytimg.com/vi/r4rySgvfDQU/mqdefault.jpg", answered: false, userAnswer: null },
    { category: "Math", question: "What is the value of π (Pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1, image: "https://mycalcas.com/wp-content/uploads/2021/03/pi-day-1080x630.png", answered: false, userAnswer: null },
    { category: "Math", question: "A circle has a radius of 7 cm. What is its circumference? ", options: ["22 cm", "44 cm", "66 cm", "88cm"], correct: 1, image: "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-blue-cartoon-circle-button-png-image_9193843.png", answered: false, userAnswer: null },
    { category: "Math", question: "If x² = 49, what is the value of x?", options: ["5", "6", "7", "8"], correct: 2, image: "https://c8.alamy.com/comp/HN4J73/mascot-illustration-of-a-square-showing-four-fingers-HN4J73.jpg", answered: false, userAnswer: null },
    { category: "Math", question: "What is the next number in the sequence: 2, 4, 8, 16, ...?", options: ["20", "24", "32", "36"], correct: 2, image: "https://www.shutterstock.com/image-vector/melting-ice-cream-set-animation-600nw-2409527907.jpg", answered: false, userAnswer: null },
    { category: "Math", question: "If the sides of a cube are doubled, by what factor does the volume increase?", options: ["2", "4", "6", "8"], correct: 3, image: "https://img.freepik.com/premium-vector/comic-style-box-vector-background_889056-107036.jpg?w=996", answered: false, userAnswer: null },
    { category: "Math", question: "What is the median of the following numbers: 5, 8, 10, 12, 15?", options: ["8", "9", "10", "11"], correct: 2, image: "https://mammothmemory.net/images/user/base/Maths/Statistics%20and%20probability/Averages/example-1-of-median-average.10aa399.jpg", answered: false, userAnswer: null },
    { category: "Math", question: "In a right triangle, if one angle is 30°, what is the measure of the other non-right angle?", options: ["45°", "60°", "75°", "90°"], correct: 1, image: "https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/isosceles-triangle-wiki_ver_1.png", answered: false, userAnswer: null },
    
    // Add more questions as needed
];

function shuffleQuestions() {
    // Order categories: English, GK, Math
    const categories = ["English", "GK", "Math"];
    let orderedQuestions = [];

    categories.forEach(category => {
        orderedQuestions = orderedQuestions.concat(
            questions.filter(q => q.category === category)
        );
    });

    // Randomize questions within each category
    orderedQuestions.forEach(categoryQuestions => {
        for (let i = categoryQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
        }
    });

    questions.length = 0; // Clear original questions array
    questions.push(...orderedQuestions);
}

function startQuiz() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    shuffleQuestions();
    showQuestion();
    startTimer();
    updateSidebar();
}

function showQuestion() {
    const questionObj = questions[currentQuestion];
    document.getElementById('category').textContent = questionObj.category;
    document.getElementById('question').textContent = questionObj.question;
    const questionImage = document.getElementById('questionImage');

    if (questionObj.image) {
        questionImage.src = questionObj.image;
        questionImage.classList.remove('hidden');
    } else {
        questionImage.classList.add('hidden');
    }

    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.textContent = questionObj.options[index];
        button.className = 'option';
        button.onclick = () => checkAnswer(index);

        if (questionObj.answered) {
            if (index === questionObj.userAnswer) {
                button.classList.add('selected');
            }
            if (index === questionObj.correct) {
                button.classList.add('correct');
            } else if (index === questionObj.userAnswer) {
                button.classList.add('incorrect');
            }
        }
    });

    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('nextButton').classList.remove('hidden');
    document.getElementById('prevButton').classList.toggle('hidden', currentQuestion === 0);
    document.getElementById('skipButton').classList.remove('hidden');
    updateProgressBar();
    updateQuestionNumber();
}

function checkAnswer(selectedIndex) {
    const questionObj = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    const optionButtons = document.querySelectorAll('.option');

    if (!questionObj.answered) {
        questionObj.answered = true;
        questionObj.userAnswer = selectedIndex;

        if (selectedIndex === questionObj.correct) {
            score += 10;
            optionButtons[selectedIndex].classList.add('correct');
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
            correctSound.play();
        } else {
            optionButtons[selectedIndex].classList.add('incorrect');
            optionButtons[questionObj.correct].classList.add('correct');
            feedback.textContent = `Incorrect! The correct answer is ${questionObj.options[questionObj.correct]}.`;
            feedback.style.color = "red";
            incorrectSound.play();
        }

        feedback.classList.remove('hidden');
        document.getElementById('nextButton').classList.remove('hidden');
        updateSidebar();
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function skipQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        // Calculate minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Format time as MM:SS
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('time').textContent = formattedTime;

        // Decrement timeLeft by 1 second
        timeLeft--;

        // Check if time is up
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${ progress }%`;
}

function updateQuestionNumber() {
    document.getElementById('questionIndex').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    document.getElementById('totalMarks').textContent = questions.length * 10; // Adjust based on scoring
    document.getElementById('score').textContent = score;
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 300;
    questions.forEach(q => {
        q.answered = false;
        q.userAnswer = null;
    });
    document.getElementById('resultScreen').classList.add('hidden'); // Hide result screen
    document.getElementById('quizScreen').classList.remove('hidden'); // Show quiz screen
    startQuiz(); // Restart the quiz
}

function updateSidebar() {
    const englishQuestions = document.getElementById('englishQuestions');
    const gkQuestions = document.getElementById('gkQuestions');
    const mathQuestions = document.getElementById('mathQuestions');

    // Clear previous indicators`
    englishQuestions.innerHTML = '';
    gkQuestions.innerHTML = '';
    mathQuestions.innerHTML = '';

    questions.forEach((question, index) => {
        const questionBox = document.createElement('div');
        questionBox.className = 'box';
        if (question.answered) {
            questionBox.classList.add('complete');
        } else {
            questionBox.classList.add('incomplete');
        }

        switch (question.category) {
            case 'English':
                englishQuestions.appendChild(questionBox);
                break;
            case 'GK':
                gkQuestions.appendChild(questionBox);
                break;
            case 'Math':
                mathQuestions.appendChild(questionBox);
                break;
        }
    });
}



