// public/script.js
document.getElementById('trackButton').addEventListener('click', function() {
    // Verificar si la geolocalización está disponible
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            // Obtener información del navegador y dispositivo
            const userAgent = navigator.userAgent;
            const deviceInfo = {
                browser: userAgent,
                platform: navigator.platform
            };

            // Enviar la ubicación y la información del dispositivo al servidor
            fetch('http://localhost:3000/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location: location, deviceInfo: deviceInfo })
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('message').innerText = data; // Mostrar la respuesta en la página
            })
            .catch(error => {
                console.error('Error:', error); // Mostrar errores en la consola
            });
        }, function(error) {
            console.error('Error al obtener la ubicación:', error);
            document.getElementById('message').innerText = 'Error al obtener la ubicación.';
        }, {
            enableHighAccuracy: true, // Solicitar alta precisión
            timeout: 5000, // Tiempo máximo para obtener la ubicación
            maximumAge: 0 // No usar una ubicación en caché
        });
    } else {
        console.error('Geolocalización no es soportada por este navegador.');
        document.getElementById('message').innerText = 'Geolocalización no es soportada por este navegador.';
    }
});