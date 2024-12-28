const CSV_URL = 'https://app.trevor.io/share/view/dad4e1e7-7df4-41f5-9ff8-c888fcdc113a/1d/pennygambl3r_Affiliate_Stake_com_Wager_Race_Statistics_.csv?seed=89';

const prizesUnder75k = { 1: 25, 2: 20, 3: 15, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };
const prizesOver75k = { 1: 30, 2: 27.5, 3: 18, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };

let lastWeekStartDate = null;
let nextLeaderboardStartDate = null;

// 🎯 Countdown Target Date: 28th December, 11:59 PM
const leaderboardEndDate = new Date('2024-12-28T23:59:00');

// 🕒 Update Countdown Timer
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const now = new Date();
    const timeLeft = leaderboardEndDate - now;

    if (timeLeft <= 0) {
        // If the event has ended
        countdownElement.innerHTML = `
            <span class="label">Leaderboard has ended</span>
        `;
        clearInterval(countdownInterval);
    } else if (timeLeft > 0) {
        // If the event is still coming up, show countdown
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span class="label">Leaderboard starts in:</span>
            <span>${days}d ${hours}h ${minutes}m ${seconds}s</span>
        `;
    }
}

// Start countdown immediately
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// 📊 Fetch CSV Data
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

// 📝 Parse CSV Data
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

// 🎁 Get Prize Based on Rank and Wagered Amount
function getPrize(wagered, rank) {
    const prizeData = wagered >= 75000 ? prizesOver75k : prizesUnder75k;
    return prizeData[rank] || 0;
}

// 🔄 Update DOM Elements
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

// 🥇 Populate Top 3 Ranks
function populateTopRanks(data) {
    const topRanks = data.slice(0, 3);
    topRanks.forEach((row, index) => {
        const rank = index + 1;
        updateElement(`user-${rank}`, row.user_name);
        updateElement(`wagered-${rank}`, `$${row.wagered.toFixed(2)}`);
        updateElement(`reward-${rank}`, `$${getPrize(row.wagered, row.rank).toFixed(2)}`);
    });
}

// 📊 Populate Leaderboard Table
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

// 📅 Calculate Next Leaderboard Date
function calculateNextLeaderboardDate(startDate) {
    const start = new Date(startDate);
    const nextStart = new Date(start);
    nextStart.setDate(start.getDate() + 7);
    return nextStart;
}

// 🗓️ Determine If New Week
function isNewWeek() {
    const currentWeekStart = getWeekStartDate(new Date());
    if (!lastWeekStartDate || lastWeekStartDate !== currentWeekStart) {
        lastWeekStartDate = currentWeekStart;
        return true;
    }
    return false;
}

// 🗓️ Get Start of the Week
function getWeekStartDate(date) {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.toISOString().split('T')[0];
}

// 🚀 Update Leaderboard
async function updateLeaderboard() {
    try {
        const data = await fetchCSVData(CSV_URL);
        const validData = data.sort((a, b) => a.rank - b.rank);

        if (validData.length > 0) {
            const startDate = validData[0].start_date_utc;
            nextLeaderboardStartDate = calculateNextLeaderboardDate(startDate);
            updateCountdown();
        }

        if (isNewWeek()) {
            populateTopRanks(validData);
            populateLeaderboard(validData);
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

// 🕒 Auto-update leaderboard every 12 hours
setInterval(updateLeaderboard, 12 * 60 * 60 * 1000);

// 🌟 Hover Animation for Rank Cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rank-card').forEach(card => {
        card.addEventListener('mouseover', () => card.style.transform = 'scale(1.05) translateY(-5px)');
        card.addEventListener('mouseout', () => card.style.transform = '');
    });
});

// Initial Load
updateLeaderboard();
