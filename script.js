function showMessage() {
    alert("Hello! Now we going for PDF!");
}

function payNow() {

    const upiId = "YOUR-UPI-ID";

    const amount = "10";
    const note = "P.K Classes - Geography PDF - 22 Days";

    const paymentUrl =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent("P.K Classes") +
        "&am=" + amount +
        "&cu=INR" +
        "&tn=" + encodeURIComponent(note);

    window.location.href = paymentUrl;
}

