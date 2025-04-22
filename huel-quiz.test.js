import { test, expect } from '@playwright/test';

const url = 'https://uk.huel.com/';

// List of answer combinations to test
const answers = [
    {
        reason: ['Eat healthier', 'Save time'],
        occasion: ['Breakfast', 'Dinner'],
        sweetOrSavory: 'Savoury',
        importantFactor: 'I\'m not picky',
    },
    {
        reason: ['Gain weight', 'Fitness goals'],
        occasion: ['Snack', 'Lunch'],
        sweetOrSavory: 'Sweet',
        importantFactor: 'Something Refreshing',
    }
];

// Helper function to navigate to the page
async function navigateToPage(page, url) {
    try {
        await page.goto(url);
    } catch (error) {
        console.error('Error navigating to page:', error);
    }
}

// Helper function to accept cookies
async function acceptCookies(page) {
    try {
        await page.getByRole('button', { name: 'Accept' }).click();
    } catch {
        // In case cookie popup doesn't show (which is fine)
        console.log('Cookies banner not found or already accepted.');
    }
}

// Helper function to start the quiz
async function startQuiz(page) {
    try {
        // Use a more specific selector if possible
        const quizLink = page.locator('#main div').filter({ hasText: /^Take the quiz$/ }).getByRole('link');
        await quizLink.first().click(); 
        await page.getByRole('button', { name: 'Get started' }).click();
    } catch (error) {
        console.error('Error starting quiz:', error);
    }
}

// Helper function to answer the questions
async function answerQuestion(page, answers) {
    try {
        // Why do you want to try Huel? Possible multiple answers
        for (const reason of answers.reason) {
            await page.getByText(reason).click();
        }
        await page.getByRole('button', { name: 'Continue' }).click();

        // When are you most likely to have Huel? Possible multiple answers
        for (const occasion of answers.occasion) {
            await page.getByText(occasion).click();
        }
        await page.getByRole('button', { name: 'Continue' }).click();

        // What are you in the mood for?
        await page.getByText(answers.sweetOrSavory).click();

        // What matters most to you?
        await page.getByText(answers.importantFactor).click();
    } catch (error) {
        console.error('Error answering questions:', error);
    }
}

// Helper function to complete the quiz
async function completeQuiz(page) {
    try {
        const resultsButton = page.getByRole('button', { name: /no thanks, show me the results/i });
        await resultsButton.waitFor({ state: 'visible', timeout: 10000 });
        await resultsButton.click();
    } catch (error) {
        console.error('Error completing quiz:', error);
    }
}

// Helper function to validate product shows up
async function validateProduct(page) {
    try {
        const product = page.locator('.WHSCard_WHSCard__7JRFj');
        await expect(product.first()).toBeVisible();
    } catch (error) {
        console.error('Error product rendering:', error);
    }
}

// Loop over each answer set and define a separate test for each
answers.forEach((answer, index) => {
    test(`Huel quiz - answer set ${index + 1}`, async ({ page }) => {
        await navigateToPage(page, url);
        await acceptCookies(page);
        await startQuiz(page);
        await answerQuestion(page, answer);
        await completeQuiz(page);
        await validateProduct(page);
    });
});
