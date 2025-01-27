//Declaración de variables  
var dniUsuario = "1022323324";
var nombreUsuario = "John Espitia"
var saldoCuenta = 300000;
var limiteExtraccion = 520000;
var codigoDeSeguridad = "0257";
var dolarVenta = 4.500;

//Declaración de variables que contienen precio de los servicios
var s1 = ["Agua", 350000];
var s2 = ["Luz", 250000];
var s3 = ["Internet", 210000];
var s4 = ["Telefono", 57000];
//Declaración de variables que contienen nombre y numero de cuenta amiga
var cta1 = ["Cuenta Patricia Sánchez", "51744378"];
var cta2 = ["Cuenta Efrain Espitia", "71256139"];
var cta3 = ["Cuenta Daniela Roa", "1032482755"];
var cta4 = ["Cuenta Juan Espitia", "1025345678"]
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}
//Suma dinero a saldoCuenta
function sumaDinero(monto) {
    if (validaValoresNumericos(monto)) {
        saldoAnterior = saldoCuenta;
        saldoCuenta = saldoAnterior + monto;
    } else {
        return false;
    }
}
//Resta dinero a saldoCuenta
function restaDinero(monto) {
    if (validaValoresNumericos(monto) && monto <= saldoCuenta) {
        saldoAnterior = saldoCuenta;
        saldoCuenta = saldoAnterior - monto;
    } else {
        return false;
    }
}
//Muestra un alert después de hacer un depósito
function alertDeposito(monto, saldoAnterior, saldoCuenta) {
    monto = parseFloat(monto);
    alert('Has depositado: $' + monto + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
}
//Muestra un alert después de hacer una extracción
function alertExtraccion(monto, saldoAnterior, saldoCuenta) {
    monto = parseInt(monto);
    alert('Has retirado: $' + monto + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
}
//Muestra un alert después de cambiar límite de extracción
function alertLimExtraccion(nuevoLimite) {
    nuevoLimite = parseInt(nuevoLimite);
    alert('Su nuevo Límite de extracción es: $' + nuevoLimite);
}
// Verifica si hay saldo disponible en la cuenta para realizar una operación
function haySaldoDisponible(monto) {
    if (monto <= saldoCuenta) {
        return true;
    } else {
        alert("No tiene saldo disponible");
        return false;
    }
}
//verifica que el usuario no retire mas dinero del límite de extracción permitido
function limExtraccionValido(monto) {
    if (monto <= limiteExtraccion) {
        return true;
    } else {
        alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción");
        return false;
    }
}
//Verifica que el monto a extraer sea múltiplo de 100
function multiploDe100(monto) {
    if (monto % 100 == 0) {
        return true;
    } else {
        alert("Solo puedes extraer billetes de 100");
        return false;
    }
}
//Verifica que el nuevo limite de extracción sea multiplo de 100
function multiplosDe100(monto) {
    if (monto % 100 == 0) {
        return true;
    } else {
        alert("Ingrese valores múltiplos de 100");
        return false;
    }
}
//Compruebo que el usuario coloque números
function validaValoresNumericos(monto) {
    monto = Number(monto);
    if (!isNaN(monto)) {
        return true;
    } else {
        alert("Ingrese un valor válido");
        return false;

    }
}
//comprueba que el usuario no ingrese numeros negativos
function numerosNegativos(monto) {
    if (monto > 0) {
        return true;
    } alert("Ingrese un valor válido");
    return false;
}
//Verifica que el nuevo limite de extracción no sea mayor a 10000
function topeLimiteExtraccion(monto) {
    if (monto <= 10000) {
        return true;
    } else {
        alert("El límite de extracción no debe superar los $10000")
        return false;
    }
}
//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = prompt("Ingrese nuevo límite de extracción");
    if (nuevoLimite === null) {
        return;
    }

    if (topeLimiteExtraccion(nuevoLimite) && validaValoresNumericos(nuevoLimite) && numerosNegativos(nuevoLimite) && multiplosDe100(nuevoLimite)) {
        limiteExtraccion = parseInt(nuevoLimite);
        actualizarLimiteEnPantalla();
        alertLimExtraccion(nuevoLimite);
    } else {
        return false;
    }
}
function extraerDinero() {
    var monto = prompt("Ingrese la cantidad de que desea extraer");
    if (monto === null) {
        return;
    }
    if (validaValoresNumericos(monto) && numerosNegativos(monto) && limExtraccionValido(monto) && multiploDe100(monto)) {
        if (haySaldoDisponible(monto)) {
            restaDinero(monto);
            actualizarSaldoEnPantalla();
            alertExtraccion(monto, saldoAnterior, saldoCuenta);
        } else {
            // alert("No tiene saldo disponible");
            return false;
        }
    }
}
function depositarDinero() {
    var monto = prompt("Ingrese la cantidad de que desea depositar");
    if (monto === null) {
        return;
    }
    if (validaValoresNumericos(monto) && numerosNegativos(monto)) {
        saldoAnterior = saldoCuenta;
        monto = parseFloat(monto);
        sumaDinero(monto);
        actualizarSaldoEnPantalla();
        alertDeposito(monto, saldoAnterior, saldoCuenta);
    } else {
        return false;
    }
}
function pagarServicio() {
    // El usuario debe elegir el servicio que quiere pagar, ese valor se almacena en servicio y entra al switch
    var servicio = prompt("Que servicio desea abonar?" + '\n' +
        "1. " + s1[0] + ": $" + s1[1] + '\n' +
        "2. " + s2[0] + ": $" + s2[1] + '\n' +
        "3. " + s3[0] + ": $" + s3[1] + '\n' +
        "4. " + s4[0] + ": $" + s4[1] + '\n' +
        "Ingrese el numero del servicio que desea abonar");
    //si el servicio existe devuelve true sino retorna false
    if (servicio === null) {
        return;
    }
    switch (servicio) {
        case "1":
            servicio = s1;
            break;
        case "2":
            servicio = s2;
            break;
        case "3":
            servicio = s3;
            break;
        case "4":
            servicio = s4;
            break;
        default:
            alert("Intente con un servicio valido");
            return false;
    }
    // asigno a la variable monto el valor de la variable servicio posicion 1
    monto = servicio[1];
    //compruebo que haya saldo suficiente, si es true, ejecuta las funciones, muestra el alert y actualiza
    if (haySaldoDisponible(monto)) {
        restaDinero(monto);
        alert("Pagaste el siguiente servicio: " + servicio[0] + "." + "\n"
            + "Saldo anterior: $" + saldoAnterior + "\n"
            + "Dinero descontado: $" + servicio[1] + "\n"
            + "Saldo actual: $" + saldoCuenta);

        actualizarSaldoEnPantalla();
    } else {
        //alert("No hay saldo disponible");
        return false;
    }
}
function transferirDinero() {
    //Aca se ingresa el monto a trasnferir y se guarda en la variable monto
    var monto = prompt("Ingrese el importe a transferir");
    if (monto === null) {
        return;
    }
    var monto = parseInt(monto);
    if (validaValoresNumericos(monto) && numerosNegativos(monto)) {

        // Compruebo si tengo dinero suficiente con el if, si da true, pregunto a a que cuenta va a trasnferir el dinero
        if (haySaldoDisponible(monto)) {
            cuentaAmiga = prompt("A qué cuenta amiga desea trasnferir el dinero" + "\n" +
                "1. " + cta1[0] + ": " + cta1[1] + "\n" +
                "2. " + cta2[0] + ": " + cta2[1] + "\n" +
                "3. " + cta3[0] + ": " + cta3[1] + "\n" +
                "4. " + cta4[0] + ": " + cta4[1] + "\n" +
                "Ingrese el numero de cuenta a la que desea transferir");

            //meto el valor en el switch para comprobar que la cuenta sea correcta
            switch (cuentaAmiga) {
                case "1":
                    cuentaAmiga = cta1;
                    break;
                case "2":
                    cuentaAmiga = cta2;
                    break;
                case "3":
                    cuentaAmiga = cta3;
                    break;
                case "4":
                    cuentaAmiga = cta4;
                    break;
                default:
                    alert("Solo puede transferir dinero a una cuenta amiga válida");
                    return false;
            }
            // si devuelve true continua ejecutando las funciones, sino retorna false.
            restaDinero(monto);
            actualizarSaldoEnPantalla();
            alert("Se han transferido: $" + monto + "\n" + "Cuenta destino: " + cuentaAmiga[1]);

        } else {
            alert("No hay saldo disponible para realizar la transferencia");
        }
    }
}
function compraDolares() {
    dolares = prompt("Cuantos dolares quiere comprar");
    if (dolares === null) {
        return;
    }
    if (validaValoresNumericos(dolares) && numerosNegativos(dolares) && multiplosDe100(dolares)) {
        monto = dolarVenta * dolares;
        if (haySaldoDisponible(monto)) {
            restaDinero(monto);
            alert("Compraste: " + dolares + " $USD " + "a $" + dolarVenta + "\n" + "Saldo anterior: $" + saldoAnterior + "\n" + "Dinero descontado: $" + monto + "\n" + "Saldo actual: $" + saldoCuenta);

            actualizarSaldoEnPantalla();
        } else {
            return false;
        } return false;
    }
}
//primero compruebo que la clave de seguridad y el usuario devuelva true y lo dejo entrar
function iniciarSesion() {
    var usuario = prompt("Ingrese su Numero de Identificación: ");
    var clave = prompt("Ingrese su clave: ");

    if (usuario === dniUsuario && clave === codigoDeSeguridad) {
        alert("Bienvenido/a " + nombreUsuario + " , ya puedes comenzar a realizar operaciones");
    } else { //si devuelve false, bloqueo su cuenta
        saldoCuenta = 0;
        alert("El codigo ingresado es incorrecto. " + '\n' + "Por cuestiones de seguridad, su saldo ha sido bloqueado");
        return false;
    }
}
//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}
function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}
function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}