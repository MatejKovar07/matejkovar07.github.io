document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('form').onsubmit = function(event) {
        event.preventDefault();

        let c = Number(document.querySelector('#celsius').value);

        if (isNaN(c)) {
            document.querySelector('#result').innerHTML = "Zadej číslo!";
            return;
        }

        let f = (c * 9/5) + 32;

        document.querySelector('#result').innerHTML = `${c} °C = ${f.toFixed(1)} °F`;
    };

});
