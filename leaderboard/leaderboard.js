const CSV_URL = 'https://app.trevor.io/share/view/dad4e1e7-7df4-41f5-9ff8-c888fcdc113a/1d/pennygambl3r_Affiliate_Stake_com_Wager_Race_Statistics_.csv?seed=89';

const prizesUnder75k = { 1: 25, 2: 20, 3: 15, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };
const prizesOver75k = { 1: 30, 2: 27.5, 3: 18, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };

let lastWeekStartDate = null;
let nextLeaderboardStartDate = null;

// Function to calculate the next leaderboard start date (7 days from the current one)
function calculateNextLeaderboardDate(startDate) {
    const start = new Date(startDate);
    const nextStart = new Date(start);
    nextStart.setDate(start.getDate() + 7);  // Adding 7 days
    return nextStart;
}

// Function to update the countdown timer
function updateCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            countdownElement.textContent = "Leaderboard starts now!";
            clearInterval(countdownInterval);
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.textContent = `Next leaderboard in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

async function fetchCSVData(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return parseCSV(data);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return [];
    }
}

function parseCSV(data) {
    return data.split('\n')
        .slice(1)
        .map(row => {
            const [affiliate_name, campaign_code, user_name, wagered, rank, start_date_utc, end_date_utc] = row.split(',');
            return {
                affiliate_name,
                campaign_code,
                user_name,
                wagered: parseFloat(wagered) || 0,
                rank: parseInt(rank) || 0,
                start_date_utc,
                end_date_utc
            };
        })
        .filter(row => row.user_name && row.wagered && row.rank);
}

function getPrize(wagered, rank) {
    const prizeData = wagered >= 75000 ? prizesOver75k : prizesUnder75k;
    return prizeData[rank] || 0;
}

function updateElement(elementId, value, animate = true) {
    const element = document.getElementById(elementId);
    if (element) {
        if (animate) {
            element.style.animation = 'none';
            element.offsetHeight; 
            element.style.animation = 'glitch 0.3s ease';
        }
        element.textContent = value;
    }
}

function populateTopRanks(data) {
    const topRanks = data.slice(0, 3);
    topRanks.forEach((row, index) => {
        const rank = index + 1;
        updateElement(`user-${rank}`, row.user_name);
        updateElement(`wagered-${rank}`, `$${row.wagered.toFixed(2)}`);
        updateElement(`reward-${rank}`, `$${getPrize(row.wagered, row.rank).toFixed(2)}`);
    });
}

function populateLeaderboard(data) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';

    data.slice(3, 20).forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.rank}</td>
            <td>${row.user_name}</td>
            <td>$${row.wagered.toFixed(2)}</td>
            <td>$${getPrize(row.wagered, row.rank).toFixed(2)}</td>
        `;
        tr.classList.add('fade-in'); // Add fade-in class
        leaderboardBody.appendChild(tr);
    });

    const totalWagerAmount = data.reduce((sum, row) => sum + row.wagered, 0);
    const startDate = new Date(data[0].start_date_utc).toLocaleDateString();
    const endDate = new Date(data[0].end_date_utc).toLocaleDateString();

    updateElement('week-info', `${startDate} to ${endDate}`);
    updateElement('total-wager', `$${totalWagerAmount.toFixed(2)}`);
}

function isNewWeek() {
    const currentWeekStart = getWeekStartDate(new Date());
    if (!lastWeekStartDate || lastWeekStartDate !== currentWeekStart) {
        lastWeekStartDate = currentWeekStart;
        return true;
    }
    return false;
}

function getWeekStartDate(date) {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.toISOString().split('T')[0];
}

async function updateLeaderboard() {
    try {
        const data = await fetchCSVData(CSV_URL);
        const validData = data.sort((a, b) => a.rank - b.rank);

        if (validData.length > 0) {
            const startDate = validData[0].start_date_utc;
            nextLeaderboardStartDate = calculateNextLeaderboardDate(startDate);
            updateCountdown(nextLeaderboardStartDate);
        }

        if (isNewWeek()) {
            populateTopRanks(validData);
            populateLeaderboard(validData);
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

// Update the countdown every second
const countdownInterval = setInterval(() => {
    if (nextLeaderboardStartDate) {
        updateCountdown(nextLeaderboardStartDate);
    }
}, 1000);

// Initial leaderboard update
updateLeaderboard();

setInterval(updateLeaderboard, 12 * 60 * 60 * 1000);

document.addEventListener('DOMContentLoaded', () => {
    const rankCards = document.querySelectorAll('.rank-card');
    rankCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05) translateY(-5px)';
            card.style.boxShadow = `0 0 20px ${getComputedStyle(document.documentElement)
                .getPropertyValue('--neon-blue')}`;
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});
