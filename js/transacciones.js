const account = {
    balance: 1000,
    transactions: [],
    dailyWithdrawalLimit: 60000,
    dailyWithdrawn: 0
};

const validBills = [100, 200, 500, 1000, 2000, 10000];
const interactionArea = document.getElementById('interaction-area');
const today = new Date().toDateString();

// Datos de ejemplo de usuarios
const users = {
    "0123456789101234": "Federico Ruiz",
    "9876543210987654": "Lucas Andrade",
    "1122334455667788": "Gomez Yolanda"
};

function resetDailyLimit() {
    const lastResetDate = localStorage.getItem('lastResetDate');
    if (lastResetDate !== today) {
        account.dailyWithdrawn = 0;
        localStorage.setItem('lastResetDate', today);
    }
}

function calculateInterest(amount, rate, months) {
    return amount * Math.pow(1 + rate, months) - amount;
}

/// INICIO DE SESION///////////////////////////



//////////////////////// FINAL DE INICIO DE SESION///////////////////////////



function loadOptions() {
    document.querySelector('header').innerHTML += `
        <div class="nav-container">
            <button id="menu-toggle" class="hamburger">☰</button>
            <nav id="navbar" class="nav-links">
                <button id="view-balance"><i class="fas fa-wallet"></i> Ver Saldo</button>
                <button id="deposit-money"><i class="fas fa-dollar-sign"></i> Depositar Dinero</button>
                <button id="withdraw-money"><i class="fas fa-arrow-down"></i> Retirar Dinero</button>
                <button id="transaction-history"><i class="fas fa-history"></i> Historial de Transacciones</button>
                <button id="make-transfer"><i class="fas fa-exchange-alt"></i> Transferencias</button>
                <button id="apply-loan"><i class="fas fa-hand-holding-usd"></i> Préstamos</button>
                <button id="fixed-deposit"><i class="fas fa-piggy-bank"></i> Plazo Fijo</button>
                <button id="logout"><i class="fas fa-sign-out-alt"></i> Salir</button>
            </nav>
        </div>
    `;

    // Seleccionar el botón del menú y el navbar después de inyectar el HTML
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    // Agregar evento de clic directamente
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
    
    ///////////////

    
document.getElementById('view-balance').addEventListener('click', () => {

    Swal.fire({
        title: 'Saldo Actual',
        text: `Tu saldo actual es de $${account.balance}`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
});




document.getElementById('deposit-money').addEventListener('click', () => {
    Swal.fire({
        title: 'Depósito de Dinero',
        input: 'number',
        inputLabel: '¿Cuánto dinero deseas depositar? (Máximo $100,000)',
        inputAttributes: {
            min: 1,
            max: 100000,
            step: 1
        },
        showCancelButton: true,
        confirmButtonText: 'Depositar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const amount = parseInt(result.value);
            if (!isNaN(amount) && amount > 0 && amount <= 100000) {
                account.balance += amount;
                account.transactions.push({ type: 'Depósito', amount, balanceAfter: account.balance, date: new Date() });
                Swal.fire('Éxito', `Has depositado $${amount}. Saldo actual: $${account.balance}`, 'success');
            } else {
                Swal.fire('Error', 'Por favor, ingresa un monto válido (máximo $100,000).', 'error');
            }
        }
    });
});





    document.getElementById('withdraw-money').addEventListener('click', () => {
        Swal.fire({
            title: 'Retiro de Dinero',
            input: 'number',
            inputLabel: '¿Cuánto dinero deseas retirar? (Máximo $60,000 por día)',
            inputAttributes: {
                min: 1,
                max: 60000,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Retirar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const amount = parseInt(result.value);
                resetDailyLimit();
                if (!isNaN(amount) && amount > 0 && amount <= 60000) {
                    if (account.dailyWithdrawn + amount > account.dailyWithdrawalLimit) {
                        Swal.fire('Límite alcanzado', 'Has alcanzado el límite diario de retiro ($60,000).', 'warning');
                    } else if (amount <= account.balance) {
                        account.balance -= amount;
                        account.dailyWithdrawn += amount;
                        account.transactions.push({ type: 'Retiro', amount, balanceAfter: account.balance, date: new Date() });
                        Swal.fire('Éxito', `Has retirado $${amount}. Saldo actual: $${account.balance}`, 'success');
                    } else {
                        Swal.fire('Error', 'Fondos insuficientes.', 'error');
                    }
                } else {
                    Swal.fire('Error', 'Por favor, ingresa un monto válido (máximo $60,000 por día).', 'error');
                }
            }
        });
    });


    
    document.getElementById('transaction-history').addEventListener('click', () => {
        if (account.transactions.length === 0) {
            interactionArea.innerHTML = '<p>No tienes transacciones aún.</p>';
        } else {
            const history = account.transactions.map(trans => 
                `<li>${trans.type} de $${trans.amount} el ${new Date(trans.date).toLocaleString()}. Saldo actual: $${trans.balanceAfter}</li>`
            ).join('');
            interactionArea.innerHTML = `<ul>${history}</ul>`;
        }
    });



/////////////  TRANSFERENCIA////////////////////////////////////////////
document.getElementById('make-transfer').addEventListener('click', () => {
// Mostrar historial de transferencias
const transferHistory = account.transactions
.filter(tx => tx.type === 'Transferencia')
.map(tx => `<li> Usted realizo una transferencia a la Cuenta: ${tx.destination},por el Monto: $${tx.amount}</li>`)
.join('');
const transferHistoryHTML = transferHistory ? `<ul>${transferHistory}</ul>` : '<p>No hay transferencias realizadas.</p>';

Swal.fire({
title: 'Transferencia Bancaria',
html: `
    ${transferHistoryHTML}
    <p>¿Deseas realizar una nueva transferencia?</p>
`,
showCancelButton: true,
confirmButtonText: 'Sí, nueva transferencia',
cancelButtonText: 'Cancelar'
}).then((result) => {
if (result.isConfirmed) {
    openTransferDialog();
}
});
});

function openTransferDialog() {
Swal.fire({
title: 'Nueva Transferencia',
html: `
    <input id="transfer-name" type="text" class="swal2-input" placeholder="Nombre y apellido (máx. 20 caracteres)" maxlength="20">
    <input id="transfer-dni" type="number" class="swal2-input" placeholder="DNI (máx. 10 números)">
    <input id="transfer-alias" type="text" class="swal2-input" placeholder="Alias (máx. 12 caracteres)" maxlength="12">
    <input id="transfer-amount" type="number" class="swal2-input" placeholder="Monto a transferir (máximo $300,000)">
    <input id="destination-account" maxlength="16" class="swal2-input" placeholder="Cuenta destino">
`,
preConfirm: () => {
    const name = document.getElementById('transfer-name').value.trim();
    const dni = document.getElementById('transfer-dni').value.trim();
    const alias = document.getElementById('transfer-alias').value.trim();
    const amount = parseInt(document.getElementById('transfer-amount').value);
    const destination = document.getElementById('destination-account').value.trim();

    // Validaciones
    if (!/^[a-zA-Z\s]{1,20}$/.test(name)) {
        Swal.showValidationMessage('Por favor, ingresa un Nombre y apellido válido (solo letras, máx. 20 caracteres).');
        return false;
    }
    if (!/^\d{1,10}$/.test(dni)) {
        Swal.showValidationMessage('Por favor, ingresa un DNI válido (máx. 10 números).');
        return false;
    }
    if (alias && alias.length > 12) {
        Swal.showValidationMessage('El alias no puede exceder los 12 caracteres.');
        return false;
    }
    if (isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage('Por favor, ingresa un monto válido para transferir.');
        return false;
    }
    if (amount > 300000) {
        Swal.showValidationMessage('No puedes transferir más de $300,000.');
        return false;
    }
    if (!/^\d{1,16}$/.test(destination)) {
        Swal.showValidationMessage('La cuenta destino debe contener solo números y no más de 16 dígitos.');
        return false;
    }

    return { name, dni, alias, amount, destination };
}
}).then((result) => {
if (result.isConfirmed) {
    const { name, dni, alias, amount, destination } = result.value;

    // Confirmar transferencia
    Swal.fire({
        title: 'Confirmar Transferencia',
        html: `
            ¿Estás seguro que deseas transferir <strong>$${amount}</strong> a la cuenta <strong>${destination}</strong>?<br>
            <strong>Nombre:</strong> ${name}<br>
            <strong>DNI:</strong> ${dni}<br>
            <strong>Alias:</strong> ${alias || 'No especificado'}
        `,
        showCancelButton: true,
        confirmButtonText: 'Sí, transferir',
        cancelButtonText: 'Cancelar'
    }).then((confirmation) => {
        if (confirmation.isConfirmed) {
            if (amount > account.balance) {
                Swal.fire('Error', 'Fondos insuficientes para realizar la transferencia.', 'error');
            } else {
                // Actualizar saldo y registrar la transferencia
                account.balance -= amount;
                account.transactions.push({
                    type: 'Transferencia',
                    name,
                    dni,
                    alias,
                    amount,
                    balanceAfter: account.balance,
                    date: new Date(),
                    destination
                });

                Swal.fire('Éxito', `Has transferido $${amount} a la cuenta ${destination}. Saldo actual: $${account.balance}`, 'success');
            }
        }
    });
}
});
}

    
/////////////////////////////////  SOLICITAR PRESTAMO//////////////////77
document.getElementById('apply-loan').addEventListener('click', () => {
// Filtrar los préstamos activos
const activeLoans = account.transactions.filter(tx => tx.type === 'Préstamo' && !tx.expired);

if (activeLoans.length > 0) {
// Crear el contenido para mostrar todos los préstamos activos
let loansHtml = '<p>Tienes los siguientes préstamos activos:</p><ul>';
activeLoans.forEach((loan, index) => {
    const endDate = new Date(loan.date);
    endDate.setMonth(endDate.getMonth() + loan.months);
    const totalToRepay = loan.amount + loan.interest;

    loansHtml += `
        <li>
            <strong>Préstamo ${index + 1}:</strong>
            <ul>
                <li>Monto recibido: $${loan.amount}</li>
                <li>Total a devolver: $${totalToRepay.toFixed(2)}</li>
                <li>Duración: ${loan.months} meses</li>
                <li>Fecha de finalización: ${endDate.toLocaleDateString()}</li>
            </ul>
        </li>`;
});
loansHtml += '</ul><p>¿Deseas solicitar otro préstamo?</p>';

// Mostrar todos los préstamos activos
Swal.fire({
    title: 'Préstamos Activos',
    html: loansHtml,
    showCancelButton: true,
    confirmButtonText: 'Sí, solicitar otro',
    cancelButtonText: 'No'
}).then((result) => {
    if (result.isConfirmed) {
        openLoanDialog();
    }
});
} else {
// Si no hay préstamos activos, abrir diálogo para solicitar uno nuevo
openLoanDialog();
}
});

function openLoanDialog() {
Swal.fire({
title: 'Solicitar Préstamo',
html: `
    <input id="loan-amount" type="number" class="swal2-input" placeholder="Monto del préstamo">
    <input id="loan-months" type="number" class="swal2-input" placeholder="Meses de devolución">
`,
preConfirm: () => {
    const amount = parseInt(document.getElementById('loan-amount').value);
    const months = parseInt(document.getElementById('loan-months').value);

    if (isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage('Por favor, ingresa un monto válido para el préstamo.');
        return false;
    }
    if (amount > 10000000) {
        Swal.showValidationMessage('El monto máximo para un préstamo es $10.000.000.');
        return false;
    }
    if (isNaN(months) || months <= 0) {
        Swal.showValidationMessage('Por favor, ingresa un número válido de meses.');
        return false;
    }
    if (months > 48) {
        Swal.showValidationMessage('La duración máxima para un préstamo es de 48 meses.');
        return false;
    }

    return { amount, months };
}
}).then((result) => {
if (result.isConfirmed) {
    const { amount, months } = result.value;
    const interestRate = 0.05; // Tasa de interés mensual del 5%
    const interest = calculateInterest(amount, interestRate, months);
    const totalAmount = amount + interest;

    // Actualizar el saldo y registrar la transacción
    account.balance += amount;
    account.transactions.push({
        type: 'Préstamo',
        amount,
        months,
        balanceAfter: account.balance,
        date: new Date(),
        interest,
        totalAmount,
        expired: false
    });

    Swal.fire(
        'Préstamo Aprobado',
        `Has recibido un préstamo de $${amount}. Total a devolver en ${months} meses: $${totalAmount.toFixed(2)}.`,
        'success'
    );
}
});
}

// Función para calcular el interés compuesto
function calculateInterest(principal, rate, months) {
return principal * Math.pow(1 + rate, months) - principal;
}

////////////////////////////////////////////////////////////// FUNCION PARA SALIR!!!!!!!!!!!!!!!!!!!!!

document.getElementById('logout').addEventListener('click', () => {
// Lógica para "cerrar sesión"
Swal.fire({
title: 'Cerrar sesión',
text: "¿Estás seguro de que deseas cerrar sesión?",
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Sí, cerrar sesión',
cancelButtonText: 'Cancelar'
}).then((result) => {
if (result.isConfirmed) {
    // Acción al confirmar el cierre de sesión, por ejemplo, recargar la página o redirigir
    window.location.reload(); // Recarga la página (puedes cambiarlo por redirigir a otra página)
}
});
});

//////////////////// FIN DE FUNCION PARA SALIR

//////         PLAZO FIJO////////////////////////////////////////////////
document.getElementById('fixed-deposit').addEventListener('click', () => {
// Filtrar los plazos fijos activos
const activeFixedDeposits = account.transactions.filter(tx => tx.type === 'Plazo Fijo' && !tx.expired);

if (activeFixedDeposits.length > 0) {
// Crear el contenido para mostrar todos los plazos fijos activos
let depositsHtml = '<p>Tienes los siguientes plazos fijos activos:</p><ul>';
activeFixedDeposits.forEach((deposit, index) => {
    const endDate = new Date(deposit.date);
    endDate.setMonth(endDate.getMonth() + deposit.months);
    const totalToReceive = deposit.amount + deposit.interest;

    depositsHtml += `
        <li>
            <strong>Plazo Fijo ${index + 1}:</strong>
            <ul>
                <li>Inversión: $${deposit.amount}</li>
                <li>Recibirás: $${totalToReceive.toFixed(2)}</li>
                <li>Duración: ${deposit.months} meses</li>
                <li>Vencimiento: ${endDate.toLocaleDateString()}</li>
            </ul>
        </li>`;
});
depositsHtml += '</ul><p>¿Deseas realizar otro depósito a plazo fijo?</p>';

// Mostrar todos los plazos fijos activos
Swal.fire({
    title: 'Plazos Fijos Activos',
    html: depositsHtml,
    showCancelButton: true,
    confirmButtonText: 'Sí, realizar otro',
    cancelButtonText: 'No'
}).then((result) => {
    if (result.isConfirmed) {
        openFixedDepositDialog();
    }
});
} else {
// Si no hay plazos fijos activos, abrir diálogo para solicitar uno nuevo
openFixedDepositDialog();
}
});

function openFixedDepositDialog() {
Swal.fire({
title: 'Plazo Fijo',
html: `
    <input id="deposit-amount" type="number" class="swal2-input" placeholder="Monto a invertir en plazo fijo">
    <input id="deposit-months" type="number" class="swal2-input" placeholder="Meses de plazo fijo">
`,
preConfirm: () => {
    const amount = parseInt(document.getElementById('deposit-amount').value);
    const months = parseInt(document.getElementById('deposit-months').value);

    if (isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage('Por favor, ingresa un monto válido para el depósito.');
        return false;
    }
    if (isNaN(months) || months <= 0) {
        Swal.showValidationMessage('Por favor, ingresa un número válido de meses.');
        return false;
    }


    if (months > 12) {
        Swal.showValidationMessage('La duración máxima para un plazo fijo es de 12 meses.');
        return false;
    }


    if (amount > account.balance) {
        Swal.showValidationMessage('El monto no puede superar tu saldo disponible.');
        return false;
    }

    return { amount, months };
}
}).then((result) => {
if (result.isConfirmed) {
    const { amount, months } = result.value;
    const interestRate = 0.02; // Tasa de interés mensual del 2%
    const interest = calculateInterest(amount, interestRate, months);
    const totalAmount = amount + interest;

    // Actualizar el saldo y registrar la transacción
    account.balance -= amount;
    account.transactions.push({
        type: 'Plazo Fijo',
        amount,
        months,
        balanceAfter: account.balance,
        date: new Date(),
        interest,
        totalAmount,
        expired: false
    });

    Swal.fire(
        'Depósito Aprobado',
        `Has invertido $${amount} en un plazo fijo de ${months} meses. Total que recibiras es de: $${totalAmount.toFixed(2)}.`,
        'success'
    );
}
});
}

// Función para calcular el interés compuesto
function calculateInterest(principal, rate, months) {
return principal * Math.pow(1 + rate, months) - principal;
}

// Ejemplo de objeto de cuenta para pruebas
const account = {
balance: 5000, // Saldo inicial
transactions: [] // Historial de transacciones
};

}
startSimulation();

///////////////////////////////////////////// FINAL DEL PLAZO FIJO//////////////////////////////////    


////////////////////////////////////