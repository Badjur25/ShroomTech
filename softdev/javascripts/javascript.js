
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.metric-card');
            
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });

            // Simulate real-time updates (optional)
            function updateValues() {
                const tempElement = document.querySelector('.metric-card:first-child .metric-value');
                const currentTemp = parseFloat(tempElement.textContent);
                const newTemp = (currentTemp + (Math.random() - 0.5) * 0.2).toFixed(1);
                tempElement.textContent = newTemp + '°C';
            }

            // Uncomment to enable real-time simulation
            // setInterval(updateValues, 5000);
        });

          document.addEventListener('DOMContentLoaded', function() {
            const foggerButton = document.getElementById('foggerButton');
            const exhaustButton = document.getElementById('exhaustButton');
            const autoToggle = document.getElementById('autoToggle');
            const foggerStatus = document.getElementById('foggerStatus');
            const exhaustStatus = document.getElementById('exhaustStatus');
            const autoStatus = document.getElementById('autoStatus');

            let foggerState = false;
            let exhaustState = false;
            let autoMode = false;

            // Fogger control
            foggerButton.addEventListener('click', function() {
                if (!autoMode) {
                    foggerState = !foggerState;
                    updateFoggerDisplay();
                    
                    // Here you would send the command to your IoT device
                    console.log('Fogger ' + (foggerState ? 'ON' : 'OFF'));
                    
                    // Simulate sending command to Firebase/IoT device
                    sendDeviceCommand('fogger', foggerState);
                }
            });

            // Exhaust fan control
            exhaustButton.addEventListener('click', function() {
                if (!autoMode) {
                    exhaustState = !exhaustState;
                    updateExhaustDisplay();
                    
                    // Here you would send the command to your IoT device
                    console.log('Exhaust Fan ' + (exhaustState ? 'ON' : 'OFF'));
                    
                    // Simulate sending command to Firebase/IoT device
                    sendDeviceCommand('exhaust', exhaustState);
                }
            });

            // Auto mode toggle
            autoToggle.addEventListener('click', function() {
                autoMode = !autoMode;
                updateAutoModeDisplay();
                
                if (autoMode) {
                    // Start automatic control based on sensor readings
                    startAutoMode();
                } else {
                    // Stop automatic control
                    stopAutoMode();
                }
            });

            function updateFoggerDisplay() {
                if (foggerState) {
                    foggerButton.classList.add('active');
                    foggerStatus.textContent = 'ON';
                } else {
                    foggerButton.classList.remove('active');
                    foggerStatus.textContent = 'OFF';
                }
            }

            function updateExhaustDisplay() {
                if (exhaustState) {
                    exhaustButton.classList.add('active');
                    exhaustStatus.textContent = 'ON';
                } else {
                    exhaustButton.classList.remove('active');
                    exhaustStatus.textContent = 'OFF';
                }
            }

            function updateAutoModeDisplay() {
                if (autoMode) {
                    autoToggle.classList.add('active');
                    autoStatus.textContent = 'Enabled';
                    foggerButton.style.opacity = '0.6';
                    exhaustButton.style.opacity = '0.6';
                    foggerButton.style.cursor = 'not-allowed';
                    exhaustButton.style.cursor = 'not-allowed';
                } else {
                    autoToggle.classList.remove('active');
                    autoStatus.textContent = 'Disabled';
                    foggerButton.style.opacity = '1';
                    exhaustButton.style.opacity = '1';
                    foggerButton.style.cursor = 'pointer';
                    exhaustButton.style.cursor = 'pointer';
                }
            }

            function startAutoMode() {
                console.log('Auto mode enabled - Environmental controls will be managed automatically');
                
                // Simulate automatic control based on current readings
                setInterval(function() {
                    if (autoMode) {
                        const currentHumidity = parseInt(document.querySelector('.humidi .metric-value').textContent);
                        const currentCO2 = parseInt(document.querySelector('.co2-icon').parentElement.parentElement.querySelector('.metric-value').textContent);
                        
                        // Auto fogger control (humidity < 60%)
                        if (currentHumidity < 60 && !foggerState) {
                            foggerState = true;
                            updateFoggerDisplay();
                            sendDeviceCommand('fogger', true);
                        } else if (currentHumidity > 75 && foggerState) {
                            foggerState = false;
                            updateFoggerDisplay();
                            sendDeviceCommand('fogger', false);
                        }
                        
                        // Auto exhaust control (CO2 > 950ppm)
                        if (currentCO2 > 950 && !exhaustState) {
                            exhaustState = true;
                            updateExhaustDisplay();
                            sendDeviceCommand('exhaust', true);
                        } else if (currentCO2 < 800 && exhaustState) {
                            exhaustState = false;
                            updateExhaustDisplay();
                            sendDeviceCommand('exhaust', false);
                        }
                    }
                }, 10000); // Check every 10 seconds
            }

            function stopAutoMode() {
                console.log('Auto mode disabled - Manual control enabled');
            }

            function sendDeviceCommand(device, state) {
                // This function would integrate with your Firebase/IoT system
                // For now, it's just a placeholder
                const command = {
                    device: device,
                    state: state,
                    timestamp: new Date().toISOString(),
                    userId: 'current-user-id' // Replace with actual user ID
                };
                
                console.log('Sending command:', command);
                
                // Example Firebase integration:
                // firebase.firestore().collection('device_commands').add(command);
                
                // Show user feedback
                showNotification(`${device.charAt(0).toUpperCase() + device.slice(1)} turned ${state ? 'ON' : 'OFF'}`);
            }
           document.querySelectorAll('.control-button').forEach(button => {
                button.addEventListener('mousedown', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('mouseup', function() {
                    this.style.transform = '';
                });
            });
        });