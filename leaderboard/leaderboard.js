const CSV_URL = 'https://app.trevor.io/share/view/dad4e1e7-7df4-41f5-9ff8-c888fcdc113a/1d/pennygambl3r_Affiliate_Stake_com_Wager_Race_Statistics_.csv?seed=89';

const prizesUnder75k = { 1: 25, 2: 20, 3: 15, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };
const prizesOver75k = { 1: 30, 2: 27.5, 3: 18, 4: 10, 5: 5, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };

let leaderboardStartDate = new Date('2024-12-29T00:00:00Z'); // Fixed start date (Dec 29, 2024)
let leaderboardEndDate = new Date(leaderboardStartDate);
leaderboardEndDate.setDate(leaderboardStartDate.getDate() + 7); // Add 7 days to the start date

// 🎯 Update Countdown Timer
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement || !leaderboardEndDate) return;

    const now = new Date();
    const timeLeft = leaderboardEndDate - now;

    console.log('Current Time:', now);
    console.log('Leaderboard End Date:', leaderboardEndDate);
    console.log('Time Left:', timeLeft);

    if (timeLeft <= 0) {
        // If the event has ended, update start and end date to the next leaderboard period
        leaderboardStartDate.setDate(leaderboardStartDate.getDate() + 7);
        leaderboardEndDate.setDate(leaderboardEndDate.getDate() + 7); // Update both start and end date for next leaderboard
        updateLeaderboard(); // Refresh leaderboard for the new period
        countdownElement.innerHTML = `
            <span class="label">Leaderboard has ended. New period starts in:</span>
        `;
        updateCountdown(); // Update countdown to the next period
    } else {
        // If the event is still ongoing, show countdown
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span class="label">Leaderboard ends in:</span>
            <span>${days}d ${hours}h ${minutes}m ${seconds}s</span>
        `;
    }
}

// 📊 Fetch CSV Data
async function fetchCSVData(url) {
    try {
        console.log('Fetching CSV data from URL...');
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('Failed to fetch CSV data:', response.status, response.statusText);
            return [];
        }

        const data = await response.text();
        console.log('CSV Data fetched:', data); // Debug log to verify data fetch
        return parseCSV(data);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return [];
    }
}

// 📝 Parse CSV Data
function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Skip the first row (header)
    console.log('CSV Rows:', rows); // Debug log to verify the CSV rows

    return rows.map(row => {
        const [affiliate_name, campaign_code, user_name, wagered, rank, start_date_utc, end_date_utc] = row.split(',');
        
        // Only return rows with meaningful data (skip empty rows)
        if (!affiliate_name || !user_name || !wagered || !rank || !start_date_utc) {
            return null;
        }

        return {
            affiliate_name,
            campaign_code,
            user_name,
            wagered: parseFloat(wagered) || 0,
            rank: parseInt(rank) || 0,
            start_date_utc,
            end_date_utc
        };
    }).filter(row => row !== null); // Filter out any null values
}

// 🚀 Update Leaderboard
async function updateLeaderboard() {
    try {
        const data = await fetchCSVData(CSV_URL);
        console.log('Parsed CSV Data:', data); // Debug log to verify parsed data

        const validData = data.sort((a, b) => a.rank - b.rank);

        if (validData.length > 0) {
            populateTopRanks(validData);
            populateLeaderboard(validData);
        }

    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

// 🗓️ Populate Top Ranks with Gift Emoji
function populateTopRanks(data) {
    const topRanks = data.slice(0, 3);
    topRanks.forEach((row, index) => {
        const rank = index + 1;
        let reward = `$${getPrize(row.wagered, row.rank).toFixed(2)}`;

        // Add the gift emoji to rank 1, 2, and 3
        if (rank === 1 || rank === 2 || rank === 3) {
            reward = `🎁${reward}`; // Gift emoji for top 3 ranks
        }

        updateElement(`user-${rank}`, row.user_name);
        updateElement(`wagered-${rank}`, `$${row.wagered.toFixed(2)}`);
        updateElement(`reward-${rank}`, reward, false); // False to allow HTML in the reward
    });
}



// 🗓️ Populate Leaderboard Table
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
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'glitch 0.3s ease';
        }
        element.textContent = value;
    }
}

// 🕒 Auto-update leaderboard every 12 hours
setInterval(updateLeaderboard, 12 * 60 * 60 * 1000);

// Initial Load
updateLeaderboard();

// Start the countdown immediately
const countdownInterval = setInterval(updateCountdown, 1000);
