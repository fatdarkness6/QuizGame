export function parseQuestions() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}