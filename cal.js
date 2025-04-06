function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const display = document.getElementById("display");
        const expression = display.value;
        const result = eval(expression);
        display.value = result;

        // Save to server
        fetch("http://13.53.131.60:3000/api/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ expression, result }),
        }).then(() => loadHistory());

    } catch {
        document.getElementById("display").value = "Error";
    }
}

function appendPercentage() {
    let display = document.getElementById("display");
    if (display.value !== "") {
        display.value = parseFloat(display.value) / 100;
    }
}

function loadHistory() {
    fetch("http://13.53.131.60:3000/api/history")
        .then(res => res.json())
        .then(data => {
            const historyDiv = document.getElementById("history");
            historyDiv.innerHTML = "<h3>History</h3>";
            data.forEach(item => {
                historyDiv.innerHTML += `<p>${item.expression} = ${item.result}</p>`;
            });
        });
}

