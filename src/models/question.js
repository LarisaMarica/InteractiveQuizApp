class Question {
    constructor(id, question, options, answer) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    isCorrectAnswer(selected) {
        return this.answer === selected;
    }
}

export default Question;