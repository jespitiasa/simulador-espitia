function startSimulation() {
    Swal.fire({
        title: 'Inicio de sesión',
        html: `
            <p style="margin-bottom: 5px;">Ingrese el número de identificacion:</p>
            <div style="text-align: center; margin-bottom: 5px;"> 
                <i class="fa fa-credit-card" style="font-size: 120px; color: #8a2be2;"></i>
            </div>
            <input id="card-number" class="swal2-input" placeholder="Número de tarjeta (16 dígitos)" maxlength="16" style="margin-bottom: 5px;">
            <p style="margin-bottom: 5px;">Ingrese su contraseña:</p>
            <input id="password" type="password" class="swal2-input" placeholder="Contraseña (4 dígitos)" maxlength="4" style="margin-bottom: 5px;">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const cardNumber = document.getElementById('card-number').value;
            const password = document.getElementById('password').value;
    
            if (!/^[0-9]{16}$/.test(cardNumber)) {
                Swal.showValidationMessage('Por favor, ingresa un número de tarjeta válido de 16 dígitos.');
                return false;
            }
            if (!/^[0-9]{4}$/.test(password)) {
                Swal.showValidationMessage('Por favor, ingresa una contraseña válida de 4 dígitos.');
                return false;
            }
            return { cardNumber, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { cardNumber } = result.value;
            const name = users[cardNumber] || "Usuario"; // Obtener nombre asociado a la tarjeta
            interactionArea.innerHTML = `
                <p>Bienvenido, ${name}. Selecciona una opción para comenzar.</p>
            `;
            // Crear contenedor de tarjetas
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container');
            const options = [
                { image: 'saldo.jpg', title: 'Ver saldo', action: viewBalance },
                { image: 'depositardinero.jpg', title: 'Depositar Dinero', action: depositMoney },
                { image: 'retirardinero.jpg', title: 'Retirar Dinero', action: withdrawMoney },
                { image: 'transferir.jpg', title: 'Transferencia', action: transferMoney },
                { image: 'plazofijo.jpg', title: 'Invertir en Plazo Fijo', action: investFixedTerm },
                { image: 'prestamo.jpg', title: 'Solicitar Préstamo', action: requestLoan },
                { image: 'historial.jpg', title: 'Historial de Transferencia', action: viewHistory },
                { image: 'salir.jpg', title: 'Salir', action: logout }
            ];

            options.forEach(option => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.addEventListener('click', option.action);  

                const img = document.createElement('img');
                img.src = `img/${option.image}`;
                img.alt = option.title;
                img.classList.add('card-img');
                
                const h3 = document.createElement('h3');
                h3.textContent = option.title;
                
                card.appendChild(img);
                card.appendChild(h3);
                cardContainer.appendChild(card);
            });

            interactionArea.appendChild(cardContainer);
            loadOptions();
        }
    });
}
function viewBalance() {
    // Mostrar el mensaje del saldo actual
    Swal.fire('Consulta de Saldo', 'Aquí puedes consultar tu saldo.', 'info');

    // Disparar el evento de clic del botón "view-balance"
    document.getElementById('view-balance').click();
}
function depositMoney() {
    // Mostrar un mensaje informativo sobre el depósito de dinero
    Swal.fire('Depósito de Dinero', 'Aquí puedes realizar un depósito a tu cuenta.', 'info');

    // Disparar el evento de clic del botón "deposit-money"
    document.getElementById('deposit-money').click();
}

function withdrawMoney() {
    // Mostrar un mensaje informativo sobre el retiro de dinero
    Swal.fire('Retiro de Dinero', 'Aquí puedes realizar un retiro de tu cuenta.', 'info');

    // Disparar el evento de clic del botón "withdraw-money"
    document.getElementById('withdraw-money').click();
}
function transferMoney() {
    // Mostrar el mensaje de transferencia
    Swal.fire('Transferencia', 'Aquí puedes hacer una transferencia.', 'info');

    // Disparar el evento de clic del botón "make-transfer"
    document.getElementById('make-transfer').click();
}
function investFixedTerm() {
    // Mostrar el mensaje de inversión en Plazo Fijo
    Swal.fire('Invertir en Plazo Fijo', 'Aquí puedes invertir tu dinero en un plazo fijo.', 'info');

    // Disparar el evento de clic del botón "fixed-deposit"
    document.getElementById('fixed-deposit').click();
}
function requestLoan() {
    // Mostrar el mensaje de solicitud de préstamo
    Swal.fire('Solicitar Préstamo', 'Aquí puedes solicitar un préstamo.', 'info');

    // Disparar el evento de clic del botón "apply-loan"
    document.getElementById('apply-loan').click();
}
function viewHistory() {
    // Mostrar el mensaje del historial de transferencias
    Swal.fire('Historial de Transacciones', 'Aquí puedes ver el historial de tus transacciones.', 'info');

    // Disparar el evento de clic del botón "make-transfer" para mostrar las transferencias y permitir hacer una nueva
    document.getElementById('transaction-history').click();
}
function logout() {
    // Mostrar mensaje inicial de "Has salido del sistema"
    Swal.fire('Salir', 'Has salido del sistema.', 'info');

    // Disparar el evento de clic del botón "logout" para ejecutar la lógica de cierre de sesión
    document.getElementById('logout').click();
}