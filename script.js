function showMessage() {
    alert("Hello! Now we going for PDF!");
}

function payNow() {
    const upiId = "YOUR-UPI-ID";

    const amount = "10";
    const note = "P.K Classes - 22 Days Subscription";

    const paymentUrl =
        `upi://pay?pa=${upiId}&pn=PK%20Classes&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    window.location.href = paymentUrl;
}
