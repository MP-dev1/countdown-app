// Updated Countdown Timer JavaScript with Two Buttons

document.addEventListener('DOMContentLoaded', function() {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timeDisplay = document.getElementById('time-display');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let countdownInterval;
    let totalTimeInSeconds = 0;
    let isPaused = false;
    let isRunning = false;

    // Initialize display
    updateDisplay();

    // Add input event listeners to update display when input changes
    hoursInput.addEventListener('input', updateTimeFromInputs);
    minutesInput.addEventListener('input', updateTimeFromInputs);
    secondsInput.addEventListener('input', updateTimeFromInputs);

    function updateTimeFromInputs() {
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;

        totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        updateDisplay();
    }

    function updateDisplay() {
        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds = totalTimeInSeconds % 60;
        timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startPauseCountdown() {
        if (isRunning && isPaused) {
            // Resume if paused
            isPaused = false;
            startPauseBtn.textContent = 'Pause';
            runCountdown();
            return;
        }

        if (isRunning) {
            // Pause if running
            isPaused = true;
            startPauseBtn.textContent = 'Resume';
            clearInterval(countdownInterval);
            return;
        }

        // Get time from inputs if not already running
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;

        totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        
        // Don't start if time is 0
        if (totalTimeInSeconds <= 0) {
            timeDisplay.style.color = '#a83d8a';
            setTimeout(() => {
                timeDisplay.style.color = 'white';
            }, 500);
            return;
        }

        isRunning = true;
        isPaused = false;
        startPauseBtn.textContent = 'Pause';
        
        // Disable inputs while running
        hoursInput.disabled = true;
        minutesInput.disabled = true;
        secondsInput.disabled = true;

        updateDisplay();
        runCountdown();
    }

    function runCountdown() {
        clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            if (isPaused) return;
            
            if (totalTimeInSeconds > 0) {
                totalTimeInSeconds--;
                updateDisplay();
            } else {
                clearInterval(countdownInterval);
                isRunning = false;
                isPaused = false;
                startPauseBtn.textContent = 'Start';
                
                // Re-enable inputs
                hoursInput.disabled = false;
                minutesInput.disabled = false;
                secondsInput.disabled = false;
                
                // Visual indication that time is up
                document.body.classList.add('time-up');
                timeDisplay.style.color = '#a83d8a';
                
                // Play sound (optional)
                playAlarmSound();
                
                setTimeout(() => {
                    document.body.classList.remove('time-up');
                    timeDisplay.style.color = 'white';
                }, 3000);
            }
        }, 1000);
    }

    function resetCountdown() {
        clearInterval(countdownInterval);
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = 'Start';
        
        // Re-enable inputs
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        
        // Reset time display
        updateTimeFromInputs();
    }

    // Optional: Add sound when time is up
    function playAlarmSound() {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            audio.play();
        } catch (error) {
            console.log('Audio playback failed:', error);
        }
    }

    // Event listeners
    startPauseBtn.addEventListener('click', startPauseCountdown);
    resetBtn.addEventListener('click', resetCountdown);

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 's' || e.key === 'S') {
            startPauseCountdown();
        } else if (e.key === 'r' || e.key === 'R') {
            resetCountdown();
        }
    });

    // Add animations to buttons
    [startPauseBtn, resetBtn].forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});