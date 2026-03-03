document.addEventListener('DOMContentLoaded', function (e) {

    e.preventDefault;

    // 1. Select our elements
    const timerDisplay = document.getElementById('timer');
    const moneyDisplay = document.getElementById('money-display');
    const vapesDisplay = document.getElementById('vapes-avoided');
    const saveBtn = document.getElementById('save-money-btn');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    // 2. Initialize variables from LocalStorage (or defaults)
    let quitDate = localStorage.getItem('quitDate') ? new Date(localStorage.getItem('quitDate')) : null;
    let totalSaved = parseFloat(localStorage.getItem('totalSaved')) || 0;

    // 3. Function to update the UI on load
    function updateMoneyUI() {
        moneyDisplay.innerText = `$${totalSaved.toFixed(2)}`;
        vapesDisplay.innerText = `Vapes avoided: ${totalSaved / 25}`;
    }

    // 4. The Timer Logic
    function updateTimer() {
        if (!quitDate) return;

        const now = new Date();
        const diff = now - quitDate; // difference in milliseconds

        if (diff < 0) {
            timerDisplay.innerText = "Ready when you are!";
            return;
        }



        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        // Using template literals to show the ticking seconds
        timerDisplay.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
    }

    // 5. Event Listeners
    saveBtn.addEventListener('click', () => {
        totalSaved += 25;
        localStorage.setItem('totalSaved', totalSaved);
        updateMoneyUI();
    });

    startBtn.addEventListener('click', () => {
        quitDate = new Date(); // Sets to "Right Now"
        localStorage.setItem('quitDate', quitDate);
        alert("Quit date set! You've got this.");
    });

    resetBtn.addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        this.location.reload();
    })
    // Run the timer every 1 second
    setInterval(updateTimer, 1000);

    // Initialize the screen with saved data
    updateMoneyUI();
})